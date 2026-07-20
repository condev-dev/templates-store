import { getDb } from "@/lib/getDb";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

// Add User
export async function AddUser(data) {
  const db = await getDb();

  const hashedPassword = await bcrypt.hash(data?.password, 10);

  const userToAdd = {
    id: data?.id || randomUUID(),
    email: data?.email,
    password: hashedPassword,
    username: data?.username,
    fullname: data?.fullname,
  };

  const result = await db.collection("users").insertOne(userToAdd);

  const { password, ...userWithoutPassword } = userToAdd;
  return { _id: result.insertedId, ...userWithoutPassword };
}

// Edit Password
export async function EditPassword(data) {
  const db = await getDb();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { id: data.userId },
      { $set: { password: hashedPassword } },
      { returnDocument: "after" },
    );

  return result;
}

// Edit FullName
export async function EditFullName(data) {
  const db = await getDb();

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { id: data.userId },
      { $set: { fullname: data.fullname } },
      { returnDocument: "after" },
    );

  return result;
}

// Edit UserName
export async function EditUserName(data) {
  const db = await getDb();

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { id: data.userId },
      { $set: { username: data.username } },
      { returnDocument: "after" },
    );

  return result;
}

// Edit Email
export async function EditEmail(data) {
  const db = await getDb();

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { id: data.userId },
      { $set: { email: data.email } },
      { returnDocument: "after" },
    );

  return result;
}

// Delete User
export async function DeleteUser(userId) {
  const db = await getDb();

  const result = await db.collection("users").deleteOne({ id: userId });

  return result;
}
