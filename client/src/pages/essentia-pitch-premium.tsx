import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain, Trophy, Heart, Smartphone, TrendingUp, Users, Building, Shield, Target, Rocket, DollarSign, Globe, Award, Zap, BarChart3, CheckCircle, Star, ArrowUp } from 'lucide-react';
import { AppLogo } from "@/components/ui/app-logo";

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
            <div className="flex items-center justify-center mb-6 space-x-4">
              <AppLogo app="purpose" size="xl" />
              <div className="text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-black">
                ESSENTIA
              </div>
            </div>
            <div className="text-xl mb-6 text-gray-700 font-medium">Rodada Seed - R$ 8M</div>
            <div className="text-lg text-gray-600">Transformando o Bem-Estar Digital no Brasil</div>
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
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mercado Brasil - Bem-Estar Digital</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg text-gray-600">2024</div>
                <div className="text-4xl font-bold text-blue-600">US$ 543,5M</div>
              </div>
              <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-green-600 rounded-full transform scale-x-[0.42] origin-left"></div>
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
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 via-green-400 to-yellow-400 transform -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
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
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 8,
    title: "Canais de Aquisição: Escalando com Eficiência",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-purple-400 rounded-full transform -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
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
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-purple-400 rounded-full transform -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
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
  },
  {
    id: 11,
    title: "Nossos KPIs para a Série A: Crescimento Sustentável",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <BarChart3 className="text-white mx-auto" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">LTV:CAC</h3>
              <div className="text-3xl font-bold text-green-600">&gt; 3:1</div>
              <div className="text-sm text-gray-600">Economia unitária saudável</div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                  <TrendingUp className="text-white mx-auto" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Retenção</h3>
              <div className="space-y-2">
                <div className="text-sm"><span className="font-bold text-blue-600">30%</span> - Dia 30</div>
                <div className="text-sm"><span className="font-bold text-blue-600">15%</span> - Dia 90</div>
                <div className="text-sm"><span className="font-bold text-blue-600">60%</span> - Anual</div>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <DollarSign className="text-white mx-auto" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">ARR</h3>
              <div className="text-2xl font-bold text-purple-600">&gt; US$ 1M</div>
              <div className="text-sm text-gray-600">Receita recorrente anual</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                  <Target className="text-white mx-auto" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">CAC Payback Period</h3>
              <div className="text-3xl font-bold text-orange-600">&lt; 12 meses</div>
              <div className="text-sm text-gray-600">Retorno rápido do investimento</div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl">
                  <Star className="text-white mx-auto" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Net Promoter Score</h3>
              <div className="text-3xl font-bold text-yellow-600">&gt; 60</div>
              <div className="text-sm text-gray-600">Alta satisfação do usuário</div>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 12,
    title: "Cenário Competitivo: Nossa Vantagem Inovadora",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center text-white mb-8">Comparativo Competitivo</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4 font-bold text-gray-200">Características</th>
                  <th className="text-center p-4 font-bold text-green-400 bg-green-900/30 rounded-t-lg">Essentia</th>
                  <th className="text-center p-4 font-bold text-gray-300">Calm</th>
                  <th className="text-center p-4 font-bold text-gray-300">Headspace</th>
                  <th className="text-center p-4 font-bold text-gray-300">Outros</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="p-4 font-medium text-gray-200">IA Adaptativa/Personalidade</td>
                  <td className="text-center p-4 bg-green-900/30"><CheckCircle className="text-green-400 mx-auto" size={20} /></td>
                  <td className="text-center p-4 text-gray-400">Básica</td>
                  <td className="text-center p-4 text-gray-400">Básica</td>
                  <td className="text-center p-4 text-gray-400">Limitada</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-4 font-medium text-gray-200">Gamificação</td>
                  <td className="text-center p-4 bg-green-900/30"><CheckCircle className="text-green-400 mx-auto" size={20} /></td>
                  <td className="text-center p-4 text-gray-400">Limitada</td>
                  <td className="text-center p-4 text-gray-400">Média</td>
                  <td className="text-center p-4 text-gray-400">Básica</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-4 font-medium text-gray-200">Abordagem Holística</td>
                  <td className="text-center p-4 bg-green-900/30"><CheckCircle className="text-green-400 mx-auto" size={20} /></td>
                  <td className="text-center p-4 text-gray-400">Parcial</td>
                  <td className="text-center p-4 text-gray-400">Parcial</td>
                  <td className="text-center p-4 text-gray-400">Não</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="p-4 font-medium text-gray-200">Conteúdo Cultural</td>
                  <td className="text-center p-4 bg-green-900/30"><CheckCircle className="text-green-400 mx-auto" size={20} /></td>
                  <td className="text-center p-4 text-gray-400">Global</td>
                  <td className="text-center p-4 text-gray-400">Global</td>
                  <td className="text-center p-4 text-gray-400">Global</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-200">Foco Geográfico</td>
                  <td className="text-center p-4 bg-green-900/30 font-bold text-green-400">Brasil & LatAm</td>
                  <td className="text-center p-4 text-gray-400">Global</td>
                  <td className="text-center p-4 text-gray-400">Global</td>
                  <td className="text-center p-4 text-gray-400">Variado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <p className="text-white leading-relaxed">
            Enquanto líderes globais como Calm e Headspace oferecem soluções valiosas, a Essentia se diferencia por uma 
            <strong className="text-blue-400"> personalização de IA mais profunda</strong>, 
            <strong className="text-green-400"> gamificação integrada</strong> e uma 
            <strong className="text-purple-400"> abordagem holística e culturalmente adaptada</strong> ao público latino-americano. 
            Nossa IA com personalidade e avatares em evolução criam uma conexão única, e a validação científica será um pilar para nossa credibilidade.
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 13,
    title: "Marcelo \"Lelo\" Rymer - Fundador & Visionário",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-green-400/30 rounded-full blur-2xl"></div>
              <div className="relative w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/attached_assets/Lelo_rosto_melhorado_pitch_1753874485532.jpg"
                    alt="Marcelo Lelo Rymer"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Tentar caminhos alternativos
                      const img = e.currentTarget;
                      if (img.src.includes('Lelo_rosto')) {
                        img.src = '/attached_assets/image_1753917701795.png';
                      } else if (img.src.includes('image_1753917701795')) {
                        img.src = 'https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=ML';
                      } else {
                        img.style.display = 'none';
                        const nextElement = img.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                          nextElement.classList.remove('hidden');
                        }
                      }
                    }}
                  />
                  <Users className="text-gray-500 hidden" size={80} />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mt-6">Marcelo "Lelo" Rymer</h3>
            <p className="text-xl text-gray-200">Fundador & Visionário da Essentia</p>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-6">Especialista em bem-estar digital e comportamento humano</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-200"><strong>20+ anos de experiência</strong> como empresário em tecnologia, educação e mercado financeiro</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-200"><strong>Trajetória pessoal de autoconhecimento</strong> que deu origem à Essentia</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-200"><strong>Capacidade comprovada</strong> de construir negócios do zero e liderar equipes multidisciplinares</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <Users className="text-blue-400 mr-3" size={24} />
              Rede Estratégica
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-200">Psicólogos clínicos</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Neurocientistas</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-200">Especialistas em IA e gamificação</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-200">Designers UX/UI</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <Building className="text-green-400 mr-3" size={24} />
              Parcerias Acadêmicas
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-200">USP - Validação científica</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Hospital Albert Einstein</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-200">Centros de pesquisa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 14,
    title: "Projeções Financeiras: Crescimento Exponencial",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Receita Anual Potencial (2027)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                  <BarChart3 className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Cenário Conservador</h4>
              <div className="text-4xl font-bold text-blue-600">US$ 25M</div>
              <div className="text-sm text-gray-600">Base sólida e realista</div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
                  <TrendingUp className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Cenário Moderado</h4>
              <div className="text-4xl font-bold text-green-600">US$ 77M</div>
              <div className="text-sm text-gray-600">Crescimento equilibrado</div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
                  <Rocket className="text-white mx-auto" size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Cenário Agressivo</h4>
              <div className="text-4xl font-bold text-purple-600">US$ 154M</div>
              <div className="text-sm text-gray-600">Alto potencial</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Participação de Mercado 2030</h4>
            <div className="text-center space-y-4">
              <div className="text-lg text-gray-600">SAM Brasil: US$ 1,28 bilhão</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">Conservador</span>
                  <span className="text-2xl font-bold text-blue-600">1,0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Moderado</span>
                  <span className="text-2xl font-bold text-green-600">3,0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">Agressivo</span>
                  <span className="text-2xl font-bold text-purple-600">6,0%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Valuation Projetada 2027</h4>
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  R$ 400M - 960M
                </div>
                <div className="text-gray-600">Revenue Multiple (Health Tech): 8-12x</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                <div className="text-sm text-gray-700">
                  <ArrowUp className="text-green-600 inline mr-2" size={16} />
                  <strong>Crescimento sustentável</strong> baseado em métricas sólidas de engajamento e retenção
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
    id: 15,
    title: "Essentia: Transformando Vidas, Construindo Valor",
    content: (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative flex items-center justify-center mb-6 space-x-4">
              <AppLogo app="purpose" size="xl" />
              <div className="text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-black">
                ESSENTIA
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white/90">Construindo um movimento para democratizar o bem-estar holístico e a saúde mental no Brasil</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Nossa Missão</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-200 mt-1 flex-shrink-0" size={20} />
                <p className="text-white">Tecnologia de ponta e abordagem humana</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-blue-200 mt-1 flex-shrink-0" size={20} />
                <p className="text-white">Mercado em ascensão, diferenciais comprovados</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-purple-200 mt-1 flex-shrink-0" size={20} />
                <p className="text-white">Liderança de excelência e visão clara</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-yellow-200 mt-1 flex-shrink-0" size={20} />
                <p className="text-white">Prontos para capturar fatia significativa do mercado bilionário</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                <span className="text-white">contato@essentia.app</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                <span className="text-white">LinkedIn: /company/essentia-wellness</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
                <span className="text-white">www.essentia.app</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
              <h4 className="font-bold text-white mb-2">Próximos Passos</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-200" size={16} />
                  <span className="text-white">Demo personalizada</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-blue-200" size={16} />
                  <span className="text-white">Due diligence técnica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-purple-200" size={16} />
                  <span className="text-white">Reunião com equipe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Junte-se a nós para transformar milhões de vidas e gerar impacto financeiro e social duradouro
          </h3>
          <div className="text-xl text-white font-semibold">
            R$ 8M Rodada Seed • 18 meses Break-even • 500K+ Usuários meta
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
];

export default function EssentiaPitchPremium() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
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
      {/* Navigation */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="absolute top-6 left-6 flex gap-3 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className="text-sm opacity-80 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
          Use as setas do teclado ou os botões para navegar • Espaço para próximo slide
        </p>
      </div>
    </div>
  );
}