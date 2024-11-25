
import { eq } from "drizzle-orm";
import db, { profiles } from "./lib/db";

const result = await db.select({
    userId : profiles.id
}).from(profiles).where(eq(profiles.lastName, "john"))