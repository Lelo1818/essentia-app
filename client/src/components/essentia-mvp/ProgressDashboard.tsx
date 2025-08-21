import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  Target,
  TrendingUp,
  Flame,
  RotateCcw,
  Plus,
  Clock,
  Award,
  Smile,
  Zap
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  triadScores: TriadScores;
  lastPortalId?: string;
  lastCompletedAt?: Date;
  streak: number;
  totalRitualsCompleted: number;
  createdAt: Date;
}

interface DailyMood {
  date: string;
  humor: number;
  energia: number;
  timestamp: Date;
}

interface ProgressDashboardProps {
  user: UserProfile;
  todayMood: DailyMood | null;
  onNewPortalRequest: () => void;
  onDailyCheckin: () => void;
}

export const ProgressDashboard = ({ user, todayMood, onNewPortalRequest, onDailyCheckin }: ProgressDashboardProps) => {
  const totalTriadScore = Math.round((user.triadScores.consciencia + user.triadScores.energia + user.triadScores.coerencia) / 3);
  
  const getDaysActive = () => {
    const now = new Date();
    const created = new Date(user.createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getLastRitualTime = () => {
    if (!user.lastCompletedAt) return 'Nenhum ritual completado ainda';
    
    const now = new Date();
    const lastRitual = new Date(user.lastCompletedAt);
    const diffHours = Math.round((now.getTime() - lastRitual.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Há menos de 1 hora';
    if (diffHours === 1) return 'Há 1 hora';
    if (diffHours < 24) return `Há ${diffHours} horas`;
    
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return 'Há 1 dia';
    return `Há ${diffDays} dias`;
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 4) return '😊';
    if (score >= 3) return '😐';
    return '😔';
  };

  const getTriadLevel = (score: number) => {
    if (score >= 80) return { label: 'Excelente', color: 'text-green-600 bg-green-50 border-green-200' };
    if (score >= 60) return { label: 'Bom', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (score >= 40) return { label: 'Moderado', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    return { label: 'Precisa Atenção', color: 'text-red-600 bg-red-50 border-red-200' };
  };

  const overallLevel = getTriadLevel(totalTriadScore);

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">{user.streak}</div>
            <div className="text-sm text-gray-600">Dias consecutivos</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{user.totalRitualsCompleted}</div>
            <div className="text-sm text-gray-600">Rituais completados</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-600">{totalTriadScore}%</div>
            <div className="text-sm text-gray-600">Tríade Geral</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{getDaysActive()}</div>
            <div className="text-sm text-gray-600">Dias no Essentia</div>
          </CardContent>
        </Card>
      </div>

      {/* Status Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Status Atual</span>
            <Badge className={overallLevel.color}>
              {overallLevel.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Check-in de Hoje */}
          {todayMood ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Check-in de Hoje</h4>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Smile className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Humor:</span>
                  <span className="text-lg">{getMoodEmoji(todayMood.humor)}</span>
                  <span className="text-sm font-medium">{todayMood.humor}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Energia:</span>
                  <span className="text-lg">{getMoodEmoji(todayMood.energia)}</span>
                  <span className="text-sm font-medium">{todayMood.energia}/5</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-yellow-800">Check-in Pendente</h4>
                  <p className="text-sm text-yellow-700">Como você está se sentindo hoje?</p>
                </div>
                <Button 
                  onClick={onDailyCheckin}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  size="sm"
                >
                  Fazer Check-in
                </Button>
              </div>
            </div>
          )}

          {/* Último Ritual */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">Último Ritual</h4>
              <p className="text-sm text-gray-600">{getLastRitualTime()}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{user.lastPortalId ? `Portal ${user.lastPortalId}` : 'Nenhum ainda'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso da Tríade */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Tríade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Consciência</span>
                <span className="font-medium">{user.triadScores.consciencia}%</span>
              </div>
              <Progress value={user.triadScores.consciencia} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Energia</span>
                <span className="font-medium">{user.triadScores.energia}%</span>
              </div>
              <Progress value={user.triadScores.energia} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Coerência</span>
                <span className="font-medium">{user.triadScores.coerencia}%</span>
              </div>
              <Progress value={user.triadScores.coerencia} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="flex space-x-3">
        <Button 
          onClick={onNewPortalRequest}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Portal
        </Button>
        
        <Button 
          onClick={onDailyCheckin}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Novo Check-in
        </Button>
      </div>

      {/* Insights Motivacionais */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-indigo-800 mb-2">💡 Insight Pessoal</h4>
          <p className="text-indigo-700 text-sm">
            {user.streak >= 7 
              ? `Incrível! Você manteve sua prática por ${user.streak} dias consecutivos. Sua dedicação ao crescimento é inspiradora.`
              : user.totalRitualsCompleted >= 5
                ? `Você já completou ${user.totalRitualsCompleted} rituais! Cada prática fortalece sua tríade essencial.`
                : `Bem-vindo à sua jornada! Cada ritual é um passo importante no seu desenvolvimento pessoal.`
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};