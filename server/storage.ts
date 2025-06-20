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
    this.seedRealisticData();
  }

  private seedRealisticData() {
    // Create 3 realistic users first
    const usersData = [
      { username: "Marcelo Rymer", email: "marcelo@flowapp.com" },
      { username: "Ana Silva", email: "ana.silva@gmail.com" },
      { username: "Carlos Santos", email: "carlos.santos@outlook.com" }
    ];

    usersData.forEach(userData => {
      const user: User = { 
        id: this.currentId++, 
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(user.id, user);
    });

    // Add realistic incomes for Marcelo (user 1)
    const incomesData = [
      { userId: 1, description: "Salário CLT", amount: 8500, category: "salario", date: new Date('2024-06-01') },
      { userId: 1, description: "Freelance Design", amount: 2200, category: "freelance", date: new Date('2024-06-15') },
      { userId: 1, description: "Dividendos Ações", amount: 450, category: "investimentos", date: new Date('2024-06-20') },
      { userId: 2, description: "Salário", amount: 6800, category: "salario", date: new Date('2024-06-01') },
      { userId: 3, description: "Salário", amount: 4500, category: "salario", date: new Date('2024-06-01') }
    ];

    incomesData.forEach(incomeData => {
      const income: Income = {
        id: this.currentId++,
        ...incomeData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.incomes.set(income.id, income);
    });

    // Add realistic expenses for Marcelo (user 1)
    const expensesData = [
      { userId: 1, description: "Supermercado Extra", amount: 320.50, category: "alimentacao", date: new Date('2024-06-18') },
      { userId: 1, description: "Gasolina Posto Shell", amount: 180.00, category: "transporte", date: new Date('2024-06-17') },
      { userId: 1, description: "Aluguel Apartamento", amount: 2200.00, category: "moradia", date: new Date('2024-06-01') },
      { userId: 1, description: "Netflix + Spotify", amount: 45.90, category: "entretenimento", date: new Date('2024-06-01') },
      { userId: 1, description: "Restaurante Japonês", amount: 280.00, category: "alimentacao", date: new Date('2024-06-15') },
      { userId: 1, description: "Farmácia", amount: 85.30, category: "saude", date: new Date('2024-06-12') },
      { userId: 1, description: "Uber", amount: 35.50, category: "transporte", date: new Date('2024-06-16') }
    ];

    expensesData.forEach(expenseData => {
      const expense: Expense = {
        id: this.currentId++,
        ...expenseData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.expenses.set(expense.id, expense);
    });

    // Add realistic goals for Marcelo (user 1)
    const goalsData = [
      { userId: 1, title: "Viagem para Europa", description: "15 dias pela França e Itália", targetAmount: 18000, currentAmount: 12500, targetDate: new Date('2024-12-15'), category: "viagem" },
      { userId: 1, title: "Reserva de Emergência", description: "6 meses de gastos", targetAmount: 25000, currentAmount: 8900, targetDate: new Date('2025-03-01'), category: "emergencia" }
    ];

    goalsData.forEach(goalData => {
      const goal: Goal = {
        id: this.currentId++,
        ...goalData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.goals.set(goal.id, goal);
    });

    // Add budget for Marcelo (user 1)
    const budget: Budget = {
      id: this.currentId++,
      userId: 1,
      totalBudget: 8000,
      categories: { 
        alimentacao: 1200, 
        transporte: 800, 
        moradia: 2200, 
        entretenimento: 400, 
        compras: 600, 
        saude: 300, 
        outros: 500 
      },
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.budgets.set(budget.id, budget);

    // Add debt for Marcelo (user 1)
    const debt: Debt = {
      id: this.currentId++,
      userId: 1,
      description: "Cartão de Crédito Nubank",
      amount: 2800,
      interestRate: 12.5,
      minimumPayment: 280,
      dueDate: new Date('2024-07-10'),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.debts.set(debt.id, debt);

    // Add achievements for Marcelo (user 1)
    const achievementsData = [
      { userId: 1, title: "Primeiro Orçamento", description: "Criou seu primeiro planejamento mensal", category: "financial", earnedAt: new Date('2024-01-20') },
      { userId: 1, title: "Meta Alcançada", description: "Atingiu 50% de uma meta financeira", category: "goals", earnedAt: new Date('2024-03-15') },
      { userId: 1, title: "Poupador Expert", description: "Economizou mais que o planejado por 3 meses", category: "savings", earnedAt: new Date('2024-05-01') }
    ];

    achievementsData.forEach(achievementData => {
      const achievement: Achievement = {
        id: this.currentId++,
        ...achievementData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.achievements.set(achievement.id, achievement);
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
