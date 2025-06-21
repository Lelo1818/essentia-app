import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gift, 
  Trophy, 
  Star, 
  Crown,
  Sparkles,
  Zap,
  Heart,
  Diamond
} from 'lucide-react';

export default function SurpriseMechanics() {
  const [activeBonus, setActiveBonus] = useState<any>(null);
  const [streakBonus, setStreakBonus] = useState(false);
  const [secretAchievement, setSecretAchievement] = useState<any>(null);
  const [luckyMoment, setLuckyMoment] = useState(false);

  const surpriseTypes = {
    randomBonus: {
      title: "🎊 BÔNUS SURPRESA!",
      message: "Você desbloqueou XP duplo pelos próximos 15 minutos!",
      color: "from-yellow-500 to-orange-500",
      duration: 4000
    },
    weekendBoost: {
      title: "🌟 BOOST DE FIM DE SEMANA!",
      message: "Todos os rituais valem 3x mais pontos hoje!",
      color: "from-purple-500 to-pink-500", 
      duration: 5000
    },
    perfectDay: {
      title: "✨ DIA PERFEITO!",
      message: "Você completou todas as práticas - desbloqueou avatar especial!",
      color: "from-blue-500 to-cyan-500",
      duration: 6000
    },
    mysteryGift: {
      title: "🎁 PRESENTE MISTERIOSO!",
      message: "Sofia preparou uma meditação exclusiva para você!",
      color: "from-green-500 to-emerald-500",
      duration: 5000
    },
    cosmicAlignment: {
      title: "🌌 ALINHAMENTO CÓSMICO!",
      message: "As estrelas conspiram a seu favor - insights em dobro!",
      color: "from-indigo-500 to-purple-500",
      duration: 7000
    }
  };

  const secretAchievements = [
    {
      id: "night_owl",
      name: "Coruja Sábia",
      description: "Praticou após 23h - a sabedoria noturna te escolheu!",
      icon: "🦉",
      rarity: "legendary"
    },
    {
      id: "early_bird", 
      name: "Pássaro Matinal",
      description: "Primeiro ritual antes das 6h - você domina o amanhecer!",
      icon: "🐦",
      rarity: "epic"
    },
    {
      id: "storm_warrior",
      name: "Guerreiro da Tempestade", 
      description: "Meditou durante chuva - nada te para!",
      icon: "⛈️",
      rarity: "mythic"
    },
    {
      id: "fibonacci_master",
      name: "Mestre Fibonacci",
      description: "Completou rituais seguindo a sequência dourada!",
      icon: "🌀",
      rarity: "legendary"
    }
  ];

  // Detectar momentos especiais automaticamente
  useEffect(() => {
    const checkForSurprises = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      const isFullMoon = now.getDate() === 15; // Simplificado
      
      // Chance aleatória base
      if (Math.random() > 0.95) {
        triggerRandomSurprise();
      }
      
      // Bônus de fim de semana
      if ((day === 0 || day === 6) && Math.random() > 0.8) {
        setActiveBonus(surpriseTypes.weekendBoost);
      }
      
      // Alinhamento cósmico na lua cheia
      if (isFullMoon && Math.random() > 0.7) {
        setActiveBonus(surpriseTypes.cosmicAlignment);
      }
      
      // Momentos de sorte aleatórios
      if (Math.random() > 0.92) {
        setLuckyMoment(true);
        setTimeout(() => setLuckyMoment(false), 3000);
      }
    };
    
    const interval = setInterval(checkForSurprises, 30000); // Check cada 30s
    return () => clearInterval(interval);
  }, []);

  const triggerRandomSurprise = () => {
    const surpriseKey = Object.keys(surpriseTypes)[
      Math.floor(Math.random() * Object.keys(surpriseTypes).length)
    ] as keyof typeof surpriseTypes;
    
    const surprise = surpriseTypes[surpriseKey];
    setActiveBonus(surprise);
    
    setTimeout(() => setActiveBonus(null), surprise.duration);
  };

  const triggerSecretAchievement = () => {
    const achievement = secretAchievements[
      Math.floor(Math.random() * secretAchievements.length)
    ];
    
    setSecretAchievement(achievement);
    setTimeout(() => setSecretAchievement(null), 8000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'mythic': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {/* Bônus Ativo */}
      {activeBonus && (
        <Card className={`bg-gradient-to-r ${activeBonus.color} text-white shadow-2xl animate-bounce border-0`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-6 h-6" />
              <h3 className="font-bold text-lg">{activeBonus.title}</h3>
            </div>
            <p className="text-sm opacity-90">{activeBonus.message}</p>
            <div className="mt-3 flex justify-between items-center">
              <Badge variant="outline" className="text-white border-white">
                Limitado
              </Badge>
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Conquista Secreta */}
      {secretAchievement && (
        <Card className={`bg-gradient-to-r ${getRarityColor(secretAchievement.rarity)} text-white shadow-2xl border-0`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-2xl">{secretAchievement.icon}</div>
              <div>
                <h3 className="font-bold">🏆 CONQUISTA SECRETA!</h3>
                <h4 className="font-semibold">{secretAchievement.name}</h4>
              </div>
            </div>
            <p className="text-sm opacity-90">{secretAchievement.description}</p>
            <Badge 
              variant="outline" 
              className={`mt-2 text-white border-white capitalize`}
            >
              {secretAchievement.rarity}
            </Badge>
          </CardContent>
        </Card>
      )}
      
      {/* Momento de Sorte */}
      {luckyMoment && (
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl border-0 animate-pulse">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 animate-spin" />
              <span className="font-medium">✨ Momento de sorte ativo!</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Botão de Teste (só para desenvolvimento) */}
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          onClick={triggerRandomSurprise}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Zap className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          onClick={triggerSecretAchievement}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          <Trophy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}