import { pgTable, serial, text, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  learningStyle: text("learning_style"), // "visual", "auditory", "kinesthetic", "reading"
  hasADHD: boolean("has_adhd").default(false),
  hasDyslexia: boolean("has_dyslexia").default(false),
  experience: integer("experience").default(0),
  streak: integer("streak").default(0),
  lastLoginDate: timestamp("last_login_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Learning Paths table
export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  subject: text("subject").notNull(),
  targetDays: integer("target_days").notNull(),
  difficulty: text("difficulty").notNull(), // "beginner", "intermediate", "advanced"
  progress: integer("progress").default(0), // 0-100
  isCompleted: boolean("is_completed").default(false),
  settings: json("settings"), // Custom learning preferences
  createdAt: timestamp("created_at").defaultNow(),
});

// Learning Sessions table
export const learningSessions = pgTable("learning_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  pathId: integer("path_id").references(() => learningPaths.id),
  type: text("type").notNull(), // "flashcard", "quiz", "video", "reading", "practice"
  content: json("content").notNull(),
  duration: integer("duration"), // in minutes
  score: integer("score"), // 0-100
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Materials table
export const userMaterials = pgTable("user_materials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // "pdf", "link", "image", "audio", "text"
  content: text("content"),
  url: text("url"),
  processed: boolean("processed").default(false),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Study Reminders table
export const studyReminders = pgTable("study_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  pathId: integer("path_id").references(() => learningPaths.id),
  scheduledTime: timestamp("scheduled_time").notNull(),
  message: text("message").notNull(),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Achievements table
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // "streak", "completion", "score", "consistency"
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Content Suggestions table
export const contentSuggestions = pgTable("content_suggestions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // "ai", "meditation", "soft-skills", "tech", etc.
  difficulty: text("difficulty").notNull(),
  estimatedTime: integer("estimated_time"), // in hours
  trending: boolean("trending").default(false),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Progress Analytics table
export const progressAnalytics = pgTable("progress_analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").defaultNow(),
  sessionsCompleted: integer("sessions_completed").default(0),
  timeSpent: integer("time_spent").default(0), // in minutes
  averageScore: integer("average_score").default(0),
  streak: integer("streak").default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLearningPathSchema = createInsertSchema(learningPaths).omit({
  id: true,
  createdAt: true,
});

export const insertLearningSessionSchema = createInsertSchema(learningSessions).omit({
  id: true,
  createdAt: true,
});

export const insertUserMaterialSchema = createInsertSchema(userMaterials).omit({
  id: true,
  createdAt: true,
});

export const insertStudyReminderSchema = createInsertSchema(studyReminders).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

export const insertContentSuggestionSchema = createInsertSchema(contentSuggestions).omit({
  id: true,
  createdAt: true,
});

export const insertProgressAnalyticsSchema = createInsertSchema(progressAnalytics).omit({
  id: true,
  date: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLearningPath = z.infer<typeof insertLearningPathSchema>;
export type LearningPath = typeof learningPaths.$inferSelect;

export type InsertLearningSession = z.infer<typeof insertLearningSessionSchema>;
export type LearningSession = typeof learningSessions.$inferSelect;

export type InsertUserMaterial = z.infer<typeof insertUserMaterialSchema>;
export type UserMaterial = typeof userMaterials.$inferSelect;

export type InsertStudyReminder = z.infer<typeof insertStudyReminderSchema>;
export type StudyReminder = typeof studyReminders.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InsertContentSuggestion = z.infer<typeof insertContentSuggestionSchema>;
export type ContentSuggestion = typeof contentSuggestions.$inferSelect;

export type InsertProgressAnalytics = z.infer<typeof insertProgressAnalyticsSchema>;
export type ProgressAnalytics = typeof progressAnalytics.$inferSelect;