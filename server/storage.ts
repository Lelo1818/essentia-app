import { 
  users, achievements, userProgress, actionPlans, aiSuggestions,
  type User, type InsertUser, type UpsertUser,
  type Achievement, type InsertAchievement,
  type FemeCheckin, type InsertFemeCheckin,
  type BreathSession, type InsertBreathSession,
  type UserEvent, type InsertUserEvent,
  type UserProgress, type InsertUserProgress,
  type ActionPlan, type InsertActionPlan,
  type AiSuggestion, type InsertAiSuggestion
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // Users (Replit Auth compatible)
  getUser(id: number): Promise<User | undefined>;
  getUserByReplitId(replitId: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  unlockAchievement(userId: number, achievementKey: string): Promise<{ unlocked: boolean; achievement?: Achievement; alreadyUnlocked?: boolean }>;
  checkAndUnlockAchievements(userId: number): Promise<Achievement[]>;
  
  // FEME / Essentia methods
  createFemeCheckin(checkin: InsertFemeCheckin): Promise<FemeCheckin>;
  getFemeCheckinsByUserId(userId: number): Promise<FemeCheckin[]>;
  createBreathSession(session: InsertBreathSession): Promise<BreathSession>;
  getBreathSessionsByUserId(userId: number): Promise<BreathSession[]>;
  createUserEvent(event: InsertUserEvent): Promise<UserEvent>;
  getUserEventsByUserId(userId: number | null): Promise<UserEvent[]>;
  
  // Financial data methods
  getIncomesByUserId(userId: number): Promise<any[]>;
  createIncome(income: any): Promise<any>;
  deleteIncome(id: number): Promise<boolean>;
  getExpensesByUserId(userId: number): Promise<any[]>;
  createExpense(expense: any): Promise<any>;
  deleteExpense(id: number): Promise<boolean>;
  getBudgetByUserId(userId: number): Promise<any>;
  createBudget(budget: any): Promise<any>;
  updateBudget(id: number, updates: any): Promise<any>;
  getGoalsByUserId(userId: number): Promise<any[]>;
  createGoal(goal: any): Promise<any>;
  getDebtsByUserId(userId: number): Promise<any[]>;
  createDebt(debt: any): Promise<any>;
  deleteDebt(id: number): Promise<boolean>;
  
  // Profile methods
  getUserProfiles(userId: number): Promise<any[]>;
  createProfile(profile: any): Promise<any>;
  updateProfile(id: number, updates: any): Promise<any>;
  deleteProfile(id: number): Promise<boolean>;
  
  // Thera evaluation tracking
  trackEvaluationClick(userId: number, email: string | null, whatsapp: string | null): Promise<any>;
  getEvaluationClicks(): Promise<any[]>;
  
  // Gamification / Progress methods
  getUserProgress(userId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: number, delta: number, activity?: string): Promise<UserProgress>;
  
  // Action Plans methods
  createActionPlan(plan: InsertActionPlan): Promise<ActionPlan>;
  listActionPlansByUserId(userId: number): Promise<ActionPlan[]>;
  
  // AI Suggestions methods
  createAiSuggestion(suggestion: InsertAiSuggestion): Promise<AiSuggestion>;
  getAiSuggestionsByUserId(userId: number, limit?: number): Promise<AiSuggestion[]>;
  
  // Aggregated history
  getHistory(userId: number, limit?: number): Promise<{
    events: UserEvent[];
    femeCheckins: FemeCheckin[];
    breathSessions: BreathSession[];
    summary: {
      totalEvents: number;
      totalFemeCheckins: number;
      totalBreathSessions: number;
    };
  }>;
}

class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private achievements = new Map<number, Achievement>();
  private femeCheckins = new Map<number, FemeCheckin>();
  private breathSessions = new Map<number, BreathSession>();
  private userEvents = new Map<number, UserEvent>();
  private userProgressMap = new Map<number, UserProgress>(); // key: userId
  private actionPlansMap = new Map<number, ActionPlan>();
  private aiSuggestionsMap = new Map<number, AiSuggestion>();
  private incomes = new Map<number, any>();
  private expenses = new Map<number, any>();
  private budgets = new Map<number, any>();
  private goals = new Map<number, any>();
  private debts = new Map<number, any>();
  private plannings = new Map<number, any>();
  private profiles = new Map<number, any>();
  private currentId = 1;

  constructor() {
    this.users = new Map();
    this.achievements = new Map();
    this.incomes = new Map();
    this.expenses = new Map();
    this.profiles = new Map();
    this.budgets = new Map();
    this.goals = new Map();
    this.debts = new Map();
    this.plannings = new Map();
    this.currentId = 1;
    this.seedUsers();
    this.seedFinancialData();
    this.seedPlanningData();
  }

  private seedUsers() {
    const usersData = [
      { name: "Daniel Allegri", email: "daniel.allegri@venture.com" },
      { name: "Rafael Santos", email: "rafael.santos@gmail.com" },
      { name: "Carlos Santos", email: "carlos.santos@outlook.com" }
    ];

    usersData.forEach(userData => {
      const user: User = { 
        id: this.currentId++,
        replitId: null,
        name: userData.name,
        email: userData.email,
        whatsapp: null,
        firstName: null,
        lastName: null,
        profileImageUrl: null,
        initials: userData.name.split(' ').map(n => n[0]).join(''),
        role: 'user',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(user.id, user);
    });

    // Sample achievements
    const achievementsData = [
      { userId: 1, achievementKey: 'primeiro_login', title: "Primeiro Login", description: "Bem-vindo ao Flow Ecosystem!", appType: "flow", achievementType: "milestone", pointsEarned: 10, earnedAt: new Date(), progress: 100, metadata: {} },
      { userId: 2, achievementKey: 'explorador', title: "Explorador", description: "Visitou todos os apps", appType: "ecosystem", achievementType: "exploration", pointsEarned: 25, earnedAt: new Date(), progress: 100, metadata: {} },
      { userId: 3, achievementKey: 'mestre_flow', title: "Mestre do Flow", description: "Usou o Flow por 30 dias", appType: "flow", achievementType: "streak", pointsEarned: 50, earnedAt: new Date(), progress: 100, metadata: {} }
    ];

    achievementsData.forEach(achievementData => {
      const achievement: Achievement = {
        id: this.currentId++,
        ...achievementData
      };
      this.achievements.set(achievement.id, achievement);
    });
  }

  private seedFinancialData() {
    // Sample incomes
    const incomesData = [
      { userId: 1, description: "Salário Principal", amount: 8500.00, frequency: "mensal", date: new Date(), category: "Trabalho" },
      { userId: 1, description: "Freelance Design", amount: 1200.50, frequency: "unica", date: new Date(), category: "Freelance" },
      { userId: 1, description: "Dividendos Ações", amount: 350.75, frequency: "mensal", date: new Date(), category: "Investimentos" },
      { userId: 1, description: "Aluguel Imóvel", amount: 1800.00, frequency: "mensal", date: new Date(), category: "Aluguel" },
      { userId: 1, description: "Consultoria Tech", amount: 2500.25, frequency: "trimestral", date: new Date(), category: "Consultoria" },
      { userId: 1, description: "Vendas Online", amount: 750.30, frequency: "semanal", date: new Date(), category: "E-commerce" }
    ];

    incomesData.forEach(incomeData => {
      const income = { id: this.currentId++, ...incomeData, createdAt: new Date() };
      this.incomes.set(income.id, income);
    });

    // Sample expenses
    const expensesData = [
      { userId: 1, description: "Supermercado Pão de Açúcar", amount: 450.75, category: "Alimentação", date: new Date(), recurring: true },
      { userId: 1, description: "Gasolina Shell", amount: 280.90, category: "Transporte", date: new Date(), recurring: false },
      { userId: 1, description: "Netflix Premium", amount: 32.90, category: "Entretenimento", date: new Date(), recurring: true },
      { userId: 1, description: "Aluguel Apartamento", amount: 2200.00, category: "Moradia", date: new Date(), recurring: true },
      { userId: 1, description: "Plano de Saúde Unimed", amount: 350.45, category: "Saúde", date: new Date(), recurring: true },
      { userId: 1, description: "Internet Fibra", amount: 120.90, category: "Utilidades", date: new Date(), recurring: true },
      { userId: 1, description: "Academia Smart Fit", amount: 89.90, category: "Saúde", date: new Date(), recurring: true },
      { userId: 1, description: "Spotify Family", amount: 34.90, category: "Entretenimento", date: new Date(), recurring: true },
      { userId: 1, description: "Uber", amount: 180.45, category: "Transporte", date: new Date(), recurring: false },
      { userId: 1, description: "Jantar Restaurante", amount: 120.50, category: "Alimentação", date: new Date(), recurring: false },
      { userId: 1, description: "Farmácia", amount: 85.30, category: "Saúde", date: new Date(), recurring: false },
      { userId: 1, description: "Roupas Shopping", amount: 320.99, category: "Vestuário", date: new Date(), recurring: false }
    ];

    expensesData.forEach(expenseData => {
      const expense = { id: this.currentId++, ...expenseData, createdAt: new Date() };
      this.expenses.set(expense.id, expense);
    });

    // Sample goals
    const goalsData = [
      { userId: 1, title: "Viagem Europa", description: "Economizar para viagem de 15 dias", targetAmount: 15000, currentAmount: 8500, targetDate: new Date('2025-12-31'), category: "Viagem", priority: "alta", status: "ativo" },
      { userId: 1, title: "Reserva Emergência", description: "6 meses de gastos essenciais", targetAmount: 25000, currentAmount: 12000, targetDate: new Date('2025-06-30'), category: "Emergência", priority: "alta", status: "ativo" },
      { userId: 1, title: "Carro Novo", description: "Troca do carro atual", targetAmount: 35000, currentAmount: 18500, targetDate: new Date('2026-03-15'), category: "Transporte", priority: "média", status: "ativo" },
      { userId: 1, title: "Casa Própria", description: "Entrada para apartamento", targetAmount: 80000, currentAmount: 32000, targetDate: new Date('2027-12-31'), category: "Moradia", priority: "alta", status: "ativo" },
      { userId: 1, title: "Curso MBA", description: "Especialização em gestão", targetAmount: 12000, currentAmount: 4500, targetDate: new Date('2025-08-15'), category: "Educação", priority: "média", status: "ativo" },
      { userId: 1, title: "Investimento Renda Fixa", description: "Diversificar carteira", targetAmount: 50000, currentAmount: 28000, targetDate: new Date('2025-12-31'), category: "Investimentos", priority: "baixa", status: "ativo" }
    ];

    goalsData.forEach(goalData => {
      const goal = { id: this.currentId++, ...goalData, createdAt: new Date(), updatedAt: new Date() };
      this.goals.set(goal.id, goal);
    });

    // Sample budgets
    const budgetsData = [
      { userId: 1, category: "Alimentação", planned: 800, spent: 650, month: "2025-01", status: "dentro_limite" },
      { userId: 1, category: "Transporte", planned: 400, spent: 460, month: "2025-01", status: "acima_limite" },
      { userId: 1, category: "Entretenimento", planned: 300, spent: 220, month: "2025-01", status: "dentro_limite" },
      { userId: 1, category: "Saúde", planned: 500, spent: 435, month: "2025-01", status: "dentro_limite" },
      { userId: 1, category: "Moradia", planned: 2500, spent: 2320, month: "2025-01", status: "dentro_limite" },
      { userId: 1, category: "Vestuário", planned: 200, spent: 320, month: "2025-01", status: "acima_limite" }
    ];

    budgetsData.forEach(budgetData => {
      const budget = { id: this.currentId++, ...budgetData, createdAt: new Date(), updatedAt: new Date() };
      this.budgets.set(budget.id, budget);
    });

    // Sample debts
    const debtsData = [
      { userId: 1, name: "Cartão de Crédito Nubank", balance: 2100, minimumPayment: 120, interestRate: 12.5, dueDate: new Date('2025-01-15'), type: "cartao_credito" },
      { userId: 1, name: "Financiamento Carro", balance: 28000, minimumPayment: 850, interestRate: 1.2, dueDate: new Date('2025-01-10'), type: "financiamento" },
      { userId: 1, name: "Empréstimo Pessoal", balance: 8500, minimumPayment: 450, interestRate: 2.8, dueDate: new Date('2025-01-20'), type: "emprestimo" }
    ];

    debtsData.forEach(debtData => {
      const debt = { id: this.currentId++, ...debtData, createdAt: new Date(), updatedAt: new Date() };
      this.expenses.set(debt.id, debt); // Using expenses map for debts
    });
  }

  private seedPlanningData() {
    const samplePlanning = {
      userId: 1,
      fixedExpenses: 4000,
      variableExpenses: 2500,
      savings: 2500,
      leisure: 1200,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.plannings.set(1, samplePlanning);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByReplitId(replitId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.replitId === replitId);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.name === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      replitId: insertUser.replitId || null,
      name: insertUser.name || insertUser.email?.split('@')[0] || 'User',
      email: insertUser.email || null,
      whatsapp: insertUser.whatsapp || null,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      profileImageUrl: insertUser.profileImageUrl || null,
      initials: insertUser.name ? insertUser.name.split(' ').map(n => n[0]).join('') : 'U',
      role: insertUser.role || 'user',
      avatar: insertUser.avatar || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Try to find existing user by replitId
    const existing = Array.from(this.users.values()).find(u => u.replitId === userData.replitId);
    
    if (existing) {
      // Update existing user
      const updatedUser: User = {
        ...existing,
        email: userData.email || existing.email,
        firstName: userData.firstName || existing.firstName,
        lastName: userData.lastName || existing.lastName,
        profileImageUrl: userData.profileImageUrl || existing.profileImageUrl,
        name: userData.firstName && userData.lastName 
          ? `${userData.firstName} ${userData.lastName}`
          : existing.name,
        updatedAt: new Date()
      };
      this.users.set(existing.id, updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const id = this.currentId++;
      const newUser: User = {
        id,
        replitId: userData.replitId,
        name: userData.firstName && userData.lastName 
          ? `${userData.firstName} ${userData.lastName}`
          : userData.email?.split('@')[0] || 'User',
        email: userData.email,
        whatsapp: null,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        initials: userData.firstName && userData.lastName
          ? `${userData.firstName[0]}${userData.lastName[0]}`
          : 'U',
        role: 'user',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(id, newUser);
      return newUser;
    }
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      achievementKey: insertAchievement.achievementKey || null,
      description: insertAchievement.description || null,
      pointsEarned: insertAchievement.pointsEarned || null,
      earnedAt: insertAchievement.earnedAt || null,
      progress: insertAchievement.progress || null,
      metadata: insertAchievement.metadata || {}
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async unlockAchievement(userId: number, achievementKey: string): Promise<{ unlocked: boolean; achievement?: Achievement; alreadyUnlocked?: boolean }> {
    // Import the achievements config dynamically
    const { ACHIEVEMENTS } = await import("@shared/achievements-config");
    
    const achievementConfig = ACHIEVEMENTS[achievementKey];
    if (!achievementConfig) {
      return { unlocked: false };
    }

    // Check if already unlocked
    const existing = Array.from(this.achievements.values()).find(
      a => a.userId === userId && a.achievementKey === achievementKey
    );

    if (existing) {
      return { unlocked: false, alreadyUnlocked: true };
    }

    // Create the achievement
    const achievement: Achievement = {
      id: this.currentId++,
      userId,
      achievementKey,
      title: achievementConfig.title,
      description: achievementConfig.description,
      appType: 'essentia',
      achievementType: achievementConfig.category,
      pointsEarned: achievementConfig.points,
      earnedAt: new Date(),
      progress: 100,
      metadata: {}
    };

    this.achievements.set(achievement.id, achievement);

    // Update user progress with bonus points
    await this.updateUserProgress(userId, achievementConfig.points);

    return { unlocked: true, achievement };
  }

  async checkAndUnlockAchievements(userId: number): Promise<Achievement[]> {
    const { ACHIEVEMENTS, checkAchievement } = await import("@shared/achievements-config");
    
    const newAchievements: Achievement[] = [];

    // Get user statistics
    const femeCheckins = await this.getFemeCheckinsByUserId(userId);
    const breathSessions = await this.getBreathSessionsByUserId(userId);
    const userProgress = await this.getUserProgress(userId);
    const actionPlans = await this.listActionPlansByUserId(userId);
    const aiSuggestions = await this.getAiSuggestionsByUserId(userId);
    
    // Calculate streak (simplified - would need date checking in production)
    const allDates = [
      ...femeCheckins.map(c => c.createdAt),
      ...breathSessions.map(s => s.completedAt),
    ].filter((d): d is Date => d !== null).sort((a, b) => b.getTime() - a.getTime());
    
    const currentStreak = this.calculateStreak(allDates);
    const totalPoints = userProgress?.points || 0;

    // Check each achievement
    for (const [key, config] of Object.entries(ACHIEVEMENTS)) {
      let currentValue = 0;

      switch (config.category) {
        case 'checkin':
          currentValue = femeCheckins.length;
          break;
        case 'breath':
          currentValue = breathSessions.length;
          break;
        case 'points':
          currentValue = totalPoints;
          break;
        case 'streak':
          currentValue = currentStreak;
          break;
        case 'journey':
          if (key === 'plano_criado') currentValue = actionPlans.length;
          if (key === 'ia_terapeuta') currentValue = aiSuggestions.length;
          if (key === 'portal_uau') {
            const portalEvents = await this.getUserEventsByUserId(userId);
            currentValue = portalEvents.filter(e => e.eventName === 'portal_uau_completed').length;
          }
          break;
      }

      if (checkAchievement(key, currentValue)) {
        const result = await this.unlockAchievement(userId, key);
        if (result.unlocked && result.achievement) {
          newAchievements.push(result.achievement);
        }
      }
    }

    return newAchievements;
  }

  private calculateStreak(dates: Date[]): number {
    if (dates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < dates.length - 1; i++) {
      const current = new Date(dates[i]);
      current.setHours(0, 0, 0, 0);
      
      const next = new Date(dates[i + 1]);
      next.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        break;
      }
    }
    
    return streak;
  }

  // Financial data methods
  async getIncomesByUserId(userId: number): Promise<any[]> {
    return Array.from(this.incomes.values()).filter(income => income.userId === userId);
  }

  async createIncome(income: any): Promise<any> {
    const id = this.currentId++;
    const newIncome = { ...income, id, createdAt: new Date() };
    this.incomes.set(id, newIncome);
    console.log("Income created in storage:", newIncome);
    console.log("Total incomes now:", this.incomes.size);
    return newIncome;
  }

  async deleteIncome(id: number): Promise<boolean> {
    const exists = this.incomes.has(id);
    if (exists) {
      this.incomes.delete(id);
    }
    return exists;
  }

  async getExpensesByUserId(userId: number): Promise<any[]> {
    return Array.from(this.expenses.values()).filter(expense => expense.userId === userId);
  }

  async createExpense(expense: any): Promise<any> {
    const id = this.currentId++;
    const newExpense = { ...expense, id, createdAt: new Date() };
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async getBudgetsByUserId(userId: number): Promise<any[]> {
    return Array.from(this.budgets.values()).filter(budget => budget.userId === userId);
  }

  async createBudget(budget: any): Promise<any> {
    const id = this.currentId++;
    const newBudget = { ...budget, id, createdAt: new Date(), updatedAt: new Date() };
    this.budgets.set(id, newBudget);
    return newBudget;
  }

  async getGoalsByUserId(userId: number): Promise<any[]> {
    return Array.from(this.goals.values()).filter(goal => goal.userId === userId);
  }

  async createGoal(goal: any): Promise<any> {
    const id = this.currentId++;
    const newGoal = { ...goal, id, createdAt: new Date(), updatedAt: new Date() };
    this.goals.set(id, newGoal);
    return newGoal;
  }

  async getBudgetByUserId(userId: number): Promise<any> {
    return Array.from(this.budgets.values()).find(budget => budget.userId === userId);
  }

  async createBudget(budget: any): Promise<any> {
    const id = this.currentId++;
    const newBudget = { ...budget, id, createdAt: new Date() };
    this.budgets.set(id, newBudget);
    return newBudget;
  }

  async updateBudget(id: number, updates: any): Promise<any> {
    const budget = this.budgets.get(id);
    if (!budget) return undefined;
    const updatedBudget = { ...budget, ...updates, updatedAt: new Date() };
    this.budgets.set(id, updatedBudget);
    return updatedBudget;
  }

  async deleteExpense(id: number): Promise<boolean> {
    const exists = this.expenses.has(id);
    if (exists) {
      this.expenses.delete(id);
    }
    return exists;
  }

  async deleteDebt(id: number): Promise<boolean> {
    const exists = this.debts.has(id);
    if (exists) {
      this.debts.delete(id);
    }
    return exists;
  }

  async getDebtsByUserId(userId: number): Promise<any[]> {
    return Array.from(this.expenses.values()).filter(item => item.userId === userId && item.type);
  }

  async createDebt(debt: any): Promise<any> {
    const id = this.currentId++;
    const newDebt = { ...debt, id, createdAt: new Date(), updatedAt: new Date() };
    this.expenses.set(id, newDebt);
    return newDebt;
  }

  // Planning methods
  async getPlanningByUserId(userId: number): Promise<any | null> {
    const planning = Array.from(this.plannings.values()).find(p => p.userId === userId);
    return planning || null;
  }

  async savePlanning(planningData: any): Promise<any> {
    const existingPlanning = await this.getPlanningByUserId(planningData.userId);
    
    if (existingPlanning) {
      const updated = { ...existingPlanning, ...planningData, updatedAt: new Date() };
      this.plannings.set(existingPlanning.id, updated);
      return updated;
    } else {
      const id = this.currentId++;
      const newPlanning = { ...planningData, id, createdAt: new Date(), updatedAt: new Date() };
      this.plannings.set(id, newPlanning);
      return newPlanning;
    }
  }

  // Profile methods
  async getUserProfiles(userId: number): Promise<any[]> {
    return Array.from(this.profiles.values()).filter(profile => profile.userId === userId);
  }

  async createProfile(profile: any): Promise<any> {
    const id = this.currentId++;
    const newProfile = { ...profile, id, createdAt: new Date(), updatedAt: new Date() };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async updateProfile(id: number, updates: any): Promise<any> {
    const profile = this.profiles.get(id);
    if (profile) {
      const updatedProfile = { ...profile, ...updates, updatedAt: new Date() };
      this.profiles.set(id, updatedProfile);
      return updatedProfile;
    }
    return null;
  }

  async deleteProfile(id: number): Promise<boolean> {
    return this.profiles.delete(id);
  }

  // Thera evaluation tracking methods
  private evaluationClicks = new Map<number, any>();

  async trackEvaluationClick(userId: number, email: string | null, whatsapp: string | null): Promise<any> {
    const id = this.currentId++;
    const click = {
      id,
      userId,
      userEmail: email,
      userWhatsapp: whatsapp,
      clickedAt: new Date()
    };
    this.evaluationClicks.set(id, click);
    return click;
  }

  async getEvaluationClicks(): Promise<any[]> {
    return Array.from(this.evaluationClicks.values());
  }

  // FEME / Essentia methods
  async createFemeCheckin(checkin: InsertFemeCheckin): Promise<FemeCheckin> {
    const id = this.currentId++;
    const newCheckin: FemeCheckin = {
      ...checkin,
      id,
      coerencia: checkin.coerencia || null,
      intention: checkin.intention || null,
      meta: checkin.meta || {},
      createdAt: new Date(),
    };
    this.femeCheckins.set(id, newCheckin);
    return newCheckin;
  }

  async getFemeCheckinsByUserId(userId: number): Promise<FemeCheckin[]> {
    return Array.from(this.femeCheckins.values()).filter(c => c.userId === userId);
  }

  async createBreathSession(session: InsertBreathSession): Promise<BreathSession> {
    const id = this.currentId++;
    const newSession: BreathSession = {
      ...session,
      id,
      videoUsed: session.videoUsed || null,
      audioUsed: session.audioUsed || null,
      completedAt: new Date(),
    };
    this.breathSessions.set(id, newSession);
    return newSession;
  }

  async getBreathSessionsByUserId(userId: number): Promise<BreathSession[]> {
    return Array.from(this.breathSessions.values()).filter(s => s.userId === userId);
  }

  async createUserEvent(event: InsertUserEvent): Promise<UserEvent> {
    const id = this.currentId++;
    const newEvent: UserEvent = {
      ...event,
      id,
      userId: event.userId || null,
      eventProps: event.eventProps || {},
      createdAt: new Date(),
    };
    this.userEvents.set(id, newEvent);
    return newEvent;
  }

  async getUserEventsByUserId(userId: number | null): Promise<UserEvent[]> {
    if (userId === null) {
      return Array.from(this.userEvents.values()).filter(e => e.userId === null);
    }
    return Array.from(this.userEvents.values()).filter(e => e.userId === userId);
  }

  // Gamification / Progress methods
  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return this.userProgressMap.get(userId);
  }

  async updateUserProgress(userId: number, delta: number, activity?: string): Promise<UserProgress> {
    let progress = this.userProgressMap.get(userId);
    
    if (!progress) {
      // Create new progress if doesn't exist
      progress = {
        id: this.currentId++,
        userId,
        points: 0,
        level: 1,
        breathSessionsCompleted: 0,
        femeCheckinsCompleted: 0,
        aiSessionsCompleted: 0,
        dailyStreak: 0,
        lastActivityAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.userProgressMap.set(userId, progress);
    }

    // Update points and recalculate level
    const newPoints = Math.max(0, (progress.points || 0) + delta);
    const newLevel = Math.floor(newPoints / 500) + 1; // 500 points per level

    // Update activity counters
    if (activity === 'breath_session') {
      progress.breathSessionsCompleted = (progress.breathSessionsCompleted || 0) + 1;
    } else if (activity === 'feme_checkin') {
      progress.femeCheckinsCompleted = (progress.femeCheckinsCompleted || 0) + 1;
    } else if (activity === 'ai_session') {
      progress.aiSessionsCompleted = (progress.aiSessionsCompleted || 0) + 1;
    }

    const updatedProgress: UserProgress = {
      ...progress,
      points: newPoints,
      level: newLevel,
      lastActivityAt: new Date(),
      updatedAt: new Date(),
    };

    this.userProgressMap.set(userId, updatedProgress);
    return updatedProgress;
  }

  // Action Plans methods
  async createActionPlan(plan: InsertActionPlan): Promise<ActionPlan> {
    const id = this.currentId++;
    const newPlan: ActionPlan = {
      ...plan,
      id,
      goal: plan.goal || null,
      firstStep: plan.firstStep || null,
      status: plan.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.actionPlansMap.set(id, newPlan);
    return newPlan;
  }

  async listActionPlansByUserId(userId: number): Promise<ActionPlan[]> {
    return Array.from(this.actionPlansMap.values()).filter(p => p.userId === userId);
  }

  // AI Suggestions methods
  async createAiSuggestion(suggestion: InsertAiSuggestion): Promise<AiSuggestion> {
    const id = this.currentId++;
    const newSuggestion: AiSuggestion = {
      ...suggestion,
      id,
      metadata: suggestion.metadata || null,
      createdAt: new Date(),
    };
    this.aiSuggestionsMap.set(id, newSuggestion);
    return newSuggestion;
  }

  async getAiSuggestionsByUserId(userId: number, limit: number = 50): Promise<AiSuggestion[]> {
    const suggestions = Array.from(this.aiSuggestionsMap.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return suggestions.slice(0, limit);
  }

  // Aggregated history
  async getHistory(userId: number, limit: number = 20): Promise<{
    events: UserEvent[];
    femeCheckins: FemeCheckin[];
    breathSessions: BreathSession[];
    summary: {
      totalEvents: number;
      totalFemeCheckins: number;
      totalBreathSessions: number;
    };
  }> {
    const events = await this.getUserEventsByUserId(userId);
    const femeCheckins = await this.getFemeCheckinsByUserId(userId);
    const breathSessions = await this.getBreathSessionsByUserId(userId);

    return {
      events: events.slice(0, limit),
      femeCheckins: femeCheckins.slice(0, 5),
      breathSessions: breathSessions.slice(0, 5),
      summary: {
        totalEvents: events.length,
        totalFemeCheckins: femeCheckins.length,
        totalBreathSessions: breathSessions.length,
      },
    };
  }
}

export const storage = new MemStorage();