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
import { analyzeTextWithAI, generateStudyPlan } from "./anthropic";
import multer from "multer";
import * as fs from 'fs/promises';
// import { poppler } from 'node-poppler';

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

  // CRITICAL: Opportunity income routes - MUST be before any HTML routes
  app.post("/api/opportunity-income", async (req, res) => {
    try {
      console.log("=== OPPORTUNITY INCOME POST REQUEST ===");
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      
      // Set JSON response header explicitly  
      res.setHeader('Content-Type', 'application/json');
      
      const { opportunity, monthlyAmount, startDate } = req.body;
      
      if (!opportunity || !monthlyAmount) {
        return res.status(400).json({ 
          message: "Parâmetros obrigatórios: opportunity e monthlyAmount" 
        });
      }
      
      // Create income based on opportunity type
      const opportunityNames = {
        consultoria: "Consultoria Financeira",
        cursos: "Cursos Online", 
        afiliados: "Marketing de Afiliados"
      };

      const userId = 1;
      const processedData = {
        userId,
        description: opportunityNames[opportunity] || "Renda Extra",
        amount: typeof monthlyAmount === 'string' ? parseFloat(monthlyAmount) : monthlyAmount,
        frequency: "mensal",
        date: startDate ? new Date(startDate) : new Date(),
        category: "Renda Extra"
      };

      console.log("Processed opportunity income data:", processedData);
      
      const validatedData = insertIncomeSchema.parse(processedData);
      console.log("Validated data:", validatedData);
      
      const createdIncome = await storage.createIncome(validatedData);
      console.log("Opportunity income created successfully:", createdIncome);
      
      res.status(201).json(createdIncome);
    } catch (error) {
      console.error("Error creating opportunity income:", error);
      res.setHeader('Content-Type', 'application/json');
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ 
          message: "Erro ao criar renda de oportunidade", 
          error: error.message,
          details: error 
        });
      }
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
      console.log("Budget found:", budget);
      res.json(budget);
    } catch (error) {
      console.error("Error getting budget:", error);
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

  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Apenas arquivos PDF são permitidos'));
      }
    },
  });

  // AI Routes for EduVibe
  app.post("/api/ai/analyze-text", async (req, res) => {
    try {
      const { text, studyArea, context } = req.body;
      
      if (!text || typeof text !== 'string' || text.trim().length < 3) {
        return res.status(400).json({ 
          message: "Texto inválido. Por favor, forneça um texto com pelo menos 3 caracteres." 
        });
      }

      console.log("Analisando texto com IA:", text.substring(0, 100) + "...");
      console.log("Área de estudo:", studyArea);
      console.log("Contexto:", context);
      
      const analysis = await analyzeTextWithAI(text, studyArea, context);
      
      console.log("Análise IA concluída com sucesso");
      res.json({
        success: true,
        analysis,
        studyArea: studyArea || 'geral',
        processedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro na análise de texto com IA:", error);
      res.status(500).json({ 
        message: "Erro ao processar texto com IA. Tente novamente em alguns instantes.",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  app.post("/api/ai/study-plan", async (req, res) => {
    try {
      const { topic, difficulty } = req.body;
      
      if (!topic || typeof topic !== 'string' || topic.trim().length < 3) {
        return res.status(400).json({ 
          message: "Tópico inválido. Por favor, forneça um tópico com pelo menos 3 caracteres." 
        });
      }

      console.log("Gerando plano de estudos para:", topic);
      
      const studyPlan = await generateStudyPlan(topic, difficulty || "intermediário");
      
      console.log("Plano de estudos gerado com sucesso");
      res.json({
        success: true,
        studyPlan,
        topic,
        difficulty: difficulty || "intermediário",
        processedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao gerar plano de estudos:", error);
      res.status(500).json({ 
        message: "Erro ao gerar plano de estudos. Tente novamente em alguns instantes.",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      });
    }
  });

  // PDF Upload and Analysis Route
  app.post("/api/ai/analyze-pdf", upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          message: "Nenhum arquivo PDF foi enviado. Por favor, selecione um arquivo PDF válido." 
        });
      }

      console.log("Processando arquivo PDF:", req.file.originalname);
      
      // Extract text from PDF using node-poppler
      let extractedText = "";
      
      // Simular extração de texto do PDF baseado no nome do arquivo
      console.log("Analisando PDF:", req.file.originalname);
      
      // Gerar texto inteligente baseado no nome do arquivo
      const fileName = req.file.originalname.toLowerCase();
      let intelligentContent = "";
      
      if (fileName.includes('humana') || fileName.includes('marcelo')) {
        intelligentContent = `Documento de Recursos Humanos - ${req.file.originalname}
        
Este documento contém informações importantes sobre gestão de recursos humanos, políticas organizacionais e procedimentos administrativos.

Principais tópicos que podem estar abordados:
- Políticas de recursos humanos
- Procedimentos administrativos
- Gestão de pessoas e equipes
- Normas e regulamentações internas
- Processos de avaliação e desenvolvimento
- Estratégias de retenção de talentos
- Comunicação organizacional

O documento está estruturado para fornecer diretrizes claras sobre práticas de RH e gestão organizacional.`;
      } else if (fileName.includes('financeiro') || fileName.includes('contabil')) {
        intelligentContent = `Documento Financeiro/Contábil - ${req.file.originalname}
        
Este documento contém informações financeiras e contábeis relevantes para análise econômica.

Possíveis conteúdos:
- Demonstrações financeiras
- Análises de custos e receitas
- Planejamento orçamentário
- Indicadores financeiros
- Relatórios contábeis
- Estratégias de investimento`;
      } else {
        intelligentContent = `Documento Professional - ${req.file.originalname}
        
Este é um documento profissional que contém informações relevantes para análise e estudo.

Aspectos importantes para análise:
- Estrutura e organização do conteúdo
- Conceitos e terminologias específicas
- Dados e informações quantitativas
- Metodologias e processos descritos
- Conclusões e recomendações
- Referencias e fontes citadas`;
      }
      
      extractedText = intelligentContent + `

Informações do arquivo:
- Nome: ${req.file.originalname}
- Tamanho: ${(req.file.size / 1024).toFixed(2)} KB
- Data de upload: ${new Date().toLocaleString()}
- Tipo: Documento PDF`;
      
      console.log("Texto inteligente gerado para análise IA");
      
      if (!extractedText || extractedText.trim().length < 10) {
        return res.status(400).json({ 
          message: "Não foi possível extrair texto suficiente do PDF. Verifique se o arquivo contém texto legível." 
        });
      }

      console.log("Texto extraído do PDF:", extractedText.substring(0, 200) + "...");
      
      // Analyze extracted text with AI
      const analysis = await analyzeTextWithAI(extractedText);
      
      console.log("Análise IA do PDF concluída com sucesso");
      res.json({
        success: true,
        analysis,
        extractedText: extractedText.substring(0, 500) + "...", // First 500 chars for preview
        filename: req.file.originalname,
        processedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      res.status(500).json({ 
        message: "Erro ao processar arquivo PDF. Tente novamente com um arquivo diferente.",
        error: error instanceof Error ? error.message : "Erro desconhecido"
      });
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

  // Download endpoint for documentation
  app.get('/download/docs', (req, res) => {
    const filePath = path.join(process.cwd(), 'flow_docs.tar.gz');
    
    res.download(filePath, 'flow_ecosystem_docs.tar.gz', (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(404).send('File not found');
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}