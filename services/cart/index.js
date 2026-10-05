import { getDb } from "@/lib/getDb";
import crypto from "crypto";

export async function AddCart(userId) {
  const db = await getDb();

  // If this user already has a cart, hand it back instead of inserting a second one.
  // Without this a repeated call created a duplicate (empty) cart document, and GetUserCart's
  // findOne could then return that empty duplicate - making a user's cart look empty.
  const existingCart = await db
    .collection("carts")
    .findOne({ user_id: userId });

  if (existingCart) {
    return existingCart;
  }

  const cartToAdd = {
    id: crypto.randomUUID(),
    user_id: userId,
    carts: [],
  };

  await db.collection("carts").insertOne(cartToAdd);

  return cartToAdd;
}

export async function GetUserCart(userId) {
  const db = await getDb();

  const userCart = await db.collection("carts").findOne({ user_id: userId });

  const userCartTemplateIds = userCart?.carts?.map(
    (cartItem) => cartItem.templateId,
  );

  const uniqueTemplateIds = [...new Set(userCartTemplateIds)];

  if (!uniqueTemplateIds.length) {
    return [];
  }

  const userTemplates = await db
    .collection("templates")
    .find({ id: { $in: uniqueTemplateIds } })
    .toArray();

  return userTemplates;
}

export async function AddTemplate(data) {
  const db = await getDb();

  const newItemInCart = {
    templateId: data?.templateId,
  };

  const result = await db
    .collection("carts")
    .updateOne({ user_id: data?.userId }, { $push: { carts: newItemInCart } });

  return result;
}

export async function RemoveTemplate(data) {
  const db = await getDb();

  const result = await db
    .collection("carts")
    .updateOne(
      { user_id: data?.userId },
      { $pull: { carts: { templateId: data?.templateId } } },
    );

  return result;
}
