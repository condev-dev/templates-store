import { readData, writeData } from "@/utils/api";
import bcrypt from "bcrypt";

// Add User
export async function AddUser(data) {
  const users = await readData("users");

  const hashedPassword = await bcrypt.hash(data?.password, 10);

  const userToAdd = {
    id: data?.id,
    email: data?.email,
    password: hashedPassword,
    username: data?.username,
    fullname: data?.fullname,
  };

  users.push(userToAdd);
  await writeData("users", users);

  return users;
}

// Edit Password
export async function EditPassword(data) {
  const users = await readData("users");
  const userIndex = users.findIndex((user) => user.id === data.userId);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  users[userIndex].password = hashedPassword;

  await writeData("users", users);

  return users[userIndex];
}

// Edit FullName
export async function EditFullName(data) {
  const users = await readData("users");
  const userIndex = users.findIndex((user) => user.id === data.userId);

  users[userIndex].fullname = data.fullname;

  await writeData("users", users);

  return users[userIndex];
}

// Edit UserName
export async function EditUserName(data) {
  const users = await readData("users");
  const userIndex = users.findIndex((user) => user.id === data.userId);

  users[userIndex].username = data.username;

  await writeData("users", users);

  return users[userIndex];
}

// Edit Email
export async function EditEmail(data) {
  const users = await readData("users");
  const userIndex = users.findIndex((user) => user.id === data.userId);

  users[userIndex].email = data.email;

  await writeData("users", users);

  return users[userIndex];
}

// Delete User
export async function DeleteUser(userId) {
  const users = await readData("users");

  const updatedUsers = users.filter((user) => user.id !== userId);

  await writeData("users", updatedUsers);
  return updatedUsers;
}
