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
  getDebtsByUserId(userId: number): Promise<any[]>;
  createDebt(debt: any): Promise<any>;
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
      { userId: 1, description: "Salário Principal", amount: 8500, frequency: "mensal", date: new Date(), category: "Trabalho" },
      { userId: 1, description: "Freelance Design", amount: 1200, frequency: "unica", date: new Date(), category: "Freelance" },
      { userId: 1, description: "Dividendos Ações", amount: 350, frequency: "mensal", date: new Date(), category: "Investimentos" },
      { userId: 1, description: "Aluguel Imóvel", amount: 1800, frequency: "mensal", date: new Date(), category: "Aluguel" },
      { userId: 1, description: "Consultoria Tech", amount: 2500, frequency: "trimestral", date: new Date(), category: "Consultoria" },
      { userId: 1, description: "Vendas Online", amount: 750, frequency: "semanal", date: new Date(), category: "E-commerce" }
    ];

    incomesData.forEach(incomeData => {
      const income = { id: this.currentId++, ...incomeData, createdAt: new Date() };
      this.incomes.set(income.id, income);
    });

    // Sample expenses
    const expensesData = [
      { userId: 1, description: "Supermercado Pão de Açúcar", amount: 450, category: "Alimentação", date: new Date(), recurring: true },
      { userId: 1, description: "Gasolina Shell", amount: 280, category: "Transporte", date: new Date(), recurring: false },
      { userId: 1, description: "Netflix Premium", amount: 32, category: "Entretenimento", date: new Date(), recurring: true },
      { userId: 1, description: "Aluguel Apartamento", amount: 2200, category: "Moradia", date: new Date(), recurring: true },
      { userId: 1, description: "Plano de Saúde Unimed", amount: 350, category: "Saúde", date: new Date(), recurring: true },
      { userId: 1, description: "Internet Fibra", amount: 120, category: "Utilidades", date: new Date(), recurring: true },
      { userId: 1, description: "Academia Smart Fit", amount: 89, category: "Saúde", date: new Date(), recurring: true },
      { userId: 1, description: "Spotify Family", amount: 34, category: "Entretenimento", date: new Date(), recurring: true },
      { userId: 1, description: "Uber", amount: 180, category: "Transporte", date: new Date(), recurring: false },
      { userId: 1, description: "Jantar Restaurante", amount: 120, category: "Alimentação", date: new Date(), recurring: false },
      { userId: 1, description: "Farmácia", amount: 85, category: "Saúde", date: new Date(), recurring: false },
      { userId: 1, description: "Roupas Shopping", amount: 320, category: "Vestuário", date: new Date(), recurring: false }
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

  // Financial data methods
  async getIncomesByUserId(userId: number): Promise<any[]> {
    return Array.from(this.incomes.values()).filter(income => income.userId === userId);
  }

  async createIncome(income: any): Promise<any> {
    const id = this.currentId++;
    const newIncome = { ...income, id, createdAt: new Date() };
    this.incomes.set(id, newIncome);
    return newIncome;
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

  async getDebtsByUserId(userId: number): Promise<any[]> {
    return Array.from(this.expenses.values()).filter(item => item.userId === userId && item.type);
  }

  async createDebt(debt: any): Promise<any> {
    const id = this.currentId++;
    const newDebt = { ...debt, id, createdAt: new Date(), updatedAt: new Date() };
    this.expenses.set(id, newDebt);
    return newDebt;
  }
}

export const storage = new MemStorage();