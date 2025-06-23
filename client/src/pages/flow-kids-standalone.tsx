import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Coins, 
  Trophy,
  Target,
  Gift,
  Heart,
  Gamepad2,
  BookOpen,
  PiggyBank,
  Wallet,
  ShoppingCart,
  TrendingUp,
  Award,
  Sparkles,
  Crown,
  Zap
} from "lucide-react";

export default function FlowKidsStandalone() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAvatar, setSelectedAvatar] = useState("unicorn");
  const [, setLocation] = useLocation();

  const kidProfile = {
    name: "Sofia",
    age: 8,
    level: 5,
    totalPoints: 1250,
    nextLevelPoints: 1500,
    streak: 12,
    savings: 125.50,
    goals: 3,
    completedLessons: 18
  };

  const achievements = [
    {
      id: 1,
      title: "Primeiro Depósito",
      description: "Guardou dinheiro pela primeira vez!",
      icon: PiggyBank,
      earned: true,
      points: 50,
      color: "text-pink-500 bg-pink-50"
    },
    {
      id: 2,
      title: "Economista Mirim",
      description: "Completou 10 lições sobre economia",
      icon: BookOpen,
      earned: true,
      points: 100,
      color: "text-blue-500 bg-blue-50"
    },
    {
      id: 3,
      title: "Meta Alcançada",
      description: "Conquistou sua primeira meta de economia",
      icon: Target,
      earned: true,
      points: 75,
      color: "text-green-500 bg-green-50"
    },
    {
      id: 4,
      title: "Super Poupador",
      description: "Economizou por 30 dias seguidos",
      icon: Crown,
      earned: false,
      points: 200,
      color: "text-yellow-500 bg-yellow-50"
    }
  ];

  const lessons = [
    {
      id: 1,
      title: "O que é Dinheiro?",
      description: "Aprenda de forma divertida o que é dinheiro e para que serve",
      difficulty: 'Fácil',
      points: 25,
      completed: true,
      category: "Básico",
      duration: "5 min"
    },
    {
      id: 2,
      title: "Economizar é Legal!",
      description: "Descubra por que guardar dinheiro pode ser divertido",
      difficulty: 'Fácil',
      points: 30,
      completed: true,
      category: "Poupança",
      duration: "7 min"
    },
    {
      id: 3,
      title: "Necessidade vs Desejo",
      description: "Aprenda a diferença entre o que precisamos e o que queremos",
      difficulty: 'Médio',
      points: 40,
      completed: false,
      category: "Planejamento",
      duration: "10 min"
    },
    {
      id: 4,
      title: "Minha Primeira Meta",
      description: "Como definir e alcançar objetivos financeiros",
      difficulty: 'Médio',
      points: 50,
      completed: false,
      category: "Metas",
      duration: "12 min"
    }
  ];

  const avatars = [
    { id: "unicorn", name: "Unicórnio Mágico", emoji: "🦄", color: "from-pink-400 to-purple-400" },
    { id: "dragon", name: "Dragão Amigo", emoji: "🐲", color: "from-green-400 to-blue-400" },
    { id: "cat", name: "Gatinho Esperto", emoji: "🐱", color: "from-orange-400 to-red-400" },
    { id: "robot", name: "Robô Legal", emoji: "🤖", color: "from-blue-400 to-cyan-400" }
  ];

  const currentAvatar = avatars.find(a => a.id === selectedAvatar);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%)',
      overflowY: 'auto',
      padding: '16px'
    }}>
      {/* Header Colorido */}
      <div style={{
        background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
        padding: '4px',
        borderRadius: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: `linear-gradient(to right, ${currentAvatar?.color?.replace('from-', '').replace('to-', ', ')})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                {currentAvatar?.emoji}
              </div>
              <div>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  Flow Kids
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Oi, {kidProfile.name}! 👋
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#fef3c7',
                padding: '4px 8px',
                borderRadius: '999px'
              }}>
                <Coins style={{ width: '16px', height: '16px', color: '#d97706' }} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#92400e'
                }}>
                  {kidProfile.totalPoints}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#fed7aa',
                padding: '4px 8px',
                borderRadius: '999px'
              }}>
                <Zap style={{ width: '16px', height: '16px', color: '#ea580c' }} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#c2410c'
                }}>
                  {kidProfile.streak}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Status */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <Card style={{
          background: 'linear-gradient(135deg, #f472b6, #ec4899)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent style={{ padding: '16px', textAlign: 'center' }}>
            <PiggyBank style={{ width: '32px', height: '32px', margin: '0 auto 8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>R$ {kidProfile.savings}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Poupança</div>
          </CardContent>
        </Card>

        <Card style={{
          background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent style={{ padding: '16px', textAlign: 'center' }}>
            <Trophy style={{ width: '32px', height: '32px', margin: '0 auto 8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Nível {kidProfile.level}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Seu Level</div>
          </CardContent>
        </Card>

        <Card style={{
          background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent style={{ padding: '16px', textAlign: 'center' }}>
            <Target style={{ width: '32px', height: '32px', margin: '0 auto 8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kidProfile.goals}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Metas Ativas</div>
          </CardContent>
        </Card>

        <Card style={{
          background: 'linear-gradient(135deg, #4ade80, #22c55e)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent style={{ padding: '16px', textAlign: 'center' }}>
            <BookOpen style={{ width: '32px', height: '32px', margin: '0 auto 8px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kidProfile.completedLessons}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Lições</div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso para Próximo Nível */}
      <Card style={{
        background: 'linear-gradient(to right, #fef3c7, #fed7aa)',
        border: '1px solid #f59e0b',
        marginBottom: '24px'
      }}>
        <CardContent style={{ padding: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Próximo Nível</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              {kidProfile.totalPoints}/{kidProfile.nextLevelPoints} pontos
            </span>
          </div>
          <Progress 
            value={(kidProfile.totalPoints / kidProfile.nextLevelPoints) * 100} 
            style={{ height: '12px', marginBottom: '8px' }}
          />
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Faltam {kidProfile.nextLevelPoints - kidProfile.totalPoints} pontos para o nível {kidProfile.level + 1}! 🎉
          </p>
        </CardContent>
      </Card>

      {/* Atividade de Hoje */}
      <Card style={{
        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        color: 'white',
        border: 'none',
        marginBottom: '24px'
      }}>
        <CardHeader>
          <CardTitle style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            color: 'white'
          }}>
            <Sparkles style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            Atividade de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h3 style={{
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '8px'
            }}>
              🎯 Desafio Diário
            </h3>
            <p style={{
              fontSize: '14px',
              opacity: 0.9,
              marginBottom: '12px'
            }}>
              Vamos aprender sobre "Necessidade vs Desejo"! Complete a lição e ganhe 40 pontos.
            </p>
            <Button 
              style={{
                background: 'white',
                color: '#8b5cf6',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log('FlowKids: Iniciando lição "Necessidade vs Desejo"');
                setActiveTab("jogos");
                // Simular início da lição
                setTimeout(() => {
                  console.log('Lição iniciada com sucesso!');
                  alert('Parabéns! Você iniciou a lição "Necessidade vs Desejo". +40 pontos ganhos!');
                }, 500);
              }}
            >
              Começar Agora! 🚀
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card style={{ marginBottom: '24px' }}>
        <CardHeader>
          <CardTitle style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Trophy style={{ 
              width: '20px', 
              height: '20px', 
              marginRight: '8px',
              color: '#eab308'
            }} />
            Suas Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px'
          }}>
            {achievements.filter(a => a.earned).map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px dashed',
                  textAlign: 'center'
                }}
                className={achievement.color}
              >
                <achievement.icon style={{ 
                  width: '24px', 
                  height: '24px', 
                  margin: '0 auto 8px',
                  display: 'block'
                }} />
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {achievement.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {achievement.points} pts
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Link para voltar */}
      <div style={{
        textAlign: 'center',
        marginTop: '32px'
      }}>
        <Button 
          onClick={() => window.location.href = '/dashboard-unificado'}
          style={{
            background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          ← Voltar ao Dashboard
        </Button>
      </div>
    </div>
  );
}