import { 
  users, achievements,
  type User, type InsertUser,
  type Achievement, type InsertAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Financial data methods
  getIncomesByUserId(userId: number): Promise<any[]>;
  createIncome(income: any): Promise<any>;
  getExpensesByUserId(userId: number): Promise<any[]>;
  createExpense(expense: any): Promise<any>;
  getBudgetsByUserId(userId: number): Promise<any[]>;
  createBudget(budget: any): Promise<any>;
  getGoalsByUserId(userId: number): Promise<any[]>;
  createGoal(goal: any): Promise<any>;
}

class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private achievements = new Map<number, Achievement>();
  private incomes = new Map<number, any>();
  private expenses = new Map<number, any>();
  private budgets = new Map<number, any>();
  private goals = new Map<number, any>();
  private currentId = 1;

  constructor() {
    this.users = new Map();
    this.achievements = new Map();
    this.incomes = new Map();
    this.expenses = new Map();
    this.budgets = new Map();
    this.goals = new Map();
    this.currentId = 1;
    this.seedUsers();
    this.seedFinancialData();
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
        name: userData.name,
        email: userData.email,
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
      { userId: 1, title: "Primeiro Login", description: "Bem-vindo ao Flow Ecosystem!", appType: "flow", achievementType: "milestone", earnedAt: new Date() },
      { userId: 2, title: "Explorador", description: "Visitou todos os apps", appType: "ecosystem", achievementType: "exploration", earnedAt: new Date() },
      { userId: 3, title: "Mestre do Flow", description: "Usou o Flow por 30 dias", appType: "flow", achievementType: "streak", earnedAt: new Date() }
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
      { userId: 1, description: "Salário Principal", amount: 8500, frequency: "mensal", date: new Date() },
      { userId: 1, description: "Freelance Design", amount: 1200, frequency: "unica", date: new Date() },
      { userId: 1, description: "Dividendos", amount: 350, frequency: "mensal", date: new Date() }
    ];

    incomesData.forEach(incomeData => {
      const income = { id: this.currentId++, ...incomeData, createdAt: new Date() };
      this.incomes.set(income.id, income);
    });

    // Sample expenses
    const expensesData = [
      { userId: 1, description: "Supermercado", amount: 450, category: "Alimentação", date: new Date() },
      { userId: 1, description: "Gasolina", amount: 280, category: "Transporte", date: new Date() },
      { userId: 1, description: "Netflix", amount: 32, category: "Entretenimento", date: new Date() }
    ];

    expensesData.forEach(expenseData => {
      const expense = { id: this.currentId++, ...expenseData, createdAt: new Date() };
      this.expenses.set(expense.id, expense);
    });

    // Sample goals
    const goalsData = [
      { userId: 1, title: "Viagem Europa", description: "Economizar para viagem", targetAmount: 15000, currentAmount: 8500, targetDate: new Date('2025-12-31'), category: "Viagem", priority: "alta", status: "ativo" },
      { userId: 1, title: "Reserva Emergência", description: "6 meses de gastos", targetAmount: 25000, currentAmount: 12000, targetDate: new Date('2025-06-30'), category: "Emergência", priority: "alta", status: "ativo" }
    ];

    goalsData.forEach(goalData => {
      const goal = { id: this.currentId++, ...goalData, createdAt: new Date(), updatedAt: new Date() };
      this.goals.set(goal.id, goal);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.name === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || insertUser.email.split('@')[0],
      initials: insertUser.name ? insertUser.name.split(' ').map(n => n[0]).join('') : insertUser.email.substring(0, 2).toUpperCase(),
      role: 'user',
      avatar: null,
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

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      description: insertAchievement.description || null,
      earnedAt: insertAchievement.earnedAt || null
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();