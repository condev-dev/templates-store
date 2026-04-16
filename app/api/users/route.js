import { readData, writeData } from "@/utils/api";
import bcrypt from "bcrypt";

// GET
export async function GET(request) {
  const products = await readData("users");
  const { searchParams } = new URL(request.url);

  // By Id
  const id = searchParams.get("id");
  if (id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      return new Response(JSON.stringify(product), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // By Filter
  const filterBy = searchParams.get("filterBy");
  if (filterBy) {
    const filtered = products?.filter((product) =>
      product?.categories?.some((category) => category === filterBy),
    );
    if (filtered) {
      return new Response(JSON.stringify(filtered), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Get All
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST
export async function POST(request) {
  try {
    const users = await readData("users");
    const body = await request.json();

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
    };

    users.push(newUser);
    writeData("users", users);
    return Response.json(
      { message: "User created", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
}
