import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  jsonb,
  integer,
  boolean,
  decimal,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  initials: varchar("initials", { length: 10 }),
  role: varchar("role", { length: 100 }),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Flow app - Financial data
export const flowData = pgTable("flow_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  balance: decimal("balance", { precision: 12, scale: 2 }).default("0"),
  savings: decimal("savings", { precision: 12, scale: 2 }).default("0"),
  investments: decimal("investments", { precision: 12, scale: 2 }).default("0"),
  monthlyIncome: decimal("monthly_income", { precision: 12, scale: 2 }),
  monthlyExpenses: decimal("monthly_expenses", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Edu app - Learning data
export const eduData = pgTable("edu_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  coursesCompleted: integer("courses_completed").default(0),
  hoursStudied: integer("hours_studied").default(0),
  streak: integer("streak").default(0),
  currentLevel: integer("current_level").default(1),
  skillPoints: integer("skill_points").default(0),
  learningGoals: jsonb("learning_goals"),
  completedCourses: jsonb("completed_courses"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Purpose app - Journey data
export const purposeData = pgTable("purpose_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  journeyProgress: integer("journey_progress").default(0),
  ritualsCompleted: integer("rituals_completed").default(0),
  insightsGained: integer("insights_gained").default(0),
  meditationMinutes: integer("meditation_minutes").default(0),
  currentPhase: varchar("current_phase", { length: 100 }),
  personalMission: text("personal_mission"),
  achievements: jsonb("achievements"),
  journalEntries: jsonb("journal_entries"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Learning sessions for detailed tracking
export const learningSessions = pgTable("learning_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionType: varchar("session_type", { length: 50 }), // course, quiz, practice
  duration: integer("duration"), // minutes
  topic: varchar("topic", { length: 255 }),
  score: integer("score"), // percentage
  completed: boolean("completed").default(false),
  sessionData: jsonb("session_data"), // flexible data storage
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Purpose insights and breakthroughs
export const purposeInsights = pgTable("purpose_insights", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: varchar("type", { length: 50 }), // breakthrough, challenge, growth
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  impact: varchar("impact", { length: 20 }), // low, medium, high
  tags: jsonb("tags"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Financial transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // income, expense, investment
  category: varchar("category", { length: 100 }),
  description: text("description"),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Income table
export const incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  frequency: varchar("frequency", { length: 20 }).default("unica"), // unica, mensal, anual
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Expenses table
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  category: varchar("category", { length: 100 }),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Budget table
export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  period: varchar("period", { length: 20 }).default("mensal"), // mensal, anual
  spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Goals table
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  targetAmount: decimal("target_amount", { precision: 12, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 12, scale: 2 }).default("0"),
  targetDate: timestamp("target_date"),
  category: varchar("category", { length: 100 }),
  priority: varchar("priority", { length: 20 }).default("media"), // baixa, media, alta
  status: varchar("status", { length: 20 }).default("ativo"), // ativo, pausado, concluido
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User achievements across all apps
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  appType: varchar("app_type", { length: 20 }).notNull(), // flow, edu, purpose
  achievementType: varchar("achievement_type", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  flowData: many(flowData),
  eduData: many(eduData),
  purposeData: many(purposeData),
  learningSessions: many(learningSessions),
  purposeInsights: many(purposeInsights),
  transactions: many(transactions),
  achievements: many(achievements),
}));

export const flowDataRelations = relations(flowData, ({ one }) => ({
  user: one(users, { fields: [flowData.userId], references: [users.id] }),
}));

export const eduDataRelations = relations(eduData, ({ one }) => ({
  user: one(users, { fields: [eduData.userId], references: [users.id] }),
}));

export const purposeDataRelations = relations(purposeData, ({ one }) => ({
  user: one(users, { fields: [purposeData.userId], references: [users.id] }),
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type FlowData = typeof flowData.$inferSelect;
export type InsertFlowData = typeof flowData.$inferInsert;

export type EduData = typeof eduData.$inferSelect;
export type InsertEduData = typeof eduData.$inferInsert;

export type PurposeData = typeof purposeData.$inferSelect;
export type InsertPurposeData = typeof purposeData.$inferInsert;

export type LearningSession = typeof learningSessions.$inferSelect;
export type InsertLearningSession = typeof learningSessions.$inferInsert;

export type PurposeInsight = typeof purposeInsights.$inferSelect;
export type InsertPurposeInsight = typeof purposeInsights.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

export type Income = typeof incomes.$inferSelect;
export type InsertIncome = typeof incomes.$inferInsert;

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;

export type Budget = typeof budgets.$inferSelect;
export type InsertBudget = typeof budgets.$inferInsert;

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

// Zod schemas
export const insertIncomeSchema = createInsertSchema(incomes);
export const insertExpenseSchema = createInsertSchema(expenses);
export const insertBudgetSchema = createInsertSchema(budgets);
export const insertGoalSchema = createInsertSchema(goals);

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertFlowDataSchema = createInsertSchema(flowData);
export const insertEduDataSchema = createInsertSchema(eduData);
export const insertPurposeDataSchema = createInsertSchema(purposeData);
export const insertLearningSessionSchema = createInsertSchema(learningSessions);
export const insertPurposeInsightSchema = createInsertSchema(purposeInsights);
export const insertTransactionSchema = createInsertSchema(transactions);
export const insertAchievementSchema = createInsertSchema(achievements);