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

// Users table (compatible with Replit Auth)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  replitId: varchar("replit_id", { length: 255 }).unique(), // Replit user ID from OAuth
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  whatsapp: varchar("whatsapp", { length: 20 }), // Para integração futura
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
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
  taxesPaid: decimal("taxes_paid", { precision: 12, scale: 2 }).default("0"),
  insuranceCosts: decimal("insurance_costs", { precision: 12, scale: 2 }).default("0"),
  milesBalance: integer("miles_balance").default(0),
  creditScore: integer("credit_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Credit Cards
export const creditCards = pgTable("credit_cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  bank: varchar("bank", { length: 255 }),
  limit: decimal("limit", { precision: 12, scale: 2 }),
  currentBalance: decimal("current_balance", { precision: 12, scale: 2 }).default("0"),
  dueDate: integer("due_date"), // day of month
  annualFee: decimal("annual_fee", { precision: 12, scale: 2 }).default("0"),
  rewardsProgram: varchar("rewards_program", { length: 255 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insurance Policies
export const insurancePolicies = pgTable("insurance_policies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // health, auto, life, property
  provider: varchar("provider", { length: 255 }),
  monthlyPremium: decimal("monthly_premium", { precision: 12, scale: 2 }),
  coverage: decimal("coverage", { precision: 12, scale: 2 }),
  deductible: decimal("deductible", { precision: 12, scale: 2 }),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tax Records
export const taxRecords = pgTable("tax_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  year: integer("year").notNull(),
  taxType: varchar("tax_type", { length: 100 }), // income, property, sales
  amount: decimal("amount", { precision: 12, scale: 2 }),
  deductions: decimal("deductions", { precision: 12, scale: 2 }).default("0"),
  refund: decimal("refund", { precision: 12, scale: 2 }).default("0"),
  filedAt: timestamp("filed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Miles Programs
export const milesPrograms = pgTable("miles_programs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  airline: varchar("airline", { length: 255 }).notNull(),
  programName: varchar("program_name", { length: 255 }),
  membershipNumber: varchar("membership_number", { length: 255 }),
  currentMiles: integer("current_miles").default(0),
  tierStatus: varchar("tier_status", { length: 100 }),
  expirationDate: timestamp("expiration_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
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
  achievementKey: varchar("achievement_key", { length: 100 }), // Key único da conquista (ex: primeiro_checkin, checkin_bronze)
  appType: varchar("app_type", { length: 20 }).notNull(), // flow, edu, purpose, essentia
  achievementType: varchar("achievement_type", { length: 100 }).notNull(), // primeiro_checkin, meditador_bronze, etc
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  pointsEarned: integer("points_earned").default(0), // Pontos ganhos com esta conquista
  earnedAt: timestamp("earned_at").defaultNow(),
  progress: integer("progress").default(0), // Para conquistas com progresso (ex: 5/10)
  metadata: jsonb("metadata"), // Dados extras (pontos ganhos, etc)
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;
export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

// Thera Funding - Trades table
export const theraTrades = pgTable("thera_trades", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  symbol: varchar("symbol", { length: 50 }).notNull(),
  type: varchar("type", { length: 10 }).notNull(), // buy, sell
  quantity: integer("quantity").notNull(),
  entryPrice: decimal("entry_price", { precision: 12, scale: 2 }).notNull(),
  exitPrice: decimal("exit_price", { precision: 12, scale: 2 }),
  pnl: decimal("pnl", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 20 }).default("open"), // open, closed
  entryTime: timestamp("entry_time").defaultNow(),
  exitTime: timestamp("exit_time"),
  notes: text("notes"),
  emotion: varchar("emotion", { length: 50 }), // calm, anxious, confident, etc
  setup: varchar("setup", { length: 100 }), // breakout, support, etc
  createdAt: timestamp("created_at").defaultNow(),
});

// Thera Funding - Evaluation clicks tracking
export const theraEvaluationClicks = pgTable("thera_evaluation_clicks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  clickedAt: timestamp("clicked_at").defaultNow(),
  userEmail: varchar("user_email", { length: 255 }), // Snapshot para integração
  userWhatsapp: varchar("user_whatsapp", { length: 20 }), // Snapshot para integração
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  flowData: many(flowData),
  eduData: many(eduData),
  purposeData: many(purposeData),
  learningSessions: many(learningSessions),
  purposeInsights: many(purposeInsights),
  transactions: many(transactions),
  creditCards: many(creditCards),
  insurancePolicies: many(insurancePolicies),
  taxRecords: many(taxRecords),
  milesPrograms: many(milesPrograms),
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
export type UpsertUser = {
  replitId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
};

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

export type Income = typeof incomes.$inferSelect;
export type InsertIncome = typeof incomes.$inferInsert;

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;

export type Budget = typeof budgets.$inferSelect;
export type InsertBudget = typeof budgets.$inferInsert;

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;

// Zod schemas with custom transformations
export const insertIncomeSchema = createInsertSchema(incomes).omit({
  id: true,
  createdAt: true,
}).extend({
  amount: z.union([z.string(), z.number()]).transform(val => String(val)),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
}).extend({
  amount: z.union([z.string(), z.number()]).transform(val => String(val)),
});

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

// NEW FINANCIAL SCHEMAS
export type CreditCard = typeof creditCards.$inferSelect;
export type InsertCreditCard = typeof creditCards.$inferInsert;

export type InsurancePolicy = typeof insurancePolicies.$inferSelect;
export type InsertInsurancePolicy = typeof insurancePolicies.$inferInsert;

export type TaxRecord = typeof taxRecords.$inferSelect;
export type InsertTaxRecord = typeof taxRecords.$inferInsert;

export type MilesProgram = typeof milesPrograms.$inferSelect;
export type InsertMilesProgram = typeof milesPrograms.$inferInsert;

export const insertCreditCardSchema = createInsertSchema(creditCards);
export const insertInsurancePolicySchema = createInsertSchema(insurancePolicies);
export const insertTaxRecordSchema = createInsertSchema(taxRecords);
export const insertMilesProgramSchema = createInsertSchema(milesPrograms);

// THERA FUNDING SCHEMAS
export type TheraTrade = typeof theraTrades.$inferSelect;
export type InsertTheraTrade = typeof theraTrades.$inferInsert;
export const insertTheraTradeSchema = createInsertSchema(theraTrades);

export type TheraEvaluationClick = typeof theraEvaluationClicks.$inferSelect;
export type InsertTheraEvaluationClick = typeof theraEvaluationClicks.$inferInsert;
export const insertTheraEvaluationClickSchema = createInsertSchema(theraEvaluationClicks);

// ESSENTIA / PURPOSE - FEME Tables
export const femeCheckins = pgTable("feme_checkins", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  fisico: integer("fisico").notNull(), // 0-10
  energetico: integer("energetico").notNull(), // 0-10
  mental: integer("mental").notNull(), // 0-10
  espiritual: integer("espiritual").notNull(), // 0-10
  coerencia: decimal("coerencia", { precision: 3, scale: 2 }), // 0.00-1.00
  intention: text("intention"),
  meta: jsonb("meta").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const breathSessions = pgTable("breath_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  cycles: integer("cycles").notNull(), // 3, 6, 18, etc
  durationSec: integer("duration_sec").notNull(), // cycles * 14
  videoUsed: varchar("video_used", { length: 255 }),
  audioUsed: varchar("audio_used", { length: 255 }),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const userEvents = pgTable("user_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // nullable for pre-login events
  eventName: varchar("event_name", { length: 100 }).notNull(),
  eventProps: jsonb("event_props").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// FEME Types
export type FemeCheckin = typeof femeCheckins.$inferSelect;
export type InsertFemeCheckin = typeof femeCheckins.$inferInsert;
export const insertFemeCheckinSchema = createInsertSchema(femeCheckins).omit({
  id: true,
  createdAt: true,
});

export type BreathSession = typeof breathSessions.$inferSelect;
export type InsertBreathSession = typeof breathSessions.$inferInsert;
export const insertBreathSessionSchema = createInsertSchema(breathSessions).omit({
  id: true,
  completedAt: true,
});

export type UserEvent = typeof userEvents.$inferSelect;
export type InsertUserEvent = typeof userEvents.$inferInsert;
export const insertUserEventSchema = createInsertSchema(userEvents).omit({
  id: true,
  createdAt: true,
});

// Gamification / Progress Table
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  points: integer("points").default(0),
  level: integer("level").default(1),
  breathSessionsCompleted: integer("breath_sessions_completed").default(0),
  femeCheckinsCompleted: integer("feme_checkins_completed").default(0),
  aiSessionsCompleted: integer("ai_sessions_completed").default(0),
  dailyStreak: integer("daily_streak").default(0),
  lastActivityAt: timestamp("last_activity_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Action Plans Table
export const actionPlans = pgTable("action_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  goal: text("goal"),
  firstStep: text("first_step"),
  status: varchar("status", { length: 20 }).default("active"), // active, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ActionPlan = typeof actionPlans.$inferSelect;
export type InsertActionPlan = typeof actionPlans.$inferInsert;
export const insertActionPlanSchema = createInsertSchema(actionPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// AI Suggestions Table - Para salvar todas sugestões/insights da IA
export const aiSuggestions = pgTable("ai_suggestions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  suggestionType: varchar("suggestion_type", { length: 50 }).notNull(), // biometric_insight, therapist_advice, plan_recommendation
  content: text("content").notNull(), // O texto da sugestão
  source: varchar("source", { length: 50 }).notNull(), // biometric, sofia, marcus, luna, leo, system
  metadata: jsonb("metadata"), // Dados extras (contexto biométrico, etc)
  createdAt: timestamp("created_at").defaultNow(),
});

export type AiSuggestion = typeof aiSuggestions.$inferSelect;
export type InsertAiSuggestion = typeof aiSuggestions.$inferInsert;
export const insertAiSuggestionSchema = createInsertSchema(aiSuggestions).omit({
  id: true,
  createdAt: true,
});

// Portal Reflections Table - Para salvar reflexões dos portais
export const portalReflections = pgTable("portal_reflections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  portalType: varchar("portal_type", { length: 50 }).notNull(), // intuicao, clareza, gratidao, recomeco
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type PortalReflection = typeof portalReflections.$inferSelect;
export type InsertPortalReflection = typeof portalReflections.$inferInsert;
export const insertPortalReflectionSchema = createInsertSchema(portalReflections).omit({
  id: true,
  createdAt: true,
});

