import { db, users } from "./src/lib/db";

export async function seedUsers() {
  await db.insert(users).values([
    {
      email: "sample_2@test.com",
      name: "Sample User 2",
    },
    {
      email: "sample_1@test.com",
      name: "Sample User 1",
    },
  ]);
}

seedUsers();

console.log("done");
