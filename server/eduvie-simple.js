const express = require('express');
const app = express();

app.get('/eduvie', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>EduVie Pro</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-blue-50 p-8">
<div class="max-w-6xl mx-auto">
<h1 class="text-4xl font-bold text-blue-600 mb-8">EduVie Pro - Funcionando!</h1>
<div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-3xl mb-2">📚</div><h3 class="text-2xl font-bold">18</h3><p class="text-gray-600">Cursos Ativos</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-3xl mb-2">🏆</div><h3 class="text-2xl font-bold">5</h3><p class="text-gray-600">Certificados</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-3xl mb-2">🔥</div><h3 class="text-2xl font-bold">12</h3><p class="text-gray-600">Sequência</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-3xl mb-2">⏰</div><h3 class="text-2xl font-bold">127h</h3><p class="text-gray-600">Horas Totais</p></div>
<div class="bg-white p-6 rounded-xl shadow text-center"><div class="text-3xl mb-2">📈</div><h3 class="text-2xl font-bold">89%</h3><p class="text-gray-600">Performance</p></div>
</div>
<div class="bg-white rounded-xl shadow p-8">
<h2 class="text-3xl font-bold mb-6">Dashboard de Aprendizado</h2>
<p class="text-xl text-gray-600 mb-8">Plataforma Inteligente de Aprendizado Personalizado</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="p-6 bg-gray-50 rounded-xl">
<h3 class="text-xl font-bold mb-4">Quiz: Funcionalidades ES6+</h3>
<p class="text-gray-600 mb-4">15 min • Curso #1</p>
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">Iniciar Sessão</button>
</div>
<div class="p-6 bg-gray-50 rounded-xl">
<h3 class="text-xl font-bold mb-4">Async/Await vs Promises</h3>
<p class="text-gray-600 mb-4">28 min • Curso #1</p>
<div class="flex gap-3">
<span class="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">94%</span>
<button class="border border-green-300 text-green-700 px-6 py-3 rounded-lg">Concluído</button>
</div>
</div>
</div>
</div>
</div>
</body></html>`);
});

app.listen(3001, '0.0.0.0', () => {
  console.log('EduVie rodando na porta 3001');
});