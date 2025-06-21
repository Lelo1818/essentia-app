import { db } from "./db";
import { 
  users, 
  flowData, 
  eduData, 
  purposeData, 
  learningSessions,
  purposeInsights,
  transactions,
  achievements,
  type User,
  type InsertUser,
  type FlowData,
  type InsertFlowData,
  type EduData,
  type InsertEduData,
  type PurposeData,
  type InsertPurposeData,
  type LearningSession,
  type InsertLearningSession,
  type PurposeInsight,
  type InsertPurposeInsight,
  type Transaction,
  type InsertTransaction,
  type Achievement,
  type InsertAchievement
} from "../shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface IEcosystemStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Flow operations
  getFlowData(userId: number): Promise<FlowData | undefined>;
  createFlowData(data: InsertFlowData): Promise<FlowData>;
  updateFlowData(userId: number, updates: Partial<FlowData>): Promise<FlowData | undefined>;
  
  // Edu operations
  getEduData(userId: number): Promise<EduData | undefined>;
  createEduData(data: InsertEduData): Promise<EduData>;
  updateEduData(userId: number, updates: Partial<EduData>): Promise<EduData | undefined>;
  recordLearningSession(session: InsertLearningSession): Promise<LearningSession>;
  getLearningHistory(userId: number, limit?: number): Promise<LearningSession[]>;
  
  // Purpose operations
  getPurposeData(userId: number): Promise<PurposeData | undefined>;
  createPurposeData(data: InsertPurposeData): Promise<PurposeData>;
  updatePurposeData(userId: number, updates: Partial<PurposeData>): Promise<PurposeData | undefined>;
  addPurposeInsight(insight: InsertPurposeInsight): Promise<PurposeInsight>;
  getPurposeInsights(userId: number, limit?: number): Promise<PurposeInsight[]>;
  
  // Transactions
  addTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactions(userId: number, limit?: number): Promise<Transaction[]>;
  
  // Achievements
  addAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getUserAchievements(userId: number): Promise<Achievement[]>;
  
  // Analytics
  getUserStats(userId: number): Promise<{
    flow: FlowData | null;
    edu: EduData | null;
    purpose: PurposeData | null;
    totalSessions: number;
    totalInsights: number;
    totalAchievements: number;
  }>;
}

export class DatabaseEcosystemStorage implements IEcosystemStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    
    // Initialize data for all apps
    await this.createFlowData({ userId: user.id });
    await this.createEduData({ userId: user.id });
    await this.createPurposeData({ userId: user.id });
    
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Flow operations
  async getFlowData(userId: number): Promise<FlowData | undefined> {
    const [data] = await db.select().from(flowData).where(eq(flowData.userId, userId));
    return data;
  }

  async createFlowData(insertData: InsertFlowData): Promise<FlowData> {
    const [data] = await db
      .insert(flowData)
      .values(insertData)
      .returning();
    return data;
  }

  async updateFlowData(userId: number, updates: Partial<FlowData>): Promise<FlowData | undefined> {
    const [data] = await db
      .update(flowData)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(flowData.userId, userId))
      .returning();
    return data;
  }

  // Edu operations
  async getEduData(userId: number): Promise<EduData | undefined> {
    const [data] = await db.select().from(eduData).where(eq(eduData.userId, userId));
    return data;
  }

  async createEduData(insertData: InsertEduData): Promise<EduData> {
    const [data] = await db
      .insert(eduData)
      .values(insertData)
      .returning();
    return data;
  }

  async updateEduData(userId: number, updates: Partial<EduData>): Promise<EduData | undefined> {
    const [data] = await db
      .update(eduData)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(eduData.userId, userId))
      .returning();
    return data;
  }

  async recordLearningSession(session: InsertLearningSession): Promise<LearningSession> {
    const [newSession] = await db
      .insert(learningSessions)
      .values(session)
      .returning();
    
    // Update edu stats
    const currentEdu = await this.getEduData(session.userId);
    if (currentEdu && session.completed) {
      await this.updateEduData(session.userId, {
        hoursStudied: currentEdu.hoursStudied + Math.floor((session.duration || 0) / 60),
        skillPoints: currentEdu.skillPoints + (session.score || 0),
      });
    }
    
    return newSession;
  }

  async getLearningHistory(userId: number, limit = 10): Promise<LearningSession[]> {
    return await db
      .select()
      .from(learningSessions)
      .where(eq(learningSessions.userId, userId))
      .orderBy(desc(learningSessions.startedAt))
      .limit(limit);
  }

  // Purpose operations
  async getPurposeData(userId: number): Promise<PurposeData | undefined> {
    const [data] = await db.select().from(purposeData).where(eq(purposeData.userId, userId));
    return data;
  }

  async createPurposeData(insertData: InsertPurposeData): Promise<PurposeData> {
    const [data] = await db
      .insert(purposeData)
      .values(insertData)
      .returning();
    return data;
  }

  async updatePurposeData(userId: number, updates: Partial<PurposeData>): Promise<PurposeData | undefined> {
    const [data] = await db
      .update(purposeData)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(purposeData.userId, userId))
      .returning();
    return data;
  }

  async addPurposeInsight(insight: InsertPurposeInsight): Promise<PurposeInsight> {
    const [newInsight] = await db
      .insert(purposeInsights)
      .values(insight)
      .returning();
    
    // Update purpose stats
    const currentPurpose = await this.getPurposeData(insight.userId);
    if (currentPurpose) {
      await this.updatePurposeData(insight.userId, {
        insightsGained: currentPurpose.insightsGained + 1,
      });
    }
    
    return newInsight;
  }

  async getPurposeInsights(userId: number, limit = 10): Promise<PurposeInsight[]> {
    return await db
      .select()
      .from(purposeInsights)
      .where(eq(purposeInsights.userId, userId))
      .orderBy(desc(purposeInsights.createdAt))
      .limit(limit);
  }

  // Transactions
  async addTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    
    // Update flow balance
    const currentFlow = await this.getFlowData(transaction.userId);
    if (currentFlow) {
      const amount = parseFloat(transaction.amount.toString());
      const balanceChange = transaction.type === 'income' ? amount : -amount;
      const newBalance = parseFloat(currentFlow.balance || "0") + balanceChange;
      
      await this.updateFlowData(transaction.userId, {
        balance: newBalance.toString(),
      });
    }
    
    return newTransaction;
  }

  async getTransactions(userId: number, limit = 20): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.date))
      .limit(limit);
  }

  // Achievements
  async addAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db
      .insert(achievements)
      .values(achievement)
      .returning();
    return newAchievement;
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.earnedAt));
  }

  // Analytics
  async getUserStats(userId: number) {
    const [flowStats, eduStats, purposeStats, sessionCount, insightCount, achievementCount] = await Promise.all([
      this.getFlowData(userId),
      this.getEduData(userId),
      this.getPurposeData(userId),
      db.select().from(learningSessions).where(eq(learningSessions.userId, userId)),
      db.select().from(purposeInsights).where(eq(purposeInsights.userId, userId)),
      db.select().from(achievements).where(eq(achievements.userId, userId)),
    ]);

    return {
      flow: flowStats || null,
      edu: eduStats || null,
      purpose: purposeStats || null,
      totalSessions: sessionCount.length,
      totalInsights: insightCount.length,
      totalAchievements: achievementCount.length,
    };
  }
}

export const ecosystemStorage = new DatabaseEcosystemStorage();