import { getDb } from "@/lib/getDb";

export async function GetPurchasesById(userId) {
  const db = await getDb();

  const userPurchases = await db
    .collection("purchases")
    .findOne({ user_id: userId });

  const userPurchasesTemplateIds = userPurchases?.purchases?.map(
    (purchasedItem) => purchasedItem.templateId,
  );

  const uniqueTemplateIds = [...new Set(userPurchasesTemplateIds)];

  if (!uniqueTemplateIds.length) {
    return [];
  }

  const userTemplates = await db
    .collection("templates")
    .find({ id: { $in: uniqueTemplateIds } })
    .toArray();

  return userTemplates;
}
