import express, { type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Rota EduVie funcionando na porta principal
  app.get('/eduvie', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduVie Pro</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
    <nav class="bg-white border-b sticky top-0 z-50">
        <div class="px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-lg">E</span>
                </div>
                <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EduVie Pro
                </h1>
            </div>
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                <span class="text-sm text-gray-600">Lelão</span>
            </div>
        </div>
    </nav>

    <div class="px-4 py-6">
        <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard de Aprendizado</h2>
            <p class="text-gray-600">Plataforma Inteligente de Aprendizado Personalizado</p>
            <div class="mt-4 flex items-center gap-3">
                <span class="text-sm text-gray-500">Meta Mensal:</span>
                <div class="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style="width: 80%"></div>
                </div>
                <span class="text-sm font-bold">32/40h</span>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-4">
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-blue-100 rounded-xl mb-2 text-2xl">📚</div>
                    <p class="text-sm text-gray-600 text-center">Cursos</p>
                    <p class="text-2xl font-bold text-gray-900">18</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-4">
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-green-100 rounded-xl mb-2 text-2xl">🏆</div>
                    <p class="text-sm text-gray-600 text-center">Certificados</p>
                    <p class="text-2xl font-bold text-gray-900">5</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-4">
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-orange-100 rounded-xl mb-2 text-2xl">🔥</div>
                    <p class="text-sm text-gray-600 text-center">Sequência</p>
                    <p class="text-2xl font-bold text-gray-900">12 dias</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-4">
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-purple-100 rounded-xl mb-2 text-2xl">⏰</div>
                    <p class="text-sm text-gray-600 text-center">Horas</p>
                    <p class="text-2xl font-bold text-gray-900">127h</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-4">
                <div class="flex flex-col items-center">
                    <div class="p-3 bg-indigo-100 rounded-xl mb-2 text-2xl">📈</div>
                    <p class="text-sm text-gray-600 text-center">Performance</p>
                    <p class="text-2xl font-bold text-gray-900">89%</p>
                </div>
            </div>
        </div>

        <div class="grid w-full grid-cols-3 md:grid-cols-5 bg-white rounded-xl p-2 shadow-lg mb-8">
            <button onclick="showTab('dashboard')" id="tab-dashboard" class="bg-blue-600 text-white flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
                Dashboard
            </button>
            <button onclick="showTab('courses')" id="tab-courses" class="text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
                Cursos
            </button>
            <button onclick="showTab('study')" id="tab-study" class="text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
                Estudar
            </button>
            <button onclick="showTab('create')" id="tab-create" class="text-gray-600 hover:text-blue-600 hidden md:flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
                Criar
            </button>
            <button onclick="showTab('analytics')" id="tab-analytics" class="text-gray-600 hover:text-blue-600 hidden md:flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium">
                Analytics
            </button>
        </div>

        <div id="content-dashboard" class="content-tab">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Plano de Estudos - Hoje</h3>
                <p class="text-gray-600 mb-6">Sessões personalizadas pela IA baseadas no seu perfil</p>
                
                <div class="space-y-4">
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">🎯</div>
                        <div class="flex-1">
                            <h4 class="font-semibold mb-1">Quiz: Funcionalidades ES6+</h4>
                            <p class="text-sm text-gray-600">15 min • Curso #1</p>
                        </div>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            Iniciar
                        </button>
                    </div>
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">▶️</div>
                        <div class="flex-1">
                            <h4 class="font-semibold mb-1">Async/Await vs Promises</h4>
                            <p class="text-sm text-gray-600">28 min • Curso #1</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">94%</span>
                            <button class="border border-green-300 text-green-700 px-4 py-2 rounded-lg">
                                Concluído
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="content-courses" class="content-tab hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex justify-between items-start mb-4">
                        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Intermediário</span>
                        <span class="text-yellow-400 text-sm">★★★★★ 4.8</span>
                    </div>
                    <h3 class="text-lg font-semibold mb-2">JavaScript Moderno e ES6+</h3>
                    <p class="text-sm text-gray-600 mb-4">Domine as funcionalidades mais recentes do JavaScript</p>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span>Progresso</span>
                                <span>68%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style="width: 68%"></div>
                            </div>
                        </div>
                        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                            Continuar Curso
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="content-study" class="content-tab hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-6">
                <h2 class="text-2xl font-bold mb-2">Sessão de Estudo Personalizada</h2>
                <p class="text-indigo-100">Baseada no seu perfil de aprendizagem</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="font-semibold mb-2">Quiz: Funcionalidades ES6+</h3>
                <p class="text-sm text-gray-600 mb-4">Curso #1 • 15 min</p>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <span class="text-sm text-blue-800 font-medium">🤖 Personalizado por IA</span>
                </div>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                    Iniciar Sessão
                </button>
            </div>
        </div>

        <div id="content-create" class="content-tab hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Criador de Conteúdo Inteligente</h3>
                <p class="text-gray-600 mb-6">Transforme qualquer material em uma experiência de aprendizado</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="p-6 border-2 border-dashed border-blue-300 rounded-xl text-center cursor-pointer">
                        <div class="text-blue-600 mb-3 text-2xl">📹</div>
                        <h4 class="font-medium">Upload de Vídeo</h4>
                    </div>
                    <div class="p-6 border-2 border-dashed border-green-300 rounded-xl text-center cursor-pointer">
                        <div class="text-green-600 mb-3 text-2xl">📄</div>
                        <h4 class="font-medium">Documento</h4>
                    </div>
                    <div class="p-6 border-2 border-dashed border-purple-300 rounded-xl text-center cursor-pointer">
                        <div class="text-purple-600 mb-3 text-2xl">🖼️</div>
                        <h4 class="font-medium">Imagens</h4>
                    </div>
                </div>
                <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg">
                    ✨ Criar com IA
                </button>
            </div>
        </div>

        <div id="content-analytics" class="content-tab hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4">Performance de Aprendizagem</h3>
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Tempo médio/sessão</span>
                        <span class="font-bold">28 min</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Melhor performance</span>
                        <span class="font-bold">96%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Área forte</span>
                        <span class="font-bold">Programação</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            document.querySelectorAll('.content-tab').forEach(tab => tab.classList.add('hidden'));
            document.getElementById('content-' + tabName).classList.remove('hidden');
            
            document.querySelectorAll('[id^="tab-"]').forEach(button => {
                button.classList.remove('bg-blue-600', 'text-white');
                button.classList.add('text-gray-600', 'hover:text-blue-600');
            });
            
            document.getElementById('tab-' + tabName).classList.remove('text-gray-600', 'hover:text-blue-600');
            document.getElementById('tab-' + tabName).classList.add('bg-blue-600', 'text-white');
        }
    </script>
</body>
</html>`);
  });

  const server = createServer(app);
  return server;
}