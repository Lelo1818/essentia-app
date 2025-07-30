import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain, Trophy, Heart, Smartphone, TrendingUp, Users, Building, Shield, Target, Rocket, DollarSign, Globe, Award, Zap } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Essentia",
    subtitle: "IA, Gamificação e Ciência para o Bem-Estar Holístico",
    content: (
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-12 max-w-4xl mx-auto shadow-2xl border border-white/30">
            <div className="text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-black">
              ESSENTIA
            </div>
            <div className="text-xl mb-6 text-gray-700 font-medium">Rodada Seed - R$ 8M</div>
            <div className="text-lg text-gray-600">Transformando o Bem-Estar Digital no Brasil</div>
          </div>
        </div>
        {/* Elementos gráficos sutis - redes neurais */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full relative">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute animate-float" style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.5}s`
              }}>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-transparent absolute top-1 left-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "A Crise do Bem-Estar no Brasil",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gráfico Principal - Pizza */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Brasileiros com Ansiedade/Estresse</h3>
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(#1e40af 0deg 252deg, #e5e7eb 252deg 360deg)`
              }}></div>
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">70%</div>
                  <div className="text-sm text-gray-600">População</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico Secundário - Retenção */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Taxa de Abandono Apps</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">90 dias</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{width: '71%'}}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">71% abandonam</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">30 dias</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{width: '96.7%'}}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">96,7% abandonam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <Brain className="text-red-500" size={24} />
              <span className="text-lg text-gray-700">Falta de personalização cultural</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="text-orange-500" size={24} />
              <span className="text-lg text-gray-700">Apps genéricos falham</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-red-600" size={24} />
              <span className="text-lg text-gray-700">71% impacto na produtividade</span>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Mercado Bilionário e em Ascensão",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gráfico de Crescimento */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mercado Brasil - Bem-Estar Digital</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg text-gray-600">2024</div>
                <div className="text-4xl font-bold text-blue-600">US$ 543,5M</div>
              </div>
              <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-green-600 rounded-full transform scale-x-[0.42] origin-left animate-grow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="text-white" size={32} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-600">2030</div>
                <div className="text-4xl font-bold text-green-600">US$ 1,28B</div>
                <div className="text-sm text-green-600 font-semibold">CAGR: 15,0%</div>
              </div>
            </div>
          </div>

          {/* Mapa Brasil + Dados Mobile */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Base de Usuários Mobile</h3>
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="w-48 h-64 mx-auto bg-gradient-to-b from-green-400 to-blue-500 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="absolute inset-4 bg-gradient-to-b from-yellow-400 via-green-500 to-blue-600 opacity-80 rounded-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Smartphone size={48} className="mx-auto mb-2" />
                      <div className="text-2xl font-bold">Brasil</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600">185,4M</div>
                  <div className="text-sm text-gray-600">usuários mobile até 2026</div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600">+5h/dia</div>
                  <div className="text-sm text-gray-600">tempo em smartphones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "Essentia: Revolução do Autocuidado Digital",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mockup do App */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-green-400/30 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-4 shadow-2xl">
              <div className="bg-white rounded-[2.5rem] h-96 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
                <div className="p-6 pt-24">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-gray-800">Essentia</div>
                    <div className="text-sm text-gray-600">Seu Bem-Estar Personalizado</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-3">
                      <div className="flex items-center space-x-3">
                        <Brain className="text-purple-600" size={20} />
                        <span className="text-sm font-medium">IA Adaptativa</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-3">
                      <div className="flex items-center space-x-3">
                        <Trophy className="text-blue-600" size={20} />
                        <span className="text-sm font-medium">Gamificação</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl p-3">
                      <div className="flex items-center space-x-3">
                        <Heart className="text-green-600" size={20} />
                        <span className="text-sm font-medium">Bem-Estar Holístico</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos Flutuantes */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Brain className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">IA Adaptativa</h3>
                  <p className="text-gray-600">Personalização profunda com aprendizado contínuo</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <Trophy className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Gamificação Inteligente</h3>
                  <p className="text-gray-600">Avatar evolutivo e sistema de recompensas</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl">
                  <Heart className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Abordagem Holística</h3>
                  <p className="text-gray-600">Mente + Corpo + Propósito integrados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    id: 5,
    title: "Nossos Pilares: Inovação e Impacto",
    content: (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* IA Preditiva */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                  <Brain className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">IA Preditiva e Adaptativa</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-purple-800">Conteúdo dinamicamente personalizado</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-blue-800">Guias virtuais com IAs de personalidade</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-indigo-800">Algoritmos proprietários brasileiros</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gamificação */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl">
                  <Trophy className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Gamificação Inteligente</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-blue-800">Desafios e rituais personalizados</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-green-800">Avatares que evoluem com usuário</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-teal-800">Sistema de recompensas inteligente</div>
                </div>
              </div>
            </div>
          </div>

          {/* Abordagem Holística */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative p-6 bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl">
                  <Heart className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Abordagem Holística e Cultural</h3>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-green-800">Mental + Físico + Espiritual</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-yellow-800">Roda da Vida digital brasileira</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3">
                  <div className="text-sm font-medium text-orange-800">Rituais de reconexão ancestral</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    title: "A Jornada Essentia: Seu Caminho Personalizado",
    content: (
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Timeline com conectores */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 via-green-400 to-yellow-400 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Etapa 1 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                    <div className="text-white font-bold text-xl">1</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Avaliação Holística</h3>
                <p className="text-sm text-gray-600">Roda da Vida digital e questionários de IA personalizados</p>
                <div className="bg-purple-50 rounded-xl p-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto grid grid-cols-2 gap-1 p-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-purple-400 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                    <div className="text-white font-bold text-xl">2</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Jornada Adaptativa</h3>
                <p className="text-sm text-gray-600">Plano de autocuidado dinamicamente ajustado pela IA</p>
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Brain className="text-blue-500" size={20} />
                    <div className="text-blue-500 text-xs">+</div>
                    <Target className="text-blue-500" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center">
                    <div className="text-white font-bold text-xl">3</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Engajamento Gamificado</h3>
                <p className="text-sm text-gray-600">Desafios, rituais e avatar em evolução contínua</p>
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="text-green-500" size={16} />
                    <Award className="text-green-500" size={16} />
                    <Zap className="text-green-500" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Etapa 4 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                    <div className="text-white font-bold text-xl">4</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Acompanhamento Contínuo</h3>
                <p className="text-sm text-gray-600">Insights personalizados, humor e progresso em tempo real</p>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <TrendingUp className="text-yellow-600 mx-auto" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 7,
    title: "Estratégia de Mercado: Múltiplas Vias de Crescimento",
    content: (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* B2C */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                  <Smartphone className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">B2C - Direto ao Consumidor</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-blue-800">Marketing Digital</div>
                  <div className="text-sm text-blue-600">Influenciadores + Mídia Paga</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-indigo-800">CPI Baixo LatAm</div>
                  <div className="text-sm text-indigo-600">US$ 0,50 - US$ 2,00</div>
                </div>
              </div>
            </div>
          </div>

          {/* B2B */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <Building className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">B2B - Corporativo</h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-800">US$ 1,53B</div>
                  <div className="text-sm text-green-600">Mercado BR bem-estar corporativo 2024</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-emerald-800">Alto LTV</div>
                  <div className="text-sm text-emerald-600">Baixo CAC</div>
                </div>
              </div>
            </div>
          </div>

          {/* B2B2C */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <Shield className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">B2B2C - Planos de Saúde</h3>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-purple-800">Parcerias Estratégicas</div>
                  <div className="text-sm text-purple-600">Operadoras de saúde</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-pink-800">CAC Reduzido</div>
                  <div className="text-sm text-pink-600">Escala massiva</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conectores visuais */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 8,
    title: "Canais de Aquisição: Escalando com Eficiência",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Timeline horizontal dos canais */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-purple-400 rounded-full transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {/* Influenciadores */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Influenciadores</h3>
              <div className="text-sm space-y-1">
                <div className="text-green-600 font-bold">US$ 0,50-2,00</div>
                <div className="text-gray-600">CPI LatAm</div>
              </div>
            </div>

            {/* B2B Corporativo */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">B2B Vendas</h3>
              <div className="text-sm space-y-1">
                <div className="text-green-600 font-bold">Alto LTV</div>
                <div className="text-gray-600">Baixo CAC</div>
              </div>
            </div>

            {/* Parcerias B2B2C */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Parcerias B2B2C</h3>
              <div className="text-sm space-y-1">
                <div className="text-green-600 font-bold">CAC Reduzido</div>
                <div className="text-gray-600">Escala</div>
              </div>
            </div>

            {/* Orgânico */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Orgânico</h3>
              <div className="text-sm space-y-1">
                <div className="text-green-600 font-bold">CAC Zero</div>
                <div className="text-gray-600">ASO/SEO</div>
              </div>
            </div>

            {/* Mídia Paga */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Mídia Paga</h3>
              <div className="text-sm space-y-1">
                <div className="text-green-600 font-bold">US$ 0,22-0,44</div>
                <div className="text-gray-600">CPI Brasil</div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo dos benefícios */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Vantagem Competitiva nos Canais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">70%</div>
              <div className="text-gray-600">Menor CPI que EUA/Europa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3x</div>
              <div className="text-gray-600">Maior engajamento LatAm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="text-gray-600">Canais diversificados</div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 9,
    title: "Roadmap de Crescimento e Tração (24 Meses)",
    content: (
      <div className="max-w-7xl mx-auto">
        {/* Timeline principal */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-purple-400 rounded-full transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {/* Q1-Q2 2025 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                    <Rocket className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Q1-Q2 2025</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-blue-800">10K-20K</div>
                    <div className="text-xs text-blue-600">usuários ativos</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-green-800">25%+</div>
                    <div className="text-xs text-green-600">retenção 30 dias</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Lançamento MVP</div>
              </div>
            </div>

            {/* Q3-Q4 2025 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center">
                    <DollarSign className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Q3-Q4 2025</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-green-800">50K-100K</div>
                    <div className="text-xs text-green-600">usuários ativos</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-purple-800">5%</div>
                    <div className="text-xs text-purple-600">conversão Premium</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Otimização monetização</div>
              </div>
            </div>

            {/* 2026 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">2026</h3>
                <div className="space-y-3">
                  <div className="bg-yellow-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-yellow-800">200K-500K</div>
                    <div className="text-xs text-yellow-600">usuários ativos</div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3">
                    <div className="text-lg font-bold text-red-800">Ensaios</div>
                    <div className="text-xs text-red-600">clínicos</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Escala Brasil</div>
              </div>
            </div>

            {/* 2027+ */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                    <Globe className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800">2027+</h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-purple-800">LatAm</div>
                    <div className="text-xs text-purple-600">expansão</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-pink-800">1M+</div>
                    <div className="text-xs text-pink-600">usuários</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Expansão regional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 10,
    title: "Nosso Modelo de Negócio: Diversificado e Escalável",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Modelo Freemium B2C */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Modelo Freemium B2C</h3>
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-lg text-gray-600">ARPU Anual Alvo</div>
                <div className="text-3xl font-bold text-green-600">US$ 60-80</div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-medium text-blue-800">Básico</span>
                  <span className="text-xl font-bold text-blue-600">R$ 9,90</span>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-medium text-purple-800">Premium</span>
                  <span className="text-xl font-bold text-purple-600">R$ 19,90</span>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-medium text-orange-800">Pro</span>
                  <span className="text-xl font-bold text-orange-600">R$ 29,90</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modelo B2B */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Planos Corporativos B2B</h3>
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-lg text-gray-600">Mercado Corporativo BR</div>
                <div className="text-3xl font-bold text-green-600">US$ 1,53B</div>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <Building className="text-green-600" size={24} />
                    <span className="font-medium text-green-800">Assinaturas Anuais</span>
                  </div>
                  <div className="text-sm text-green-600 mt-2">Alto LTV, Baixo CAC</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <Shield className="text-teal-600" size={24} />
                    <span className="font-medium text-teal-800">Parcerias Planos Saúde</span>
                  </div>
                  <div className="text-sm text-teal-600 mt-2">Licenciamento B2B2C</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projeção de receita */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Projeção de Receita Diversificada</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-gray-600">Assinaturas B2C</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">45%</div>
              <div className="text-gray-600">Contratos B2B</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15%</div>
              <div className="text-gray-600">Parcerias B2B2C</div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  }
];

export default function EssentiaPitchPremium() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-white p-4 relative overflow-hidden"
      style={{ background: slide.bg }}
    >
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute animate-float" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}>
            <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="absolute top-6 left-6 flex gap-3">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Content */}
      <div className="w-full max-w-7xl mx-auto z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl">{slide.title}</h1>
          {slide.subtitle && (
            <h2 className="text-xl md:text-2xl opacity-90 font-medium drop-shadow-lg">{slide.subtitle}</h2>
          )}
        </div>
        <div className="flex justify-center">
          {slide.content}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm opacity-80 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
          Use as setas do teclado ou os botões para navegar • Espaço para próximo slide
        </p>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-grow {
          animation: grow 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}