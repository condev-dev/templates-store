import { readData, writeData } from "@/utils/api";
import bcrypt from "bcrypt";

export async function AddUser(data) {
  const users = await readData("users");
  console.log("DATA", data);

  const hashedPassword = await bcrypt.hash(data?.password, 10);

  const userToAdd = {
    id: data?.id,
    email: data?.email,
    password: hashedPassword,
    username: data?.username,
  };

  users.push(userToAdd);
  await writeData("users", users);

  return users;
}
