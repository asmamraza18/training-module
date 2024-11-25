import { drizzle } from "drizzle-orm/libsql/web";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const db = drizzle({
  connection: {
    url: "libsql://trainingmodule-asmamraza18.turso.io",
    authToken : "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzE5Mzk0MjYsImlkIjoiNWI1ZjhmMGItZmI4Ny00YzRkLWIzMzktZmZiYmQ3M2Q2MmY0In0.Guy2vnbFHA1FqjJ7YNV1_5MyRwH7QSyXydSJ6mNr2JGv_YlwTZZP-diFwcTXgKQd7V6iNTWJNivVpKXXR36DDA"
  },
});

//test table
export const profiles = sqliteTable('profiles', {
  id: integer(),
  firstName: text("first_name"),
  lastName: text("last_name")
});


// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Training courses table
export const trainings = sqliteTable("trainings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  duration: integer("duration"), // in minutes
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Modules table
export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  trainingId: integer("training_id")
    .notNull()
    .references(() => trainings.id, {onDelete: 'cascade'}),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(), // sequence within the training
  duration: integer("duration"), // in minutes
  content: text("content"), // could store JSON or markdown content
});

// User progress on modules
export const moduleProgress = sqliteTable("module_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  moduleId: integer("module_id")
    .notNull()
    .references(() => modules.id),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] })
    .notNull()
    .default("not_started"),
  progress: real("progress").notNull().default(0), // percentage of completion
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  lastAccessedAt: integer("last_accessed_at", { mode: "timestamp" }),
});

// User progress on overall training
export const trainingProgress = sqliteTable("training_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  trainingId: integer("training_id")
    .notNull()
    .references(() => trainings.id),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] })
    .notNull()
    .default("not_started"),
  progress: real("progress").notNull().default(0), // percentage of completion
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  lastAccessedAt: integer("last_accessed_at", { mode: "timestamp" }),
});



// Relations
// export const usersRelations = relations(users, ({ many }) => ({
//   moduleProgress: many(moduleProgress),
//   trainingProgress: many(trainingProgress),
// }));

// export const trainingsRelations = relations(trainings, ({ many }) => ({
//   modules: many(modules),
//   trainingProgress: many(trainingProgress),
// }));

// export const modulesRelations = relations(modules, ({ one, many }) => ({
//   training: one(trainings, {
//     fields: [modules.trainingId],
//     references: [trainings.id],
//   }),
//   moduleProgress: many(moduleProgress),
// }));

export default db;
