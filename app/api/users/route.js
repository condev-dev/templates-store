import { readData, writeData } from "@/utils/api";
import bcrypt from "bcrypt";

// GET
export async function GET(request) {
  const users = await readData("users");
  const { searchParams } = new URL(request.url);

  // By Id
  const id = searchParams.get("id");
  if (id) {
    const user = users.find((u) => u.id === id);
    if (user) {
      return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Get All
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST
export async function POST(request) {
  try {
    const users = await readData("users");
    const body = await request.json();

    // For Add Template To User Cart
    if (body?.templateId && body?.userId) {
      const userIndex = users.findIndex((user) => user.id === body?.userId);

      if (userIndex !== -1) {
        const newItemInCart = {
          templateId: body.templateId,
        };

        const updatedUsers = [...users];

        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          cart: [...updatedUsers[userIndex].cart, newItemInCart],
        };

        await writeData("users", updatedUsers);

        return new Response(JSON.stringify(updatedUsers[userIndex]), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return Response.json({ message: "User not found" }, { status: 404 });
      }
    } else {
      // For Add New User - SignUp
      //
      // Check Email
      if (users?.find((user) => user.email === body?.email)) {
        return Response.json(
          { message: "این ایمیل موجود می باشد." },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(body?.password, 10);
      console.log("PASSWORD", hashedPassword);

      const newUser = {
        id: crypto.randomUUID(),
        email: body?.email,
        password: hashedPassword,
        username: body?.username,
        cart: [],
      };

      users.push(newUser);
      writeData("users", users);
      return Response.json(
        { message: "User created", user: newUser },
        { status: 201 },
      );
    }
  } catch (error) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const users = await readData("users");
    const body = await request.json();

    if (body?.templateId && body?.userId) {
      const userIndex = users.findIndex((user) => user.id === body?.userId);

      if (userIndex !== -1) {
        const userToUpdate = users[userIndex];
        const templateIdToDelete = body.templateId;

        const updatedCart = userToUpdate.cart.filter(
          (cartItem) => cartItem.templateId !== templateIdToDelete,
        );

        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...userToUpdate,
          cart: updatedCart,
        };

        await writeData("users", updatedUsers);

        return new Response(
          JSON.stringify({
            message: "Template removed from cart successfully",
            user: updatedUsers[userIndex],
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    }
  } catch (error) {
    return Response.json(
      { message: "An error occurred while processing the request" },
      { status: 500 },
    );
  }
}
