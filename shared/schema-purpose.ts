import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  level: integer("level").notNull().default(1),
  experience: integer("experience").notNull().default(0),
  currentModule: varchar("current_module", { length: 50 }).notNull().default("despertar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const journeyModules = pgTable("journey_modules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleType: varchar("module_type", { length: 50 }).notNull(), // despertar, descoberta, decisao, direcao
  isCompleted: boolean("is_completed").notNull().default(false),
  progress: integer("progress").notNull().default(0), // 0-100
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const diaryEntries = pgTable("diary_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  mood: varchar("mood", { length: 20 }), // peaceful, inspired, confused, excited, etc
  tags: text("tags").array(), // valores, paixões, talentos, etc
  isPrivate: boolean("is_private").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const purposeMap = pgTable("purpose_map", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  values: json("values"), // array de valores centrais
  passions: json("passions"), // array de paixões
  talents: json("talents"), // array de talentos
  mission: text("mission"), // declaração de missão pessoal
  vision: text("vision"), // visão de futuro
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleType: varchar("module_type", { length: 50 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  insights: text("insights"), // insights pessoais sobre a reflexão
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: varchar("category", { length: 30 }).notNull(), // descoberta, persistencia, profundidade
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});

export const inspirationContent = pgTable("inspiration_content", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull(), // quote, video, meditation
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  category: varchar("category", { length: 30 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertJourneyModuleSchema = createInsertSchema(journeyModules).omit({
  id: true,
  createdAt: true,
});

export const insertDiaryEntrySchema = createInsertSchema(diaryEntries).omit({
  id: true,
  createdAt: true,
});

export const insertPurposeMapSchema = createInsertSchema(purposeMap).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReflectionSchema = createInsertSchema(reflections).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  unlockedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertJourneyModule = z.infer<typeof insertJourneyModuleSchema>;
export type JourneyModule = typeof journeyModules.$inferSelect;

export type InsertDiaryEntry = z.infer<typeof insertDiaryEntrySchema>;
export type DiaryEntry = typeof diaryEntries.$inferSelect;

export type InsertPurposeMap = z.infer<typeof insertPurposeMapSchema>;
export type PurposeMap = typeof purposeMap.$inferSelect;

export type InsertReflection = z.infer<typeof insertReflectionSchema>;
export type Reflection = typeof reflections.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InspirationContent = typeof inspirationContent.$inferSelect;