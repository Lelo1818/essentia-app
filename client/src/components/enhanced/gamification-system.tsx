import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, Star, Target, Zap, Crown, Award, 
  TrendingUp, Calendar, CheckCircle, Gift
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "financial" | "educational" | "spiritual";
  rarity: "common" | "rare" | "epic" | "legendary";
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    badge?: string;
    unlocks?: string[];
  };
  unlocked: boolean;
  dateUnlocked?: Date;
}

interface UserLevel {
  current: number;
  xp: number;
  xpToNext: number;
  title: string;
  perks: string[];
}

interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  reward: {
    xp: number;
    coins?: number;
  };
  deadline?: Date;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

interface GamificationSystemProps {
  context: "financial" | "educational" | "spiritual";
  userLevel: UserLevel;
  achievements: Achievement[];
  quests: Quest[];
  onQuestAction?: (questId: string) => void;
  className?: string;
}

export function GamificationSystem({
  context,
  userLevel,
  achievements,
  quests,
  onQuestAction,
  className
}: GamificationSystemProps) {
  const [activeTab, setActiveTab] = React.useState<"level" | "achievements" | "quests">("level");

  const rarityConfig = {
    common: { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300" },
    rare: { color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-300" },
    epic: { color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-300" },
    legendary: { color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-300" }
  };

  const difficultyConfig = {
    easy: { color: "text-green-600", bg: "bg-green-100" },
    medium: { color: "text-yellow-600", bg: "bg-yellow-100" },
    hard: { color: "text-red-600", bg: "bg-red-100" }
  };

  const contextConfig = {
    financial: {
      color: "text-green-600",
      bg: "bg-green-50",
      titles: ["Novato", "Poupador", "Investidor", "Especialista", "Mestre Financeiro"]
    },
    educational: {
      color: "text-blue-600",
      bg: "bg-blue-50",
      titles: ["Aprendiz", "Estudioso", "Conhecedor", "Especialista", "Mestre do Saber"]
    },
    spiritual: {
      color: "text-purple-600",
      bg: "bg-purple-50",
      titles: ["Buscador", "Explorador", "Consciente", "Iluminado", "Mestre Espiritual"]
    }
  };

  const config = contextConfig[context];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const availableQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  const getLevelProgress = () => {
    return ((userLevel.xp - (userLevel.current - 1) * 1000) / userLevel.xpToNext) * 100;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Crown className={cn("w-5 h-5", config.color)} />
            <span>Sistema de Conquistas</span>
          </CardTitle>
          <div className="flex space-x-1">
            {["level", "achievements", "quests"].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
              >
                {tab === "level" ? "Nível" : tab === "achievements" ? "Conquistas" : "Missões"}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {activeTab === "level" && (
          <div className="space-y-6">
            {/* Level Overview */}
            <div className={cn("rounded-lg p-6", config.bg)}>
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{userLevel.current}</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className={cn(config.color, config.bg)}>
                      {userLevel.title}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso para nível {userLevel.current + 1}</span>
                    <span>{userLevel.xp} / {userLevel.xp + userLevel.xpToNext} XP</span>
                  </div>
                  <Progress value={getLevelProgress()} className="h-3" />
                </div>
              </div>
            </div>

            {/* Perks */}
            <div>
              <h4 className="font-medium mb-3">Benefícios do Seu Nível</h4>
              <div className="grid grid-cols-1 gap-2">
                {userLevel.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Suas Conquistas</h4>
              <Badge variant="outline">
                {unlockedAchievements.length} / {achievements.length}
              </Badge>
            </div>

            <div className="grid gap-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                const rarity = rarityConfig[achievement.rarity];
                
                return (
                  <div
                    key={achievement.id}
                    className={cn(
                      "border rounded-lg p-4 transition-all",
                      achievement.unlocked 
                        ? cn(rarity.bg, rarity.border) 
                        : "bg-gray-50 border-gray-200 opacity-60"
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={cn(
                        "w-8 h-8 mt-1",
                        achievement.unlocked ? rarity.color : "text-gray-400"
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">{achievement.title}</h5>
                          <Badge 
                            className={cn(
                              "text-xs",
                              achievement.unlocked ? rarity.bg : "bg-gray-100"
                            )}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        
                        {!achievement.unlocked && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Progresso</span>
                              <span>{achievement.progress} / {achievement.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                        
                        {achievement.unlocked && achievement.dateUnlocked && (
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <span>+{achievement.reward.xp} XP</span>
                            <span>Desbloqueado em {achievement.dateUnlocked.toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "quests" && (
          <div className="space-y-6">
            {/* Active Quests */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Missões Ativas ({availableQuests.length})</span>
              </h4>
              
              <div className="space-y-3">
                {availableQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onAction={() => onQuestAction?.(quest.id)}
                  />
                ))}
              </div>
            </div>

            {/* Completed Quests */}
            {completedQuests.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Missões Concluídas</span>
                </h4>
                
                <div className="space-y-2">
                  {completedQuests.slice(0, 3).map((quest) => (
                    <div key={quest.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-sm font-medium">{quest.title}</span>
                      <Badge className="bg-green-100 text-green-800">
                        +{quest.reward.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuestCard({ quest, onAction }: { quest: Quest; onAction: () => void }) {
  const difficultyConfig = {
    easy: { color: "text-green-600", bg: "bg-green-100" },
    medium: { color: "text-yellow-600", bg: "bg-yellow-100" },
    hard: { color: "text-red-600", bg: "bg-red-100" }
  };

  const diff = difficultyConfig[quest.difficulty];
  const progressPercentage = (quest.progress / quest.maxProgress) * 100;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h5 className="font-medium">{quest.title}</h5>
            <Badge className={cn("text-xs", diff.bg, diff.color)}>
              {quest.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{quest.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso</span>
            <span>{quest.progress} / {quest.maxProgress}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>+{quest.reward.xp} XP</span>
            {quest.reward.coins && <span>+{quest.reward.coins} moedas</span>}
            {quest.deadline && (
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{quest.deadline.toLocaleDateString()}</span>
              </span>
            )}
          </div>
          
          <Button onClick={onAction} size="sm" variant="outline">
            {progressPercentage === 100 ? "Resgatar" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
}