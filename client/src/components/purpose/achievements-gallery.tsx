import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ACHIEVEMENTS, getAchievementsByCategory, getNextAchievement, type AchievementConfig } from "@shared/achievements-config";
import { type Achievement } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, Download, Sparkles, Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface AchievementsGalleryProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AchievementsGallery({ trigger, open, onOpenChange }: AchievementsGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Fetch user achievements
  const { data: userAchievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
  });

  // Fetch user progress for calculating progress on locked achievements
  const { data: userProgress } = useQuery<{ points?: number; dailyStreak?: number }>({
    queryKey: ['/api/progress'],
  });

  const { data: femeCheckins = [] } = useQuery<any[]>({
    queryKey: ['/api/feme/checkins'],
  });

  const { data: breathSessions = [] } = useQuery<any[]>({
    queryKey: ['/api/breath/sessions'],
  });

  const { data: actionPlans = [] } = useQuery<any[]>({
    queryKey: ['/api/actions'],
  });

  // Check for new achievements
  const checkAchievementsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('/api/achievements/check', 'POST');
      return res;
    },
    onSuccess: (data: any) => {
      if (data.count > 0) {
        toast({
          title: "🎉 Novas Conquistas!",
          description: data.message,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['/api/achievements'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    },
  });

  // Export achievements as JSON
  const exportAchievements = () => {
    const dataStr = JSON.stringify(userAchievements, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `essentia-conquistas-${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "✅ Exportado com sucesso!",
      description: "Suas conquistas foram exportadas em JSON.",
    });
  };

  // Calculate progress for a specific achievement
  const calculateProgress = (config: AchievementConfig): number => {
    let currentValue = 0;

    switch (config.category) {
      case 'checkin':
        currentValue = femeCheckins.length;
        break;
      case 'breath':
        currentValue = breathSessions.length;
        break;
      case 'points':
        currentValue = userProgress?.points || 0;
        break;
      case 'streak':
        currentValue = userProgress?.dailyStreak || 0;
        break;
      case 'journey':
        if (config.key === 'plano_criado') currentValue = actionPlans.length;
        break;
    }

    return Math.min(100, (currentValue / config.target) * 100);
  };

  // Get current value for display
  const getCurrentValue = (config: AchievementConfig): number => {
    switch (config.category) {
      case 'checkin':
        return femeCheckins.length;
      case 'breath':
        return breathSessions.length;
      case 'points':
        return userProgress?.points || 0;
      case 'streak':
        return userProgress?.dailyStreak || 0;
      case 'journey':
        if (config.key === 'plano_criado') return actionPlans.length;
        return 0;
      default:
        return 0;
    }
  };

  // Check if achievement is unlocked
  const isUnlocked = (achievementKey: string): Achievement | undefined => {
    return userAchievements.find(a => a.achievementKey === achievementKey);
  };

  // Calculate stats
  const totalUnlocked = userAchievements.length;
  const totalPoints = userAchievements.reduce((sum, a) => sum + (a.pointsEarned || 0), 0);
  const totalAvailable = Object.keys(ACHIEVEMENTS).length;

  // Organize achievements by category
  const categories: { id: string; name: string; icon: string }[] = [
    { id: 'checkin', name: 'Check-in FEME', icon: '🧭' },
    { id: 'breath', name: 'Respiração', icon: '🌬️' },
    { id: 'points', name: 'Pontos', icon: '⭐' },
    { id: 'streak', name: 'Consistência', icon: '🔥' },
    { id: 'journey', name: 'Jornada', icon: '🌌' },
  ];

  const renderAchievement = (config: AchievementConfig) => {
    const unlocked = isUnlocked(config.key);
    const progress = calculateProgress(config);
    const currentValue = getCurrentValue(config);

    return (
      <Card 
        key={config.key} 
        className={`transition-all ${unlocked ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : 'opacity-60 grayscale'}`}
        data-testid={`achievement-card-${config.key}`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">{config.icon}</div>
              <div>
                <CardTitle className="text-sm">{config.title}</CardTitle>
                <p className="text-xs text-gray-600">{config.description}</p>
              </div>
            </div>
            {unlocked ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {unlocked ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <Badge className="bg-green-100 text-green-700">
                  +{config.points} pontos
                </Badge>
                <span className="text-gray-500">
                  {format(new Date(unlocked.earnedAt || new Date()), 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{currentValue}/{config.target}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500">
                Faltam {config.target - currentValue} para desbloquear
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const isDialogOpen = open !== undefined ? open : isOpen;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-open-achievements-gallery">
            <Trophy className="w-4 h-4 mr-2" />
            Ver Todas Conquistas
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Galeria de Conquistas
          </DialogTitle>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{totalUnlocked}/{totalAvailable}</div>
            <div className="text-sm text-gray-600">Desbloqueadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Pontos Ganhos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{Math.round((totalUnlocked / totalAvailable) * 100)}%</div>
            <div className="text-sm text-gray-600">Completo</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={() => checkAchievementsMutation.mutate()}
            disabled={checkAchievementsMutation.isPending}
            variant="outline"
            data-testid="button-check-achievements"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {checkAchievementsMutation.isPending ? 'Verificando...' : 'Verificar Novas Conquistas'}
          </Button>
          <Button 
            onClick={exportAchievements}
            variant="outline"
            data-testid="button-export-achievements"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar JSON
          </Button>
        </div>

        {/* Tabs by Category */}
        <Tabs defaultValue="checkin" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} data-testid={`tab-${cat.id}`}>
                <span className="mr-1">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => {
            const categoryAchievements = getAchievementsByCategory(cat.id as any);
            const unlockedCount = categoryAchievements.filter(a => isUnlocked(a.key)).length;
            
            return (
              <TabsContent key={cat.id} value={cat.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{cat.icon} {cat.name}</h3>
                  <Badge variant="outline">
                    {unlockedCount}/{categoryAchievements.length} desbloqueadas
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryAchievements.map(achievement => renderAchievement(achievement))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {isLoading && (
          <div className="text-center py-8 text-gray-500">
            Carregando conquistas...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
