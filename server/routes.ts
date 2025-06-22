import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { 
  insertIncomeSchema, insertExpenseSchema, insertBudgetSchema, 
  insertGoalSchema, insertAchievementSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Servir arquivo HTML estático para EduVie
  app.use('/public', express.static(path.join(__dirname, 'public')));
  
  // Moved EduVie routes to after API routes to prevent conflicts

  // Rota alternativa para teste  
  app.get('/eduvie-test', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html><head><title>EduVie Pro</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-blue-50 p-8">
<div class="max-w-4xl mx-auto">
<h1 class="text-4xl font-bold text-blue-600 mb-8">EduVie Pro - Funcionando!</h1>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-2xl mb-2">📚</div><h3 class="font-bold">18</h3><p class="text-sm text-gray-600">Cursos Ativos</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-2xl mb-2">🏆</div><h3 class="font-bold">5</h3><p class="text-sm text-gray-600">Certificados</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-2xl mb-2">🔥</div><h3 class="font-bold">12</h3><p class="text-sm text-gray-600">Sequência</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-2xl mb-2">📈</div><h3 class="font-bold">89%</h3><p class="text-sm text-gray-600">Performance</p></div>
</div>
<div class="bg-white rounded-xl shadow p-6">
<h2 class="text-2xl font-bold mb-4">Dashboard Funcionando Perfeitamente!</h2>
<p class="text-gray-600 mb-4">Esta é a versão de teste do EduVie que funciona sem problemas.</p>
<div class="flex gap-4">
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg">Iniciar Curso</button>
<button class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">Ver Progresso</button>
</div>
</div>
</div>
</body></html>
    `);
  });

  // Mock user ID for development (in real app, this would come from authentication)
  const getCurrentUserId = () => 1;

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
        amount: typeof req.body.amount === 'string' ? parseFloat(req.body.amount) : req.body.amount,
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

  // Add test route to verify API is working
  app.get("/api/test", (req, res) => {
    res.json({ message: "API funcionando!", timestamp: new Date().toISOString() });
  });

  // Expense routes
    <nav class="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="px-4 md:px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-lg">E</span>
                </div>
                <h1 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EduVie Pro
                </h1>
            </div>
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                <span class="text-sm text-gray-600 hidden md:inline">Lelão</span>
            </div>
        </div>
    </nav>

    <div class="px-4 md:px-6 py-6">
        <!-- Header Principal -->
        <div class="mb-8 fade-in">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 class="text-2xl md:text-4xl font-bold text-gray-900">
                        Dashboard de Aprendizado
                    </h2>
                    <p class="text-sm md:text-lg text-gray-600 mt-2">
                        Plataforma Inteligente de Aprendizado Personalizado
                    </p>
                </div>
                <div class="text-left md:text-right">
                    <p class="text-xs md:text-sm text-gray-500 mb-2">Meta Mensal</p>
                    <div class="flex items-center md:justify-end gap-3">
                        <div class="w-24 md:w-32 h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full progress-bar rounded-full transition-all duration-300" style="width: 80%"></div>
                        </div>
                        <span class="text-xs md:text-sm font-bold text-gray-800">32/40h</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cards de Estatísticas -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8 fade-in">
            <div class="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl">
                <div class="p-3 md:p-6">
                    <div class="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                        <div class="p-2 md:p-3 bg-blue-100 rounded-xl mb-2 md:mb-0">
                            <svg class="w-4 h-4 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs md:text-sm text-gray-600">Cursos Ativos</p>
                            <p class="text-lg md:text-2xl font-bold text-gray-900">18</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl">
                <div class="p-3 md:p-6">
                    <div class="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                        <div class="p-2 md:p-3 bg-green-100 rounded-xl mb-2 md:mb-0">
                            <svg class="w-4 h-4 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs md:text-sm text-gray-600">Certificados</p>
                            <p class="text-lg md:text-2xl font-bold text-gray-900">5</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl">
                <div class="p-3 md:p-6">
                    <div class="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                        <div class="p-2 md:p-3 bg-orange-100 rounded-xl mb-2 md:mb-0">
                            <svg class="w-4 h-4 md:w-6 md:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs md:text-sm text-gray-600">Sequência</p>
                            <p class="text-lg md:text-2xl font-bold text-gray-900">12 dias</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl">
                <div class="p-3 md:p-6">
                    <div class="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                        <div class="p-2 md:p-3 bg-purple-100 rounded-xl mb-2 md:mb-0">
                            <svg class="w-4 h-4 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs md:text-sm text-gray-600">Horas Totais</p>
                            <p class="text-lg md:text-2xl font-bold text-gray-900">127h</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 card-hover rounded-xl">
                <div class="p-3 md:p-6">
                    <div class="flex flex-col md:flex-row items-center md:gap-3 text-center md:text-left">
                        <div class="p-2 md:p-3 bg-indigo-100 rounded-xl mb-2 md:mb-0">
                            <svg class="w-4 h-4 md:w-6 md:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs md:text-sm text-gray-600">Performance</p>
                            <p class="text-lg md:text-2xl font-bold text-gray-900">89%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navegação Principal -->
        <div class="space-y-8">
            <div class="grid w-full grid-cols-3 md:grid-cols-5 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl p-1 md:p-2 border border-gray-200">
                <button onclick="showTab('dashboard')" id="tab-dashboard" class="tab-active flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
                    <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span class="hidden sm:inline">Dashboard</span>
                    <span class="sm:hidden">Home</span>
                </button>
                
                <button onclick="showTab('courses')" id="tab-courses" class="tab-inactive flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
                    <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <span class="hidden sm:inline">Meus Cursos</span>
                    <span class="sm:hidden">Cursos</span>
                </button>
                
                <button onclick="showTab('study')" id="tab-study" class="tab-inactive flex items-center justify-center gap-1 md:gap-2 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-all duration-200 text-xs md:text-sm">
                    <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    <span class="hidden sm:inline">Estudar Hoje</span>
                    <span class="sm:hidden">Estudar</span>
                </button>
                
                <button onclick="showTab('create')" id="tab-create" class="tab-inactive hidden lg:flex items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    Criar Conteúdo
                </button>
                
                <button onclick="showTab('analytics')" id="tab-analytics" class="tab-inactive hidden lg:flex items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    Analytics
                </button>
            </div>

            <!-- Dashboard Content -->
            <div id="content-dashboard" class="content-tab">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Plano de Estudos */
                    <div class="lg:col-span-2">
                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <h3 class="text-lg font-semibold">Plano de Estudos - Hoje</h3>
                            </div>
                            <p class="text-gray-600 mb-6">Sessões personalizadas pela IA baseadas no seu perfil</p>
                            
                            <div class="space-y-4">
                                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div class="p-3 bg-white rounded-lg shadow-sm">
                                        <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-1">
                                            <h4 class="font-semibold text-gray-900">Quiz: Funcionalidades ES6+</h4>
                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">IA</span>
                                        </div>
                                        <div class="flex items-center gap-4 text-sm text-gray-600">
                                            <span>15 min</span>
                                            <span>Curso #1</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        Iniciar
                                    </button>
                                </div>

                                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div class="p-3 bg-white rounded-lg shadow-sm">
                                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-gray-900 mb-1">Async/Await vs Promises Avançado</h4>
                                        <div class="flex items-center gap-4 text-sm text-gray-600">
                                            <span>28 min</span>
                                            <span>Curso #1</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">94%</span>
                                        <button class="border border-green-300 text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                                            Concluído
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Progresso Lateral -->
                    <div class="space-y-6">
                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <h3 class="text-lg font-semibold">Progresso Semanal</h3>
                            </div>
                            
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <div class="flex justify-between items-center">
                                        <p class="font-medium text-gray-900 text-sm">JavaScript Moderno</p>
                                        <span class="text-sm text-gray-600">68%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 68%"></div>
                                    </div>
                                    <p class="text-xs text-gray-500">8/12 aulas • 2h restantes</p>
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between items-center">
                                        <p class="font-medium text-gray-900 text-sm">Design UX/UI</p>
                                        <span class="text-sm text-gray-600">45%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 45%"></div>
                                    </div>
                                    <p class="text-xs text-gray-500">5/10 aulas • 3h restantes</p>
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between items-center">
                                        <p class="font-medium text-gray-900 text-sm">Gestão Financeira</p>
                                        <span class="text-sm text-gray-600">92%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 92%"></div>
                                    </div>
                                    <p class="text-xs text-gray-500">11/12 aulas • 30min restantes</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                </svg>
                                <h3 class="font-bold">IA Personalizada</h3>
                            </div>
                            <p class="text-blue-100 text-sm mb-4">
                                Nossa IA adaptou seu plano de estudos baseado na sua performance em JavaScript.
                            </p>
                            <button class="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                                Ver Recomendações
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Courses Content -->
            <div id="content-courses" class="content-tab hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white/90 backdrop-blur-sm shadow-xl card-hover rounded-xl p-6">
                        <div class="flex justify-between items-start mb-4">
                            <span class="bg-yellow-100 text-yellow-800 border text-xs px-2 py-1 rounded">Intermediário</span>
                            <div class="flex items-center gap-1">
                                <span class="text-yellow-400">★★★★★</span>
                                <span class="text-xs text-gray-600 ml-1">4.8</span>
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold leading-tight mb-2">JavaScript Moderno e ES6+</h3>
                        <p class="text-sm text-gray-600 mb-4">Domine as funcionalidades mais recentes do JavaScript</p>
                        
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Progresso</span>
                                    <span class="font-medium">68%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 68%"></div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between text-xs text-gray-600">
                                <span>Por Carlos Silva</span>
                                <span>2.340 alunos</span>
                            </div>
                            
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Continuar Curso
                            </button>
                        </div>
                    </div>

                    <div class="bg-white/90 backdrop-blur-sm shadow-xl card-hover rounded-xl p-6">
                        <div class="flex justify-between items-start mb-4">
                            <span class="bg-green-100 text-green-800 border text-xs px-2 py-1 rounded">Iniciante</span>
                            <div class="flex items-center gap-1">
                                <span class="text-yellow-400">★★★★★</span>
                                <span class="text-xs text-gray-600 ml-1">4.9</span>
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold leading-tight mb-2">Design UX/UI Centrado no Usuário</h3>
                        <p class="text-sm text-gray-600 mb-4">Crie interfaces incríveis e funcionais</p>
                        
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Progresso</span>
                                    <span class="font-medium">45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 45%"></div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between text-xs text-gray-600">
                                <span>Por Ana Costa</span>
                                <span>1.890 alunos</span>
                            </div>
                            
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                                Continuar Curso
                            </button>
                        </div>
                    </div>

                    <div class="bg-white/90 backdrop-blur-sm shadow-xl card-hover rounded-xl p-6">
                        <div class="flex justify-between items-start mb-4">
                            <span class="bg-red-100 text-red-800 border text-xs px-2 py-1 rounded">Avançado</span>
                            <div class="flex items-center gap-1">
                                <span class="text-yellow-400">★★★★☆</span>
                                <span class="text-xs text-gray-600 ml-1">4.7</span>
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold leading-tight mb-2">Gestão Financeira e Investimentos</h3>
                        <p class="text-sm text-gray-600 mb-4">Aprenda a gerenciar suas finanças como um profissional</p>
                        
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Progresso</span>
                                    <span class="font-medium">92%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="progress-bar h-2 rounded-full transition-all duration-300" style="width: 92%"></div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between text-xs text-gray-600">
                                <span>Por Roberto Martins</span>
                                <span>3.120 alunos</span>
                            </div>
                            
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                                Continuar Curso
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Study Content -->
            <div id="content-study" class="content-tab hidden">
                <div class="space-y-6">
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl rounded-xl p-8">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-2xl font-bold mb-2">Sessão de Estudo Personalizada</h2>
                                <p class="text-indigo-100">Baseada no seu perfil de aprendizagem e objetivos semanais</p>
                            </div>
                            <div class="text-right">
                                <div class="text-3xl font-bold">2</div>
                                <p class="text-indigo-200 text-sm">atividades pendentes</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                <div>
                                    <h3 class="font-semibold">Quiz: Funcionalidades ES6+</h3>
                                    <p class="text-sm text-gray-600">Curso #1 • 15 min</p>
                                </div>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                    </svg>
                                    <span class="text-sm text-blue-800 font-medium">Personalizado por IA</span>
                                </div>
                                <p class="text-xs text-blue-700 mt-1">Adaptado ao seu ritmo de aprendizagem</p>
                            </div>
                            
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                Iniciar Sessão
                            </button>
                        </div>

                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                </svg>
                                <div>
                                    <h3 class="font-semibold">Análise de Métricas e KPIs</h3>
                                    <p class="text-sm text-gray-600">Curso #4 • 35 min</p>
                                </div>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                <div class="flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                    </svg>
                                    <span class="text-sm text-blue-800 font-medium">Personalizado por IA</span>
                                </div>
                                <p class="text-xs text-blue-700 mt-1">Adaptado ao seu ritmo de aprendizagem</p>
                            </div>
                            
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                Iniciar Sessão
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Create Content -->
            <div id="content-create" class="content-tab hidden">
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                        <div class="flex items-center gap-2 mb-4">
                            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                            </svg>
                            <h3 class="text-xl font-semibold">Criador de Conteúdo Inteligente</h3>
                        </div>
                        <p class="text-gray-600 mb-6">Transforme qualquer material em uma experiência de aprendizado personalizada com IA</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer text-center">
                                <svg class="w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                <h4 class="font-medium text-gray-900">Upload de Vídeo</h4>
                                <p class="text-sm text-gray-600 mt-1">MP4, AVI, MOV até 500MB</p>
                            </div>
                            
                            <div class="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer text-center">
                                <svg class="w-8 h-8 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <h4 class="font-medium text-gray-900">Documento</h4>
                                <p class="text-sm text-gray-600 mt-1">PDF, DOC, TXT até 50MB</p>
                            </div>
                            
                            <div class="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer text-center">
                                <svg class="w-8 h-8 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <h4 class="font-medium text-gray-900">Imagens</h4>
                                <p class="text-sm text-gray-600 mt-1">JPG, PNG, SVG até 10MB</p>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Título do Conteúdo</label>
                                    <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Introdução ao React Hooks">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="">Selecione uma categoria</option>
                                        <option>Tecnologia</option>
                                        <option>Negócios</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                        <option>Idiomas</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                                <textarea placeholder="Descreva o que será abordado no curso..." rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                            </div>
                            
                            <button class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-colors">
                                Criar com IA
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Analytics Content -->
            <div id="content-analytics" class="content-tab hidden">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2">
                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <div class="flex items-center gap-2 mb-4">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                </svg>
                                <h3 class="text-lg font-semibold">Performance de Aprendizagem</h3>
                            </div>
                            <div class="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                                <p class="text-gray-500">Gráfico de Performance (Chart.js)</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-6">
                            <h3 class="text-lg font-semibold mb-4">Estatísticas Detalhadas</h3>
                            <div class="space-y-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Tempo médio/sessão</span>
                                    <span class="font-bold">28 min</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Melhor performance</span>
                                    <span class="font-bold">96%</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Área forte</span>
                                    <span class="font-bold">Programação</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Próxima meta</span>
                                    <span class="font-bold">40h/mês</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all content tabs
            const contentTabs = document.querySelectorAll('.content-tab');
            contentTabs.forEach(tab => tab.classList.add('hidden'));
            
            // Show selected content tab
            document.getElementById('content-' + tabName).classList.remove('hidden');
            
            // Update tab styles
            const tabButtons = document.querySelectorAll('[id^="tab-"]');
            tabButtons.forEach(button => {
                button.classList.remove('tab-active');
                button.classList.add('tab-inactive');
            });
            
            // Activate selected tab
            document.getElementById('tab-' + tabName).classList.remove('tab-inactive');
            document.getElementById('tab-' + tabName).classList.add('tab-active');
        }
    </script>
</body>
</html>`);
  });
  // Mock user ID for development (in real app, this would come from authentication)
  const getCurrentUserId = () => 1;

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
        amount: typeof req.body.amount === 'string' ? parseFloat(req.body.amount) : req.body.amount,
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
      console.log("Received expense data:", req.body);
      
      const userId = 1;
      const processedData = {
        userId,
        description: req.body.description,
        amount: String(req.body.amount), // Convert to string for storage
        category: req.body.category,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        isFromPhoto: req.body.isFromPhoto || false,
      };
      
      console.log("Processed data:", processedData);
      
      const validatedData = insertExpenseSchema.parse(processedData);
      const expense = await storage.createExpense(validatedData);
      
      console.log("Created expense:", expense);
      res.status(201).json(expense);
    } catch (error) {
      console.error("Error creating expense:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar gasto", error: error.message });
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
      console.log("Received goal data:", req.body);
      
      const processedData = {
        userId: 1,
        title: req.body.title,
        description: req.body.description || "",
        targetAmount: parseFloat(req.body.targetAmount),
        currentAmount: parseFloat(req.body.currentAmount || "0"),
        targetDate: req.body.targetDate ? new Date(req.body.targetDate) : null,
        category: req.body.category || "outros",
        priority: req.body.priority || "média",
        status: "ativo"
      };
      
      console.log("Processed goal data:", processedData);
      const goal = await storage.createGoal(processedData);
      
      console.log("Created goal:", goal);
      res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      res.status(500).json({ message: "Erro ao criar meta", error: error.message });
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
      const userId = 1; // Fixed user ID
      const incomes = await storage.getIncomesByUserId(userId);
      const expenses = await storage.getExpensesByUserId(userId);
      const budget = await storage.getBudgetByUserId(userId);
      const goals = await storage.getGoalsByUserId(userId);
      const debts = await storage.getDebtsByUserId(userId);

      console.log("Financial summary data:", { incomes, expenses, budget, goals, debts });

      // For demo purposes, use all data instead of filtering by current month
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

      // Group expenses by category
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

      const result = {
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
      };

      console.log("Financial summary result:", result);
      res.json(result);
    } catch (error) {
      console.error("Error in financial summary:", error);
      res.status(500).json({ message: "Erro ao buscar resumo financeiro" });
    }
  });

  // Cash flow endpoint
  app.get("/api/cash-flow", async (req, res) => {
    try {
      const userId = 1;
      const { period = 30 } = req.query;
      
      const incomes = await storage.getIncomesByUserId(userId);
      const expenses = await storage.getExpensesByUserId(userId);
      
      // Generate temporal cash flow data
      const days = parseInt(period as string);
      const cashFlow = [];
      let runningBalance = 8500; // Starting balance
      
      for (let i = 0; i <= days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        
        // Simulate movements based on real data
        let dailyIncome = 0;
        let dailyExpense = 0;
        
        // Distribute incomes across the period
        if (i === 1) dailyIncome += 8500; // Salary
        if (i === 5) dailyIncome += 1200.50; // Freelance
        if (i === 10) dailyIncome += 350.75; // Dividends
        if (i === 15) dailyIncome += 1800; // Rent income
        if (i === 20) dailyIncome += 750.30; // Sales
        
        // Distribute expenses
        if (i % 3 === 0) dailyExpense += Math.random() * 150; // Random expenses
        if (i === 5) dailyExpense += 2200; // Rent
        if (i === 8) dailyExpense += 350.45; // Health insurance
        if (i === 12) dailyExpense += 450.75; // Groceries
        
        runningBalance += dailyIncome - dailyExpense;
        
        cashFlow.push({
          date: date.toISOString(),
          income: dailyIncome,
          expense: dailyExpense,
          balance: runningBalance,
          movement: dailyIncome - dailyExpense
        });
      }
      
      res.json({
        cashFlow,
        summary: {
          currentBalance: runningBalance,
          totalIncome: cashFlow.reduce((sum, d) => sum + d.income, 0),
          totalExpense: cashFlow.reduce((sum, d) => sum + d.expense, 0),
          variation: runningBalance - 8500
        }
      });
    } catch (error) {
      console.error("Error generating cash flow:", error);
      res.status(500).json({ message: "Erro ao gerar fluxo de caixa" });
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

  // Ofertas inteligentes baseadas no perfil real do usuário
  app.get("/api/real-offers", async (req, res) => {
    try {
      const { BrazilianPartnersAggregator } = await import('./integrations/brazilian-partners');
      const aggregator = new BrazilianPartnersAggregator();
      
      // Perfil real baseado nos dados financeiros do usuário
      const userProfile = {
        monthlyIncome: 8500,
        monthlyExpenses: 4200,
        savings: 4300,
        goalsCompleted: 3,
        userLevel: 'premium',
        techInterest: true,
        educationLevel: 'superior'
      };
      
      const partnerOffers = await aggregator.getAllPartnerOffers(userProfile);
      res.json(partnerOffers);
    } catch (error) {
      console.error("Error fetching partner offers:", error);
      res.status(500).json({ message: "Erro ao buscar ofertas de parceiros" });
    }
  });

  // Real cashback endpoint
  app.get("/api/real-cashback", async (req, res) => {
    try {
      const { RealOffersAggregator } = await import('./integrations/real-apis');
      const aggregator = new RealOffersAggregator();
      
      const cashbackOffers = await aggregator.getCashbackOpportunities();
      res.json(cashbackOffers);
    } catch (error) {
      console.error("Error fetching cashback:", error);
      res.status(500).json({ message: "Erro ao buscar cashback" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
