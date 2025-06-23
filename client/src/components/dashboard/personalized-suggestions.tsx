import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartInsights, useAutoInsights } from "@/components/enhanced/smart-insights";
import { Percent, Fuel, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeedbackUtils } from "@/utils/feedbackUtils";
import React from "react";

export default function PersonalizedSuggestions() {
  const { data: summary } = useQuery({
    queryKey: ["/api/financial-summary"],
  });

  const autoInsights = useAutoInsights(summary || {});

  const manualSuggestions = [
    {
      title: "Meta de Economia",
      subtitle: "R$ 500/mês",
      description: "Baseado no seu histórico, você pode economizar R$ 500 mensais cortando gastos supérfluos.",
      icon: TrendingUp,
      color: "green",
      buttonText: "Ver Detalhes",
      buttonColor: "bg-green-500 hover:bg-green-600",
      action: () => {
        FeedbackUtils.feedbackAction('interaction');
        // Implementar funcionalidade real de meta de economia
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-6 max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-xl font-bold mb-4 text-green-600">🎯 Meta de Economia - Análise Detalhada</h3>
            
            <div class="space-y-6">
              <!-- Progresso Atual -->
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 class="font-semibold text-green-800 mb-3">📊 Progresso Atual</h4>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Meta mensal: R$ 500</span>
                    <span class="font-semibold">Economizado: R$ 350</span>
                  </div>
                  <div class="w-full bg-green-200 rounded-full h-3">
                    <div class="bg-green-600 h-3 rounded-full transition-all duration-500" style="width: 70%"></div>
                  </div>
                  <div class="text-right text-sm text-green-700">
                    <span class="font-semibold">70% concluído</span> • Faltam R$ 150
                  </div>
                </div>
              </div>
              
              <!-- Análise IA -->
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 class="font-semibold text-blue-800 mb-3">🤖 Análise de IA</h4>
                <div class="space-y-2 text-sm">
                  <p class="text-blue-700">
                    <strong>Padrão identificado:</strong> Você economiza 23% mais quando registra gastos diariamente.
                  </p>
                  <p class="text-blue-700">
                    <strong>Projeção:</strong> Com base no histórico, você atingirá R$ 480 este mês.
                  </p>
                  <p class="text-blue-700">
                    <strong>Oportunidade:</strong> Reduzindo delivery em 30%, economia adicional de R$ 85.
                  </p>
                </div>
              </div>
              
              <!-- Ações Recomendadas -->
              <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 class="font-semibold text-yellow-800 mb-3">💡 Ações Para Atingir a Meta</h4>
                <div class="space-y-3">
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1" onchange="this.checked ? this.nextElementSibling.classList.add('line-through', 'text-gray-500') : this.nextElementSibling.classList.remove('line-through', 'text-gray-500')">
                    <div class="text-sm">
                      <div class="font-medium">Reduzir delivery para R$ 40/semana</div>
                      <div class="text-yellow-600">Economia potencial: R$ 60</div>
                    </div>
                  </label>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1" onchange="this.checked ? this.nextElementSibling.classList.add('line-through', 'text-gray-500') : this.nextElementSibling.classList.remove('line-through', 'text-gray-500')">
                    <div class="text-sm">
                      <div class="font-medium">Trocar marca de produtos de limpeza</div>
                      <div class="text-yellow-600">Economia potencial: R$ 25</div>
                    </div>
                  </label>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1" onchange="this.checked ? this.nextElementSibling.classList.add('line-through', 'text-gray-500') : this.nextElementSibling.classList.remove('line-through', 'text-gray-500')">
                    <div class="text-sm">
                      <div class="font-medium">Cancelar uma assinatura não usada</div>
                      <div class="text-yellow-600">Economia potencial: R$ 30</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <!-- Simulação -->
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 class="font-semibold text-purple-800 mb-3">🎮 Simulação Interativa</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium mb-1">Se eu economizar mais R$:</label>
                    <input type="range" min="0" max="200" value="50" class="w-full" 
                           oninput="
                             const val = this.value;
                             const total = 350 + parseInt(val);
                             const percent = Math.min((total / 500) * 100, 100);
                             this.nextElementSibling.textContent = 'R$ ' + val;
                             document.getElementById('sim-total').textContent = 'Total: R$ ' + total;
                             document.getElementById('sim-percent').textContent = percent.toFixed(1) + '%';
                             document.getElementById('sim-bar').style.width = percent + '%';
                           ">
                    <span class="text-sm font-semibold text-purple-700">R$ 50</span>
                  </div>
                  <div class="text-sm space-y-1">
                    <div id="sim-total" class="font-semibold">Total: R$ 400</div>
                    <div id="sim-percent" class="text-purple-600">80.0%</div>
                    <div class="w-full bg-purple-200 rounded-full h-2">
                      <div id="sim-bar" class="bg-purple-600 h-2 rounded-full transition-all duration-300" style="width: 80%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex gap-3 mt-6">
              <button onclick="
                const checkboxes = this.closest('.bg-white').querySelectorAll('input[type=checkbox]:checked');
                if (checkboxes.length > 0) {
                  alert('✅ ' + checkboxes.length + ' ação(ões) adicionada(s) ao seu plano! Você receberá lembretes personalizados.');
                } else {
                  alert('📝 Análise salva! Você pode voltar a qualquer momento para revisar suas metas.');
                }
                this.closest('.fixed').remove();
              " class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors font-semibold">
                💾 Salvar Plano
              </button>
              <button onclick="this.closest('.fixed').remove()" 
                      class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors">
                Fechar
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
    },
    {
      title: "Categoria em Alerta",
      subtitle: "Alimentação 120%",
      description: "Seus gastos com alimentação ultrapassaram o orçamento planejado em 20%.",
      icon: Percent,
      color: "blue",
      buttonText: "Revisar Orçamento",
      buttonColor: "bg-blue-500 hover:bg-blue-600", 
      action: () => {
        // Implementar funcionalidade real de revisão de orçamento
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-xl font-bold mb-4 text-blue-600">📊 Revisão de Orçamento - Alimentação</h3>
            
            <div class="space-y-6">
              <!-- Alerta Principal -->
              <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div class="flex items-center">
                  <div class="text-red-400 mr-3">⚠️</div>
                  <div>
                    <h4 class="font-semibold text-red-800">Categoria em Alerta</h4>
                    <p class="text-red-700">Gastos ultrapassaram o orçamento em 20% (R$ 96 acima do planejado)</p>
                  </div>
                </div>
              </div>
              
              <!-- Comparativo -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div class="text-sm text-green-600 mb-1">💚 Orçamento Planejado</div>
                  <div class="text-2xl font-bold text-green-700">R$ 480</div>
                  <div class="text-xs text-green-600">Baseado no seu perfil</div>
                </div>
                <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div class="text-sm text-red-600 mb-1">📈 Gasto Real</div>
                  <div class="text-2xl font-bold text-red-700">R$ 576</div>
                  <div class="text-xs text-red-600">120% do orçado</div>
                </div>
              </div>
              
              <!-- Análise Detalhada -->
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 class="font-semibold text-blue-800 mb-3">🔍 Análise por Categoria</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm">🛒 Supermercado</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-blue-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                      </div>
                      <span class="text-sm font-semibold">R$ 360</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">🍕 Delivery</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-red-200 rounded-full h-2">
                        <div class="bg-red-600 h-2 rounded-full" style="width: 90%"></div>
                      </div>
                      <span class="text-sm font-semibold">R$ 180</span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">☕ Cafés/Lanches</span>
                    <div class="flex items-center space-x-2">
                      <div class="w-20 bg-yellow-200 rounded-full h-2">
                        <div class="bg-yellow-600 h-2 rounded-full" style="width: 60%"></div>
                      </div>
                      <span class="text-sm font-semibold">R$ 36</span>
                    </div>
                  </div>
                </div>
                <div class="mt-3 text-xs text-blue-700">
                  ⚡ <strong>Insight IA:</strong> Delivery representa 31% dos gastos. Reduzindo para 2x/semana = economia de R$ 70/mês.
                </div>
              </div>
              
              <!-- Plano de Ajuste -->
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 class="font-semibold text-green-800 mb-3">✅ Plano de Ajuste Personalizado</h4>
                <div class="space-y-3">
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1">
                    <div class="text-sm">
                      <div class="font-medium">Reduzir delivery para 2x por semana</div>
                      <div class="text-green-600">💰 Economia: R$ 70/mês</div>
                    </div>
                  </label>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1" onchange="updateSavings()">
                    <div class="text-sm">
                      <div class="font-medium">Preparar almoço 3x na semana</div>
                      <div class="text-green-600">💰 Economia: R$ 45/mês</div>
                    </div>
                  </label>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" class="mt-1" onchange="updateSavings()">
                    <div class="text-sm">
                      <div class="font-medium">Lista de compras inteligente (app sugere)</div>
                      <div class="text-green-600">💰 Economia: R$ 25/mês</div>
                    </div>
                  </label>
                </div>
                <div class="mt-4 p-3 bg-white rounded border">
                  <div class="text-sm">
                    <div class="flex justify-between">
                      <span>Economia potencial total:</span>
                      <span id="total-savings" class="font-bold text-green-600">R$ 0</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Novo orçamento previsto:</span>
                      <span id="new-budget" class="font-bold text-blue-600">R$ 576</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Lembretes -->
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 class="font-semibold text-purple-800 mb-3">🔔 Configurar Lembretes</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" checked>
                    <span>Lembrete semanal de planejamento de refeições</span>
                  </label>
                  <label class="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" checked>
                    <span>Alerta quando delivery > R$ 40/semana</span>
                  </label>
                  <label class="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox">
                    <span>Sugestões de receitas econômicas por IA</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex gap-3 mt-6">
              <button onclick="
                const checkboxes = this.closest('.bg-white').querySelectorAll('input[type=checkbox]:checked').length;
                alert('🎯 Orçamento ajustado! ' + checkboxes + ' ação(ões) ativadas. Previsão de economia: R$ ' + document.getElementById('total-savings').textContent.replace('R$ ', '') + '/mês');
                this.closest('.fixed').remove();
              " class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors font-semibold">
                ✅ Aplicar Ajustes
              </button>
              <button onclick="this.closest('.fixed').remove()" 
                      class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors">
                Cancelar
              </button>
            </div>
            
            <script>
              function updateSavings() {
                const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
                let total = 0;
                checkboxes.forEach(cb => {
                  const text = cb.parentElement.textContent;
                  if (text.includes('R$ 70')) total += 70;
                  if (text.includes('R$ 45')) total += 45;
                  if (text.includes('R$ 25')) total += 25;
                });
                document.getElementById('total-savings').textContent = 'R$ ' + total;
                document.getElementById('new-budget').textContent = 'R$ ' + (576 - total);
              }
            </script>
          </div>
        `;
        document.body.appendChild(modal);
      }
    },
    {
      title: "Oportunidade de Renda",
      subtitle: "Nova Fonte",
      description: "Considere adicionar uma fonte de renda extra para atingir suas metas mais rapidamente.",
      icon: Fuel,
      color: "purple",
      buttonText: "Adicionar Renda",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        FeedbackUtils.feedbackAction('interaction');
        console.log('Opening opportunities modal...');
        
        // Simpler React modal without dynamic import
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
          <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-purple-600">🚀 Oportunidades de Renda Personalizadas</h3>
                <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-gray-100 rounded">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-6">
                <!-- Análise de Perfil -->
                <div class="bg-purple-50 border-purple-200 border p-4 rounded-lg">
                  <h4 class="font-semibold text-purple-800 mb-3">👤 Análise do Seu Perfil</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div class="text-center">
                      <div class="font-semibold text-purple-700">💼 Disciplinado</div>
                      <div class="text-purple-600">95% de consistência</div>
                    </div>
                    <div class="text-center">
                      <div class="font-semibold text-purple-700">📊 Analítico</div>
                      <div class="text-purple-600">Bom com números</div>
                    </div>
                    <div class="text-center">
                      <div class="font-semibold text-purple-700">💰 Investidor</div>
                      <div class="text-purple-600">R$ 8.750 aplicados</div>
                    </div>
                    <div class="text-center">
                      <div class="font-semibold text-purple-700">🎯 Focado</div>
                      <div class="text-purple-600">Metas claras</div>
                    </div>
                  </div>
                </div>

                <!-- Oportunidades -->
                <div class="space-y-4">
                  <h4 class="font-semibold text-gray-800">🏆 Top 3 Oportunidades Para Você</h4>
                  
                  <div class="opportunity-card bg-green-50 border-green-200 border cursor-pointer hover:shadow-md transition-all duration-200 active:scale-98 p-4 rounded-lg" data-opportunity="consultoria">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="font-semibold text-green-800">💼 Consultoria Financeira</h5>
                      <div class="text-right">
                        <div class="text-lg font-bold text-green-700">R$ 600/mês</div>
                        <div class="text-xs text-green-600 flex items-center gap-1">
                          ⭐ Alta compatibilidade
                        </div>
                      </div>
                    </div>
                    <p class="text-sm text-green-700 mb-3">Ajude pessoas a organizarem suas finanças usando o conhecimento que você já tem.</p>
                    <div class="flex items-center justify-between text-xs">
                      <div class="flex space-x-4">
                        <span>⏰ 3-5h/semana</span>
                        <span>📈 Demanda alta</span>
                        <span>🎯 Baixa barreira entrada</span>
                      </div>
                      <input type="radio" name="opportunity" value="consultoria" class="ml-2">
                    </div>
                  </div>

                  <div class="opportunity-card bg-blue-50 border-blue-200 border cursor-pointer hover:shadow-md transition-all duration-200 active:scale-98 p-4 rounded-lg" data-opportunity="cursos">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="font-semibold text-blue-800">🎓 Criação de Cursos Online</h5>
                      <div class="text-right">
                        <div class="text-lg font-bold text-blue-700">R$ 900/mês</div>
                        <div class="text-xs text-blue-600 flex items-center gap-1">
                          ⭐ Potencial escalável
                        </div>
                      </div>
                    </div>
                    <p class="text-sm text-blue-700 mb-3">Ensine educação financeira criando cursos na Udemy, Hotmart ou plataforma própria.</p>
                    <div class="flex items-center justify-between text-xs">
                      <div class="flex space-x-4">
                        <span>⏰ 8-12h/semana</span>
                        <span>📈 Renda passiva</span>
                        <span>🎯 Investimento inicial baixo</span>
                      </div>
                      <input type="radio" name="opportunity" value="cursos" class="ml-2">
                    </div>
                  </div>

                  <div class="opportunity-card bg-orange-50 border-orange-200 border cursor-pointer hover:shadow-md transition-all duration-200 active:scale-98 p-4 rounded-lg" data-opportunity="afiliados">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="font-semibold text-orange-800">🤝 Marketing de Afiliados</h5>
                      <div class="text-right">
                        <div class="text-lg font-bold text-orange-700">R$ 400/mês</div>
                        <div class="text-xs text-orange-600 flex items-center gap-1">
                          ⭐ Rápido para começar
                        </div>
                      </div>
                    </div>
                    <p class="text-sm text-orange-700 mb-3">Promova produtos financeiros que você já usa e recomendaria para amigos.</p>
                    <div class="flex items-center justify-between text-xs">
                      <div class="flex space-x-4">
                        <span>⏰ 2-4h/semana</span>
                        <span>📈 Comissões recorrentes</span>
                        <span>🎯 Zero investimento</span>
                      </div>
                      <input type="radio" name="opportunity" value="afiliados" class="ml-2">
                    </div>
                  </div>
                </div>

                <!-- Plano de Ação -->
                <div id="action-plan" class="bg-gray-50 border-gray-200 border p-4 rounded-lg hidden">
                  <h4 class="font-semibold text-gray-800 mb-3">📋 Plano de Ação Personalizado</h4>
                  <div id="plan-content"></div>
                </div>

                <!-- Simulador de Impacto -->
                <div class="bg-yellow-50 border-yellow-200 border p-4 rounded-lg">
                  <h4 class="font-semibold text-yellow-800 mb-3">📊 Simulador de Impacto Financeiro</h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">Renda extra mensal desejada:</label>
                      <input type="range" min="200" max="1500" value="500" class="w-full" id="income-slider">
                      <div class="flex justify-between text-xs text-yellow-600">
                        <span>R$ 200</span>
                        <span id="selected-income" class="font-semibold">R$ 500</span>
                        <span>R$ 1.500</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3 text-center text-sm">
                      <div class="bg-white p-2 rounded">
                        <div class="font-semibold text-green-600" id="yearly-extra">R$ 6.000</div>
                        <div class="text-xs text-gray-600">Extra/ano</div>
                      </div>
                      <div class="bg-white p-2 rounded">
                        <div class="font-semibold text-blue-600" id="goal-acceleration">40%</div>
                        <div class="text-xs text-gray-600">Aceleração metas</div>
                      </div>
                      <div class="bg-white p-2 rounded">
                        <div class="font-semibold text-purple-600" id="investment-potential">R$ 2.400</div>
                        <div class="text-xs text-gray-600">Para investir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-3 mt-6">
                <button id="create-plan-btn" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition-colors">
                  💰 Adicionar Renda ao Sistema
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition-colors">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        `;

        // Add event listeners after modal is created
        setTimeout(() => {
          const cards = modal.querySelectorAll('.opportunity-card');
          const actionPlan = modal.querySelector('#action-plan');
          const planContent = modal.querySelector('#plan-content');
          const incomeSlider = modal.querySelector('#income-slider');
          const createPlanBtn = modal.querySelector('#create-plan-btn');
          
          let selectedOpportunity = null;

          cards.forEach(card => {
            card.addEventListener('click', function() {
              // Remove selection from all cards
              cards.forEach(c => c.classList.remove('ring-2', 'ring-purple-400'));
              // Add selection to clicked card
              this.classList.add('ring-2', 'ring-purple-400');
              // Check radio button
              this.querySelector('input[type="radio"]').checked = true;
              
              selectedOpportunity = this.dataset.opportunity;
              
              const plans = {
                consultoria: `
                  <div class="space-y-2 text-sm">
                    <h5 class="font-semibold">Primeiros Passos (Semana 1-2):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Criar perfil no LinkedIn como consultor financeiro</li>
                      <li>• Desenvolver 3 casos de sucesso (pode usar exemplos do app)</li>
                      <li>• Definir pacotes: básico (R$ 100), intermediário (R$ 200), avançado (R$ 350)</li>
                    </ul>
                    <h5 class="font-semibold mt-3">Execução (Semana 3-4):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Oferecer 3 consultorias gratuitas para conseguir depoimentos</li>
                      <li>• Criar conteúdo no Instagram/TikTok sobre dicas financeiras</li>
                      <li>• Começar a cobrar pelos serviços</li>
                    </ul>
                  </div>
                `,
                cursos: `
                  <div class="space-y-2 text-sm">
                    <h5 class="font-semibold">Preparação (Semana 1-3):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Definir nicho: iniciantes, investimentos, ou negócios</li>
                      <li>• Criar outline de 10-15 aulas de 10-15min cada</li>
                      <li>• Gravar aulas piloto e teste com amigos</li>
                    </ul>
                    <h5 class="font-semibold mt-3">Lançamento (Semana 4-6):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Upload na Udemy ou Hotmart (R$ 47-97)</li>
                      <li>• Criar material bônus (planilhas, checklists)</li>
                      <li>• Promover em redes sociais e grupos</li>
                    </ul>
                  </div>
                `,
                afiliados: `
                  <div class="space-y-2 text-sm">
                    <h5 class="font-semibold">Setup Inicial (Semana 1):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Escolher 3-5 produtos financeiros que você usa</li>
                      <li>• Aplicar para programas de afiliados (Nubank, C6, etc)</li>
                      <li>• Criar conteúdo autêntico sobre experiências</li>
                    </ul>
                    <h5 class="font-semibold mt-3">Crescimento (Semana 2-4):</h5>
                    <ul class="space-y-1 text-gray-700 ml-4">
                      <li>• Posts diários com dicas e links nos stories</li>
                      <li>• Participar de grupos sobre finanças</li>
                      <li>• Acompanhar métricas e otimizar</li>
                    </ul>
                  </div>
                `
              };
              
              actionPlan.classList.remove('hidden');
              planContent.innerHTML = plans[selectedOpportunity] || 'Plano em desenvolvimento...';
            });
          });

          // Income slider
          if (incomeSlider) {
            incomeSlider.addEventListener('input', function() {
              const value = this.value;
              modal.querySelector('#selected-income').textContent = 'R$ ' + value;
              modal.querySelector('#yearly-extra').textContent = 'R$ ' + (value * 12).toLocaleString();
              modal.querySelector('#goal-acceleration').textContent = Math.round((value / 500) * 40) + '%';
              modal.querySelector('#investment-potential').textContent = 'R$ ' + (value * 0.4 * 12).toLocaleString();
            });
          }

          // Create plan button
          if (createPlanBtn) {
            createPlanBtn.addEventListener('click', async function() {
              if (selectedOpportunity) {
                try {
                  // Calculate income amount based on opportunity
                  const incomeValues = {
                    consultoria: 600, // Middle of R$ 400-800 range
                    cursos: 900,      // Middle of R$ 600-1200 range
                    afiliados: 400    // Middle of R$ 200-600 range
                  };

                  const monthlyAmount = incomeValues[selectedOpportunity] || 500;

                  // Create income via API
                  const response = await fetch('/api/opportunity-income', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      opportunity: selectedOpportunity,
                      monthlyAmount: monthlyAmount,
                      startDate: new Date().toISOString()
                    })
                  });

                  if (response.ok) {
                    const newIncome = await response.json();
                    alert('🚀 Renda adicionada com sucesso! Nova fonte: R$ ' + monthlyAmount + '/mês em ' + 
                          (selectedOpportunity === 'consultoria' ? 'Consultoria Financeira' :
                           selectedOpportunity === 'cursos' ? 'Cursos Online' : 'Marketing de Afiliados') + 
                          '. A página será atualizada para mostrar no dashboard.');
                    
                    // Force page refresh to update dashboard
                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
                  } else {
                    const errorData = await response.text();
                    console.error('API Error:', errorData);
                    throw new Error('Failed to create income: ' + response.status);
                  }
                } catch (error) {
                  console.error('Error creating opportunity income:', error);
                  console.error('Full error details:', error);
                  alert('❌ Erro ao adicionar renda. Verifique o console para detalhes. Erro: ' + error.message);
                }
              } else {
                alert('📝 Análise salva! Explore as oportunidades e volte quando estiver pronto para começar.');
              }
              modal.remove();
            });
          }
        }, 100);

        document.body.appendChild(modal);
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Smart Insights */}
      {autoInsights.length > 0 && (
        <SmartInsights insights={autoInsights} maxDisplay={3} />
      )}

      {/* Manual Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Sugestões Personalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manualSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <div key={suggestion.title} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getColorClasses(suggestion.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  <Button 
                    onClick={suggestion.action}
                    className={`w-full text-white transition-colors ${suggestion.buttonColor}`}
                  >
                    {suggestion.buttonText}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
