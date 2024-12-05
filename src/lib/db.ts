import { drizzle } from "drizzle-orm/libsql/web";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const db = drizzle({
  connection: {
    url: "libsql://trainingmodule-asmamraza18.turso.io",
    authToken : "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzMxMTAzNDIsImlkIjoiNWI1ZjhmMGItZmI4Ny00YzRkLWIzMzktZmZiYmQ3M2Q2MmY0In0.VvmlXm2kqBWpW_Kr_ZGpMSqmcfUBItbLoEOzqRH1riwhuQKplW8NFl2nhOrBhvzLJzQLBwiAebF-TvVoWPbFAQ"
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
  quizResult: real("quiz_result").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Modules table
export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Auto-incrementing primary key
  title: text("title").notNull(), // Module title
  description: text("description").notNull(), // Store JSON data as text
  icon: text("icon"), // Assuming the icon is a string reference (e.g., a name or path)
  recommended: text("recommended").notNull(), // Boolean flag with a default value
});

// Training courses table
export const trainings = sqliteTable("trainings", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Auto-incrementing primary key
  title: text("title").notNull(), // Title of the training
  description: text("description"), // Optional description
  thumbnail: text("thumbnail"), 
  additionalInfo: text("additional_info"), 
  imageInfo: text("image_info"), 
  order: integer("order").notNull(), // Order of the training
  duration: integer("duration"), // Optional duration in minutes
  moduleId: integer("module_id")
    .notNull()
    .references(() => modules.id), // Foreign key to modules table
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

export const quiz = sqliteTable("quiz", {
  id: integer("id").primaryKey({ autoIncrement: true }), // Auto-incrementing primary key
  trainingId: integer("training_id")
    .notNull()
    .references(() => trainings.id), // Foreign key to trainings table
  question: text("question").notNull(), // The quiz question
  options: text("options").notNull(), // Store the options as a JSON string
  correctAnswer: integer("correct_answer").notNull(), // Index of the correct option
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
