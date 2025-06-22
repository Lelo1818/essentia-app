import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { 
  insertIncomeSchema, insertExpenseSchema, insertBudgetSchema, 
  insertGoalSchema, insertAchievementSchema
} from "@shared/schema";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Servir arquivo HTML estático para EduVie
  app.use('/public', express.static(path.join(__dirname, 'public')));
  
  // Mock user ID for development (in real app, this would come from authentication)
  const getCurrentUserId = () => 1;

  // Test route to verify API is working
  app.get("/api/test", (req, res) => {
    res.json({ message: "API funcionando!", timestamp: new Date().toISOString() });
  });

  // Income routes
  app.get("/api/incomes", async (req, res) => {
    try {
      const userId = 1; // Fixed user ID
      const incomes = await storage.getIncomesByUserId(userId);
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar rendas" });
    }
  });

  app.post("/api/incomes", async (req, res) => {
    try {
      console.log("=== INCOME POST REQUEST ===");
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      
      // Set JSON response header explicitly
      res.setHeader('Content-Type', 'application/json');
      
      const userId = 1;
      const processedData = {
        userId,
        description: req.body.description,
        amount: req.body.amount, // Schema expects decimal which accepts string
        frequency: req.body.frequency || "mensal",
        date: req.body.date ? new Date(req.body.date) : new Date(),
      };
      
      console.log("Processed income data:", processedData);
      
      const validatedData = insertIncomeSchema.parse(processedData);
      const income = await storage.createIncome(validatedData);
      
      console.log("Created income SUCCESS:", income);
      res.status(201).json(income);
    } catch (error) {
      console.error("Error creating income:", error);
      res.setHeader('Content-Type', 'application/json');
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar renda", error: error.message });
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
      const userId = 1;
      const budget = await storage.getPlanningByUserId(userId);
      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar orçamento" });
    }
  });

  app.post("/api/budget", async (req, res) => {
    try {
      const userId = 1;
      const planningData = {
        userId,
        fixedExpenses: parseFloat(req.body.fixedExpenses || 0),
        variableExpenses: parseFloat(req.body.variableExpenses || 0),
        savings: parseFloat(req.body.savings || 0),
        leisure: parseFloat(req.body.leisure || 0),
      };
      
      console.log("Saving planning data:", planningData);
      const planning = await storage.savePlanning(planningData);
      res.json(planning);
    } catch (error) {
      console.error("Error saving planning:", error);
      res.status(500).json({ message: "Erro ao salvar orçamento" });
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
      const userId = 1;
      const processedData = {
        userId,
        title: req.body.title,
        description: req.body.description || "",
        targetAmount: parseFloat(req.body.targetAmount), // Parse to number for decimal field
        currentAmount: parseFloat(req.body.currentAmount || "0"), // Parse to number
        targetDate: req.body.targetDate ? new Date(req.body.targetDate) : null,
        category: req.body.category || "outros",
        priority: req.body.priority || "média",
        status: "ativo"
      };
      
      console.log("Processing goal data:", processedData);
      const goal = await storage.createGoal(processedData);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar meta", error: error.message });
      }
    }
  });

  // Financial summary route
  app.get("/api/financial-summary", async (req, res) => {
    try {
      const userId = 1;
      const incomes = await storage.getIncomesByUserId(userId);
      const expenses = await storage.getExpensesByUserId(userId);
      const budget = await storage.getBudgetByUserId(userId);
      const goals = await storage.getGoalsByUserId(userId);

      const monthlyIncomes = incomes;
      const monthlyExpenses = expenses;

      const totalIncome = monthlyIncomes.reduce((sum, income) => {
        const amount = typeof income.amount === 'string' ? parseFloat(income.amount) : income.amount;
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      const totalExpenses = monthlyExpenses.reduce((sum, expense) => {
        const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      const balance = totalIncome - totalExpenses;

      const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { total: 0, count: 0 };
        }
        const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
        if (!isNaN(amount)) {
          acc[expense.category].total += amount;
          acc[expense.category].count += 1;
        }
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      const summary = {
        totalIncome,
        totalExpenses,
        balance,
        incomes: monthlyIncomes,
        expenses: monthlyExpenses,
        expensesByCategory,
        budget,
        goals,
      };

      res.json(summary);
    } catch (error) {
      console.error("Error fetching financial summary:", error);
      res.status(500).json({ message: "Erro ao buscar resumo financeiro" });
    }
  });

  // EduVie HTML routes (moved to end to prevent API conflicts)
  app.get('/eduvie', (req, res) => {
    try {
      const htmlPath = path.join(__dirname, 'eduvie-standalone.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(html);
    } catch (error) {
      console.error('Erro ao carregar EduVie:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}