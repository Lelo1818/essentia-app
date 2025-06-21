import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, GraduationCap, TrendingUp, Baby, Play, Users, Award, Zap, Brain, Heart, Calendar, CheckCircle, Clock, Lightbulb, Rocket, Star } from "lucide-react";

// Simple audio feedback functions
const playButtonSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    // Silent fail
  }
};

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    [523.25, 659.25, 783.99].forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.1, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  } catch (error) {
    // Silent fail
  }
};

export default function EcosystemSelector() {
  const apps = [
    {
      id: "essentia",
      name: "Essentia",
      subtitle: "Desperte Seu Propósito",
      description: "Jornada de autodescoberta com rituais, respiração e transformação pessoal.",
      features: ["Avatar 3D Evolutivo", "18 Módulos Simbólicos", "Conteúdo Rômulo Nomad", "Rituais Interativos"],
      metrics: "72% clareza | 89 dias | 12 conquistas",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      route: "/purpose",
      status: "Completo",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: "eduvie",
      name: "EduVie", 
      subtitle: "Educação Personalizada",
      description: "Aprendizado adaptativo com IA, trilhas personalizadas e gamificação.",
      features: ["IA Adaptativa", "Trilhas Personalizadas", "Gamificação", "Analytics Avançado"],
      metrics: "85% retenção | 150+ cursos | 12k usuários",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600", 
      route: "/edu",
      status: "Completo",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
    },
    {
      id: "flow",
      name: "Flow",
      subtitle: "Gestão Financeira",
      description: "Controle financeiro inteligente com análise preditiva e metas automatizadas.",
      features: ["Análise Preditiva", "Automação Inteligente", "Metas Personalizadas", "Dashboard Avançado"],
      metrics: "Q3 2025 | MVP em testes | 500+ beta users",
      icon: TrendingUp,
      color: "from-green-600 to-emerald-600",
      route: "/flow", 
      status: "Completo",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
    },
    {
      id: "flow-kids",
      name: "Flow Kids",
      subtitle: "Educação Financeira Infantil", 
      description: "Ensino lúdico de finanças para crianças com jogos e atividades interativas.",
      features: ["Gamificação Total", "Realidade Aumentada", "Pais & Filhos", "Certificação Digital"],
      metrics: "Conceito validado | Protótipo Q4 2025",
      icon: Baby,
      color: "from-orange-600 to-yellow-600",
      route: "/flow-kids",
      status: "Completo", 
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg">
            Apresentação Exclusiva - Daniel Allegri
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Ecossistema Digital
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto px-4">
            Quatro aplicativos revolucionários que transformam vida, educação e finanças
          </p>
          <p className="text-lg text-purple-300 mb-8">
            Tecnologia de ponta + Conteúdo transformacional = Impacto social massivo
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Users className="w-8 h-8 text-purple-400" />
                50K+
              </div>
              <p className="text-gray-400">Usuários Potenciais</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Award className="w-8 h-8 text-blue-400" />
                4 Apps
              </div>
              <p className="text-gray-400">Verticais de Mercado</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                <Zap className="w-8 h-8 text-green-400" />
                85%
              </div>
              <p className="text-gray-400">Retenção Média</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Link href="/epic-demo">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Demo Épica das Galáxias
              </Button>
            </Link>
            <Link href="/investor-demo">
              <Button variant="outline" className="text-purple-400 border-purple-400 px-8 py-4 text-lg">
                Demo Técnica
              </Button>
            </Link>
            <Button variant="outline" className="text-purple-400 border-purple-400 px-8 py-4 text-lg">
              Acesso: danielallegri2025
            </Button>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <CardContent className="p-0 overflow-hidden">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={app.image} 
                      alt={app.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-80`}></div>
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        app.status === 'Completo' ? 'bg-green-500/30 text-green-100' :
                        app.status === 'Em desenvolvimento' ? 'bg-yellow-500/30 text-yellow-100' :
                        'bg-blue-500/30 text-blue-100'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{app.name}</h3>
                      <h4 className="text-base md:text-lg text-purple-300 mb-3">{app.subtitle}</h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">{app.description}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Funcionalidades
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {app.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-white/10 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Métricas
                      </h5>
                      <p className="text-purple-300 text-sm">{app.metrics}</p>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                      {app.status === 'Completo' ? (
                        <Link href={app.route}>
                          <Button className={`bg-gradient-to-r ${app.color} hover:opacity-90 text-white w-full py-3 text-lg font-semibold`}>
                            <Play className="w-5 h-5 mr-2" />
                            Testar Agora
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled className="bg-gray-600 text-gray-400 w-full py-3 text-lg">
                          Em Breve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Roadmap Bilionário */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-3 text-xl animate-pulse">
              ROADMAP BILIONÁRIO 🚀
            </Badge>
            <h3 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
              A Jornada Até US$ 1 Bilhão
            </h3>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Do MVP funcional ao império digital que transformará 100 milhões de vidas
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="max-w-7xl mx-auto relative">
            {/* Linha do tempo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-blue-500 via-purple-500 to-orange-500"></div>

            <div className="space-y-16">
              {/* 2025 Q2-Q3: Fundação */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-8 border border-green-400/20">
                    <div className="flex items-center justify-end gap-3 mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white">Q2-Q3 2025</h4>
                        <p className="text-green-300 text-lg">FUNDAÇÃO SÓLIDA</p>
                      </div>
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-end gap-2"><span className="text-green-400">✓</span> Essentia funcionando (500 usuários beta)</div>
                      <div className="flex justify-end gap-2"><span className="text-green-400">✓</span> EduVie MVP lançado (1.2K usuários)</div>
                      <div className="flex justify-end gap-2"><span className="text-blue-400">→</span> Flow desenvolvimento acelerado</div>
                      <div className="flex justify-end gap-2"><span className="text-blue-400">→</span> Primeira rodada R$ 500K</div>
                    </div>
                    <div className="mt-6 text-right">
                      <div className="text-3xl font-bold text-green-400">R$ 1.2M</div>
                      <div className="text-green-300">Revenue Run Rate</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2025 Q4: Momentum */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-8 border border-blue-400/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-12 h-12 text-blue-400" />
                      <div>
                        <h4 className="text-2xl font-bold text-white">Q4 2025</h4>
                        <p className="text-blue-300 text-lg">MOMENTUM EXPONENCIAL</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-2"><span className="text-blue-400">→</span> Flow lançamento público (5K usuários)</div>
                      <div className="flex gap-2"><span className="text-blue-400">→</span> Integração completa entre apps</div>
                      <div className="flex gap-2"><span className="text-blue-400">→</span> Parcerias estratégicas (bancos/escolas)</div>
                      <div className="flex gap-2"><span className="text-blue-400">→</span> Primeira mídia nacional</div>
                    </div>
                    <div className="mt-6">
                      <div className="text-3xl font-bold text-blue-400">15K usuários</div>
                      <div className="text-blue-300">Base ativa total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2026: Escala */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/20">
                    <div className="flex items-center justify-end gap-3 mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white">2026</h4>
                        <p className="text-purple-300 text-lg">ESCALA NACIONAL</p>
                      </div>
                      <Rocket className="w-12 h-12 text-purple-400" />
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-end gap-2"><span className="text-purple-400">→</span> Flow Kids revoluciona mercado infantil</div>
                      <div className="flex justify-end gap-2"><span className="text-purple-400">→</span> 100K usuários pagantes</div>
                      <div className="flex justify-end gap-2"><span className="text-purple-400">→</span> Série A: R$ 15M</div>
                      <div className="flex justify-end gap-2"><span className="text-purple-400">→</span> Expansão LATAM</div>
                    </div>
                    <div className="mt-6 text-right">
                      <div className="text-3xl font-bold text-purple-400">R$ 50M</div>
                      <div className="text-purple-300">Valuation</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2027-2028: Império */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full border-4 border-white shadow-2xl animate-pulse"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl p-8 border border-orange-400/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Star className="w-12 h-12 text-orange-400 animate-spin" />
                      <div>
                        <h4 className="text-3xl font-bold text-white">2027-2028</h4>
                        <p className="text-orange-300 text-xl">IMPÉRIO BILIONÁRIO</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-2"><span className="text-orange-400">🌟</span> 10M+ usuários globalmente</div>
                      <div className="flex gap-2"><span className="text-orange-400">🌟</span> IPO ou aquisição estratégica</div>
                      <div className="flex gap-2"><span className="text-orange-400">🌟</span> Expandimos para IA, Saúde, Sustentabilidade</div>
                      <div className="flex gap-2"><span className="text-orange-400">🌟</span> Transformamos 100M de vidas</div>
                    </div>
                    <div className="mt-6">
                      <div className="text-4xl font-bold text-orange-400 animate-pulse">US$ 1B+</div>
                      <div className="text-orange-300">Valuation Unicórnio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-8 border border-yellow-400/10 max-w-4xl mx-auto">
              <h4 className="text-3xl font-bold text-white mb-4">A Oportunidade Está Aqui. AGORA.</h4>
              <p className="text-xl text-gray-300 mb-6">
                Daniel, esta não é uma projeção fantasiosa. É um roadmap baseado em tração real, produto funcionando e mercado validado.
              </p>
              <div className="text-2xl font-bold text-yellow-400 mb-6">
                Sua decisão hoje define se você será parte desta revolução.
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
                <Button 
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:opacity-90 text-white px-6 py-3 text-base md:text-lg w-full md:w-auto"
                  onClick={() => {
                    playSuccessSound();
                    setTimeout(() => window.location.href = '/investor-demo', 200);
                  }}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Análise Técnica Completa
                </Button>
                <Button 
                  variant="outline" 
                  className="text-yellow-400 border-yellow-400 px-6 py-3 text-base md:text-lg w-full md:w-auto"
                  onClick={() => {
                    playSuccessSound();
                    setTimeout(() => window.location.href = '/epic-demo', 200);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Demo Executivo Completo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Highlight */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Oportunidade de Investimento</h3>
            <p className="text-lg text-gray-300 mb-6">
              Ecossistema completo que combina tecnologia de ponta com conteúdo transformacional para impacto social massivo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-300">R$ 2.5M</div>
                <p className="text-gray-400">Valuation Proposto</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">3-5x ROI</div>
                <p className="text-gray-400">Projeção 24 meses</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">Q4 2025</div>
                <p className="text-gray-400">Break-even Point</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-2">
            Apresentação Exclusiva - Daniel Allegri | Junho 2025
          </p>
          <p className="text-sm text-gray-500">
            Ecossistema Digital Revolucionário - Tecnologia + Propósito = Transformação
          </p>
        </div>
      </div>
    </div>
  );
}