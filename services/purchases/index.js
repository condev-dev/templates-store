import { readData } from "@/utils/api";

export async function GetPurchasesById(userId) {
  const purchases = await readData("purchases");
  const templates = await readData("templates");

  const userPurchases = purchases?.find(
    (purchasedItem) => purchasedItem.user_id === userId,
  );

  const userPurchasesTemplateIds = userPurchases?.purchases?.map(
    (purchasedItem) => purchasedItem.templateId,
  );

  const uniqueTemplateIds = [...new Set(userPurchasesTemplateIds)];
  const UserTemplates = templates
    ? templates.filter((template) => uniqueTemplateIds?.includes(template.id))
    : [];

  if (UserTemplates) {
    return UserTemplates;
  } else {
    return [];
  }
}
