import { 
  users, incomes, expenses, budgets, debts, goals, achievements,
  type User, type InsertUser,
  type Income, type InsertIncome,
  type Expense, type InsertExpense,
  type Budget, type InsertBudget,
  type Debt, type InsertDebt,
  type Goal, type InsertGoal,
  type Achievement, type InsertAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Incomes
  getIncomesByUserId(userId: number): Promise<Income[]>;
  createIncome(income: InsertIncome): Promise<Income>;
  updateIncome(id: number, updates: Partial<Income>): Promise<Income | undefined>;
  deleteIncome(id: number): Promise<boolean>;
  
  // Expenses
  getExpensesByUserId(userId: number): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, updates: Partial<Expense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  
  // Budgets
  getBudgetByUserId(userId: number): Promise<Budget | undefined>;
  createBudget(budget: InsertBudget): Promise<Budget>;
  updateBudget(id: number, updates: Partial<Budget>): Promise<Budget | undefined>;
  
  // Debts
  getDebtsByUserId(userId: number): Promise<Debt[]>;
  createDebt(debt: InsertDebt): Promise<Debt>;
  updateDebt(id: number, updates: Partial<Debt>): Promise<Debt | undefined>;
  deleteDebt(id: number): Promise<boolean>;
  
  // Goals
  getGoalsByUserId(userId: number): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, updates: Partial<Goal>): Promise<Goal | undefined>;
  deleteGoal(id: number): Promise<boolean>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private incomes: Map<number, Income>;
  private expenses: Map<number, Expense>;
  private budgets: Map<number, Budget>;
  private debts: Map<number, Debt>;
  private goals: Map<number, Goal>;
  private achievements: Map<number, Achievement>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.incomes = new Map();
    this.expenses = new Map();
    this.budgets = new Map();
    this.debts = new Map();
    this.goals = new Map();
    this.achievements = new Map();
    this.currentId = 1;
    
    // Create a default user for development
    this.createUser({
      username: "maria",
      password: "password",
      name: "Maria Silva"
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      level: insertUser.level || 1,
      experience: insertUser.experience || 0
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Incomes
  async getIncomesByUserId(userId: number): Promise<Income[]> {
    return Array.from(this.incomes.values()).filter(income => income.userId === userId);
  }

  async createIncome(insertIncome: InsertIncome): Promise<Income> {
    const id = this.currentId++;
    const income: Income = { 
      ...insertIncome, 
      id,
      createdAt: new Date()
    };
    this.incomes.set(id, income);
    return income;
  }

  async updateIncome(id: number, updates: Partial<Income>): Promise<Income | undefined> {
    const income = this.incomes.get(id);
    if (!income) return undefined;
    
    const updatedIncome = { ...income, ...updates };
    this.incomes.set(id, updatedIncome);
    return updatedIncome;
  }

  async deleteIncome(id: number): Promise<boolean> {
    return this.incomes.delete(id);
  }

  // Expenses
  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(expense => expense.userId === userId);
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.currentId++;
    const expense: Expense = { 
      ...insertExpense, 
      id,
      createdAt: new Date(),
      isFromPhoto: insertExpense.isFromPhoto || false
    };
    this.expenses.set(id, expense);
    return expense;
  }

  async updateExpense(id: number, updates: Partial<Expense>): Promise<Expense | undefined> {
    const expense = this.expenses.get(id);
    if (!expense) return undefined;
    
    const updatedExpense = { ...expense, ...updates };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }

  // Budgets
  async getBudgetByUserId(userId: number): Promise<Budget | undefined> {
    return Array.from(this.budgets.values()).find(budget => budget.userId === userId);
  }

  async createBudget(insertBudget: InsertBudget): Promise<Budget> {
    const id = this.currentId++;
    const budget: Budget = { 
      ...insertBudget, 
      id,
      createdAt: new Date(),
      fixedExpenses: insertBudget.fixedExpenses || "0",
      variableExpenses: insertBudget.variableExpenses || "0",
      savings: insertBudget.savings || "0",
      leisure: insertBudget.leisure || "0"
    };
    this.budgets.set(id, budget);
    return budget;
  }

  async updateBudget(id: number, updates: Partial<Budget>): Promise<Budget | undefined> {
    const budget = this.budgets.get(id);
    if (!budget) return undefined;
    
    const updatedBudget = { ...budget, ...updates };
    this.budgets.set(id, updatedBudget);
    return updatedBudget;
  }

  // Debts
  async getDebtsByUserId(userId: number): Promise<Debt[]> {
    return Array.from(this.debts.values()).filter(debt => debt.userId === userId);
  }

  async createDebt(insertDebt: InsertDebt): Promise<Debt> {
    const id = this.currentId++;
    const debt: Debt = { 
      ...insertDebt, 
      id,
      createdAt: new Date()
    };
    this.debts.set(id, debt);
    return debt;
  }

  async updateDebt(id: number, updates: Partial<Debt>): Promise<Debt | undefined> {
    const debt = this.debts.get(id);
    if (!debt) return undefined;
    
    const updatedDebt = { ...debt, ...updates };
    this.debts.set(id, updatedDebt);
    return updatedDebt;
  }

  async deleteDebt(id: number): Promise<boolean> {
    return this.debts.delete(id);
  }

  // Goals
  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(goal => goal.userId === userId);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.currentId++;
    const goal: Goal = { 
      ...insertGoal, 
      id,
      createdAt: new Date(),
      currentAmount: insertGoal.currentAmount || "0",
      targetDate: insertGoal.targetDate || null
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: number, updates: Partial<Goal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updatedGoal = { ...goal, ...updates };
    this.goals.set(id, updatedGoal);
    return updatedGoal;
  }

  async deleteGoal(id: number): Promise<boolean> {
    return this.goals.delete(id);
  }

  // Achievements
  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      unlockedAt: new Date()
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();
