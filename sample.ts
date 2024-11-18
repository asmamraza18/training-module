import { db, users } from "./src/lib/db";

export const getUsers = async () => {
  return await db.select().from(users);
};

const userList = await getUsers();

console.log(userList);
