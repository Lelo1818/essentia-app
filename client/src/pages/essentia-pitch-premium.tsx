import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain, Trophy, Heart, Smartphone, TrendingUp, Users, Building, Shield, Target, Rocket, DollarSign, Globe, Award, Zap, BarChart3, CheckCircle, Star, ArrowUp } from 'lucide-react';
import { AppLogo } from "@/components/ui/app-logo";

const slides = [
  {
    id: 1,
    title: "Essentia",
    subtitle: "Reconectando Propósito e Bem-Estar",
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
            <div className="text-xl mb-6 text-gray-700 font-medium">Um espaço íntimo de despertar</div>
            <div className="text-lg text-gray-600">Práticas simbólicas • Trilhas reflexivas • Microações significativas</div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "O Problema Real",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Vivemos numa era de excesso e desconexão</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Excesso de Informação</h4>
              <p className="text-gray-600">Burnout silencioso e sobrecarga mental constante</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Desconexão Profunda</h4>
              <p className="text-gray-600">As pessoas não sabem mais como se escutar</p>
            </div>
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mx-auto flex items-center justify-center">
                  <Smartphone className="text-white" size={24} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800">Apps Genéricos Falham</h4>
              <p className="text-gray-600">Não tocam o que realmente importa: a alma</p>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "A Nossa Solução",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Essentia convida o usuário a sair do automático</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-purple-800 mb-3">Práticas Simbólicas</h4>
                <p className="text-purple-700">Rituais, respiração, caminhadas conscientes que conectam com a essência</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-3">Trilhas Reflexivas</h4>
                <p className="text-blue-700">Jornadas personalizadas de autoconhecimento e despertar</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-3">Microações Significativas</h4>
                <p className="text-green-700">Pequenos passos diários que geram transformação real</p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-blue-400/30 to-green-400/30 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-4 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] h-96 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
                    <div className="p-6 pt-24">
                      <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-gray-800">Essentia</div>
                        <div className="text-sm text-gray-600">Reconecte-se consigo</div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-3">
                          <div className="text-sm font-medium">🌱 Sabedoria da natureza</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-3">
                          <div className="text-sm font-medium">💝 Conexão humana</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl p-3">
                          <div className="text-sm font-medium">🔮 Apoio da tecnologia</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 italic">Não é terapia, nem autoajuda rápida — é um espaço íntimo de despertar</p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "O que já foi feito",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">1 ano de dedicação solo, sem tração ainda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-purple-600" size={24} />
                  <h4 className="text-xl font-bold text-purple-800">100+ páginas de conteúdo</h4>
                </div>
                <p className="text-purple-700">Conteúdo simbólico e autoral já escritos</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-blue-600" size={24} />
                  <h4 className="text-xl font-bold text-blue-800">3 versões de mockups</h4>
                </div>
                <p className="text-blue-700">Protótipos navegáveis prontos no Replit</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <h4 className="text-xl font-bold text-green-800">Roteiro completo</h4>
                </div>
                <p className="text-green-700">Funcionalidades e jornadas mapeadas</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-orange-600" size={24} />
                  <h4 className="text-xl font-bold text-orange-800">Validação informal</h4>
                </div>
                <p className="text-orange-700">20+ pessoas com feedback positivo</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-teal-600" size={24} />
                  <h4 className="text-xl font-bold text-teal-800">Dossiê organizado</h4>
                </div>
                <p className="text-teal-700">Documentação completa estruturada</p>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="text-red-600" size={24} />
                  <h4 className="text-xl font-bold text-red-800">Coração no jogo</h4>
                </div>
                <p className="text-red-700">Projeto nascido de transformação pessoal</p>
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
    title: "Tamanho de Mercado - Brasil",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mercado Bem-Estar Digital</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg text-gray-600">2024</div>
                <div className="text-4xl font-bold text-blue-600">US$ 543M</div>
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
                <div className="text-sm text-green-600 font-semibold">+12% ao ano</div>
              </div>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Público-Alvo</h3>
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">25-45 anos</div>
                  <div className="text-sm text-purple-700">Faixa etária principal</div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">Apps de meditação</div>
                  <div className="text-sm text-blue-700">Lideram downloads</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">Bem-estar digital</div>
                  <div className="text-sm text-green-700">Crescimento acelerado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <p className="text-white text-center leading-relaxed">
            <em>Fonte: Estimativas internas baseadas em recortes de mercado global e nacional de saúde e bem-estar digital</em>
          </p>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    title: "Concorrentes & Diferenciais",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Principais Concorrentes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-800">Zenklub</h4>
              <p className="text-sm text-gray-600">Saúde mental</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-800">Vittude</h4>
              <p className="text-sm text-gray-600">Terapia online</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-800">Cíngulo</h4>
              <p className="text-sm text-gray-600">Meditação guiada</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-800">Zen App</h4>
              <p className="text-sm text-gray-600">Bem-estar geral</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">🟢 Essentia se diferencia por:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Integração simbólica</h4>
                <p className="text-white/90">Propósito + bem-estar unidos</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Trilha viva e personalizada</h4>
                <p className="text-white/90">Jornada que evolui com você</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Rituais conscientes</h4>
                <p className="text-white/90">Respiração, caminhadas, diários</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Estética sensível</h4>
                <p className="text-white/90">Experiência leve e profunda</p>
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
    title: "Monetização & MVP",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Plano gratuito com alto valor de entrada</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-green-800">Versão Gratuita</h4>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800">Diário pessoal</span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800">Rituais básicos</span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800">Frases inspiradoras</span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800">Trilha inicial</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-blue-800">Upgrade Opcional</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">R$ 9,90</div>
                  <div className="text-blue-800">por mês</div>
                  <div className="text-sm text-blue-600 mt-2">Acesso a recursos extras</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-purple-800 mb-2">Futuras opções:</div>
                  <div className="text-purple-700 space-y-1">
                    <div>• R$ 19,90/mês</div>
                    <div>• R$ 29,90/mês</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Futuro - Expansão</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Comunidade simbólica</h4>
                <p className="text-white/90">Conexão entre usuários</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Parcerias estratégicas</h4>
                <p className="text-white/90">Colaborações com especialistas</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">Mentorias exclusivas</h4>
                <p className="text-white/90">Acompanhamento personalizado</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h4 className="text-lg font-bold text-white mb-2">IA aprofundada</h4>
                <p className="text-white/90">Personalização avançada</p>
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
    title: "Projeções Realistas - 1º Ano",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Métricas com os pés no chão</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5.000</div>
                <div className="text-blue-800 text-lg">usuários</div>
                <div className="text-sm text-blue-600 mt-2">Base inicial realista</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">1.000</div>
                <div className="text-green-800 text-lg">pagantes</div>
                <div className="text-sm text-green-600 mt-2">~20% de conversão</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">R$ 10</div>
                <div className="text-purple-800 text-lg">ticket médio/mês</div>
                <div className="text-sm text-purple-600 mt-2">Plano de entrada</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">R$ 10.000</div>
                <div className="text-orange-800 text-lg">receita/mês</div>
                <div className="text-sm text-orange-600 mt-2">Após validação do modelo</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Estimativas de CAC e Retenção</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">R$ 5-12</div>
                <div className="text-white">CAC estimado</div>
                <div className="text-white/70 text-sm mt-2">Custo de aquisição</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">25-30%</div>
                <div className="text-white">Retenção dia 30</div>
                <div className="text-white/70 text-sm mt-2">Meta realista</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">Acima</div>
                <div className="text-white">da média (3,3%)</div>
                <div className="text-white/70 text-sm mt-2">Nosso diferencial</div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/90 italic">
              Nossa abordagem única, com IA personalizada e conteúdo cultural, visa resolver o problema de baixa conexão que causa o abandono
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 9,
    title: "Quem sou eu - Marcelo Rymer",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Brasileiro, ex-empresário</h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">Importação • Mercado financeiro</p>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-red-800 font-medium">Sem background em tech, mas com alma de construtor simbólico.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">O Essentia é meu chamado</h3>
              <p className="text-white/90">Criei o Essentia após um colapso de sentido.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Jornada de 1 ano</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-blue-600" size={24} />
                  <span className="text-blue-800">Pesquisei, escrevi, testei — sozinho</span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <span className="text-green-800">Fiz mockups, contratei dev</span>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 flex items-center space-x-3">
                  <Heart className="text-orange-600" size={24} />
                  <span className="text-orange-800">Perdi dinheiro, insisti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">O que estou buscando</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-3">Um co-founder ou small builder</h4>
              <p className="text-white/90">Com visão, sensibilidade e energia de execução</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-3">Alguém que entre agora</h4>
              <p className="text-white/90">Ajude a moldar o MVP certo, valide com usuários</p>
            </div>
          </div>
          <div className="mt-6 text-white/90">
            <p className="italic">Quero alguém dentro, não só prestando serviço. Equity aberta. Zero ego. Projeto vivo.</p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 10,
    title: "Contato - Se algo aqui mexeu com você",
    content: (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-8">Não tenho todas as respostas,<br/>mas tenho o coração no jogo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-2xl font-bold text-purple-800 mb-4">Se algo aqui mexeu com você</h4>
                <p className="text-purple-700 text-lg">Me chama. Vamos conversar.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-3">O que eu acredito</h4>
                <div className="text-blue-700 space-y-2">
                  <p>• As pessoas precisam se reconectar consigo</p>
                  <p>• A tecnologia pode servir ao humano</p>
                  <p>• O Brasil merece soluções próprias</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-3">O que eu ofereço</h4>
                <div className="text-green-700 space-y-2">
                  <p>• 1 ano de dedicação integral</p>
                  <p>• 100+ páginas de conteúdo autoral</p>
                  <p>• 3 protótipos funcionais</p>
                  <p>• Validação com 20+ pessoas</p>
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-orange-800 mb-3">O que eu busco</h4>
                <div className="text-orange-700 space-y-2">
                  <p>• Parceiro(a) que acredite na visão</p>
                  <p>• Alguém com energia de execução</p>
                  <p>• Zero ego, muito propósito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Marcelo "Lelo" Rymer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">WhatsApp</h4>
              <p className="text-white/90">(11) 99999-9999</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Email</h4>
              <p className="text-white/90">lelo@essentia.app</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">LinkedIn</h4>
              <p className="text-white/90">/in/marcelo-rymer</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-white/90 text-xl italic">
              "O Essentia nasceu de uma transformação pessoal.<br/>
              Agora quero transformar outras vidas."
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
];

export default function EssentiaPitchPremium() {
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