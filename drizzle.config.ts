import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: "libsql://trainingmodule-asmamraza18.turso.io",
    authToken : "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzE5Mzk0MjYsImlkIjoiNWI1ZjhmMGItZmI4Ny00YzRkLWIzMzktZmZiYmQ3M2Q2MmY0In0.Guy2vnbFHA1FqjJ7YNV1_5MyRwH7QSyXydSJ6mNr2JGv_YlwTZZP-diFwcTXgKQd7V6iNTWJNivVpKXXR36DDA"
  },
});
