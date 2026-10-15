import { getDb } from "@/lib/getDb";
import { createHash, randomBytes } from "crypto";

// One-time password reset links.
//
// Only the SHA-256 hash of a token is stored, so a leaked database dump cannot be turned into
// working reset links. A token is single use, expires after TTL_MS, and issuing a new link
// invalidates any other pending link for that user.
const COLLECTION = "resetTokens";
const TTL_MS = 15 * 60 * 1000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 3;

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

export async function CreateResetToken(userId) {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  const now = new Date();

  // A light rate limit, counted in the database so it holds across serverless instances.
  const recent = await collection.countDocuments({
    userId,
    createdAt: { $gt: new Date(now.getTime() - WINDOW_MS) },
  });

  if (recent >= MAX_PER_WINDOW) {
    return { rateLimited: true };
  }

  // Asking for a new link retires the previous one.
  await collection.updateMany(
    { userId, used: false },
    { $set: { used: true, usedAt: now } },
  );

  const token = randomBytes(32).toString("hex");

  await collection.insertOne({
    userId,
    tokenHash: hashToken(token),
    used: false,
    createdAt: now,
    expiresAt: new Date(now.getTime() + TTL_MS),
  });

  return { token };
}

// Returns the record when the token is valid, null otherwise. The token is burned as soon as it is
// accepted, so replaying the same link cannot work twice.
export async function ConsumeResetToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const db = await getDb();
  const collection = db.collection(COLLECTION);

  const record = await collection.findOne({ tokenHash: hashToken(token) });

  if (!record || record.used || record.expiresAt <= new Date()) {
    return null;
  }

  const claimed = await collection.updateOne(
    { _id: record._id, used: false },
    { $set: { used: true, usedAt: new Date() } },
  );

  if (claimed.modifiedCount === 0) {
    return null;
  }

  return record;
}
