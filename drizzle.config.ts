import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: "http://127.0.0.1:8080",
    authToken: "YOUR_AUTH_TOKEN",
  },
});
