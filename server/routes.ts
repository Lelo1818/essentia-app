import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertIncomeSchema, insertExpenseSchema, insertBudgetSchema, 
  insertDebtSchema, insertGoalSchema, insertAchievementSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock user ID for development (in real app, this would come from authentication)
  const getCurrentUserId = () => 1;

  // Income routes
  app.get("/api/incomes", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const incomes = await storage.getIncomesByUserId(userId);
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar rendas" });
    }
  });

  app.post("/api/incomes", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const processedData = {
        ...req.body,
        userId,
        date: req.body.date ? new Date(req.body.date) : new Date(),
      };
      const validatedData = insertIncomeSchema.parse(processedData);
      const income = await storage.createIncome(validatedData);
      res.status(201).json(income);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar renda" });
      }
    }
  });

  app.delete("/api/incomes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteIncome(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Renda não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar renda" });
    }
  });

  // Expense routes
  app.get("/api/expenses", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const expenses = await storage.getExpensesByUserId(userId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar gastos" });
    }
  });

  app.post("/api/expenses", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const processedData = {
        ...req.body,
        userId,
        date: req.body.date ? new Date(req.body.date) : new Date(),
      };
      const validatedData = insertExpenseSchema.parse(processedData);
      const expense = await storage.createExpense(validatedData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar gasto" });
      }
    }
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExpense(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Gasto não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar gasto" });
    }
  });

  // Budget routes
  app.get("/api/budget", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const budget = await storage.getBudgetByUserId(userId);
      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar orçamento" });
    }
  });

  app.post("/api/budget", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const existingBudget = await storage.getBudgetByUserId(userId);
      const validatedData = insertBudgetSchema.parse({ ...req.body, userId });
      
      if (existingBudget) {
        const updatedBudget = await storage.updateBudget(existingBudget.id, validatedData);
        res.json(updatedBudget);
      } else {
        const budget = await storage.createBudget(validatedData);
        res.status(201).json(budget);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao salvar orçamento" });
      }
    }
  });

  // Debt routes
  app.get("/api/debts", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const debts = await storage.getDebtsByUserId(userId);
      res.json(debts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dívidas" });
    }
  });

  app.post("/api/debts", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const validatedData = insertDebtSchema.parse({ ...req.body, userId });
      const debt = await storage.createDebt(validatedData);
      res.status(201).json(debt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar dívida" });
      }
    }
  });

  app.delete("/api/debts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteDebt(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Dívida não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar dívida" });
    }
  });

  // Goal routes
  app.get("/api/goals", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const goals = await storage.getGoalsByUserId(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar metas" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const processedData = {
        ...req.body,
        userId,
        targetDate: req.body.targetDate ? new Date(req.body.targetDate) : null,
      };
      const validatedData = insertGoalSchema.parse(processedData);
      const goal = await storage.createGoal(validatedData);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar meta" });
      }
    }
  });

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const goal = await storage.updateGoal(id, updates);
      if (goal) {
        res.json(goal);
      } else {
        res.status(404).json({ message: "Meta não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar meta" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteGoal(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Meta não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar meta" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const achievements = await storage.getAchievementsByUserId(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar conquistas" });
    }
  });

  // Financial summary route
  app.get("/api/financial-summary", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const incomes = await storage.getIncomesByUserId(userId);
      const expenses = await storage.getExpensesByUserId(userId);
      const budget = await storage.getBudgetByUserId(userId);
      const goals = await storage.getGoalsByUserId(userId);
      const debts = await storage.getDebtsByUserId(userId);

      // Calculate totals for current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const monthlyIncomes = incomes.filter(income => 
        income.date >= startOfMonth && income.date <= endOfMonth
      );
      const monthlyExpenses = expenses.filter(expense => 
        expense.date >= startOfMonth && expense.date <= endOfMonth
      );

      const totalIncome = monthlyIncomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
      const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      const balance = totalIncome - totalExpenses;

      // Group expenses by category
      const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { total: 0, count: 0 };
        }
        acc[expense.category].total += parseFloat(expense.amount);
        acc[expense.category].count += 1;
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      res.json({
        totalIncome,
        totalExpenses,
        balance,
        expensesByCategory,
        budget,
        goals,
        debts,
        recentTransactions: [...monthlyIncomes.map(i => ({...i, type: 'income'})), ...monthlyExpenses.map(e => ({...e, type: 'expense'}))]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10)
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar resumo financeiro" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
