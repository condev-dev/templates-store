import { readData, writeData } from "@/utils/api";

export async function AddCart(userId) {
  const carts = await readData("carts");

  const CartToAdd = {
    id: crypto.randomUUID(),
    user_id: userId,
    carts: [],
  };

  carts.push(CartToAdd);
  await writeData("carts", carts);

  return carts;
}

export async function GetUserCart(userId) {
  const carts = await readData("carts");
  const templates = await readData("templates");

  const userCart = carts.find((cart) => cart.user_id === userId);

  const userCartTemplateIds = userCart?.carts?.map(
    (cartItem) => cartItem.templateId,
  );

  const uniqueTemplateIds = [...new Set(userCartTemplateIds)];
  const UserTemplates = templates
    ? templates.filter((template) => uniqueTemplateIds?.includes(template.id))
    : [];

  return UserTemplates;
}

export async function AddTemplate(data) {
  const carts = await readData("carts");
  const cartIndex = carts.findIndex((cart) => cart.user_id === data?.userId);

  if (cartIndex !== -1) {
    const newItemInCart = {
      templateId: data?.templateId,
    };

    const updatedCarts = [...carts];

    updatedCarts[cartIndex] = {
      ...updatedCarts[cartIndex],
      carts: [...updatedCarts[cartIndex].carts, newItemInCart],
    };

    await writeData("carts", updatedCarts);
  }
}

export async function RemoveTemplate(data) {
  const carts = await readData("carts");
  const cartIndex = carts.findIndex((cart) => cart.user_id === data?.userId);

  if (cartIndex !== -1) {
    const cartToUpdate = carts[cartIndex];
    const templateIdToDelete = data?.templateId;

    const updatedCart = cartToUpdate.carts.filter(
      (cartItem) => cartItem.templateId !== templateIdToDelete,
    );

    const updatedCarts = [...carts];
    updatedCarts[cartIndex] = {
      ...cartToUpdate,
      carts: updatedCart,
    };

    await writeData("carts", updatedCarts);
  }
}
