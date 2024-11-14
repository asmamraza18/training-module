import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/turso.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:training.db",
  },
});
