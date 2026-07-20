import { getDb } from "@/lib/getDb";

export async function AddCart(userId) {
  const db = await getDb();

  // // اگه از قبل سبدی برای این یوزر ساخته شده، دوباره نساز
  // const existingCart = await db
  //   .collection("carts")
  //   .findOne({ user_id: userId });
  // if (existingCart) {
  //   return existingCart;
  // }

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
