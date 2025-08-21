import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Zap, 
  Heart, 
  ArrowRight, 
  RefreshCw, 
  Brain,
  Sparkles,
  Clock,
  TrendingUp
} from 'lucide-react';

interface TriadScores {
  consciencia: number;
  energia: number;
  coerencia: number;
}

interface PortalRecommendationProps {
  portalId: string;
  triadScores: TriadScores;
  onAccept: (portalId: string) => void;
  onRequestNew: () => void;
}

interface PortalInfo {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  category: 'consciencia' | 'energia' | 'coerencia';
  description: string;
  benefits: string[];
  ritualPreview: string;
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
}

const portalsData: Record<string, PortalInfo> = {
  proposito: {
    id: 'proposito',
    name: 'Portal do Propósito',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'from-purple-500 to-indigo-600',
    category: 'consciencia',
    description: 'Conecte-se com sua razão de ser e encontre clareza sobre seus valores e missão de vida.',
    benefits: [
      'Clareza sobre valores pessoais',
      'Definição de objetivos alinhados',
      'Redução da ansiedade existencial',
      'Maior motivação e direcionamento'
    ],
    ritualPreview: 'Reflexão guiada sobre valores → Visualização do futuro ideal → Definição de 3 ações práticas',
    duration: '15-20 min',
    difficulty: 'Intermediário'
  },
  vitalidade: {
    id: 'vitalidade',
    name: 'Portal da Vitalidade',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'from-yellow-500 to-orange-600',
    category: 'energia',
    description: 'Desperte sua energia vital através de práticas que revitalizam corpo, mente e espírito.',
    benefits: [
      'Aumento da energia física',
      'Melhora do humor e disposição',
      'Fortalecimento da resistência',
      'Conexão com a força vital interior'
    ],
    ritualPreview: 'Respiração energizante → Movimento corporal → Visualização de vitalidade → Intenção energética',
    duration: '10-15 min',
    difficulty: 'Iniciante'
  },
  harmonia: {
    id: 'harmonia',
    name: 'Portal da Harmonia',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'from-red-500 to-pink-600',
    category: 'coerencia',
    description: 'Cultive o equilíbrio emocional e o alinhamento entre pensamentos, sentimentos e ações.',
    benefits: [
      'Maior equilíbrio emocional',
      'Redução do estresse e ansiedade',
      'Alinhamento interno',
      'Paz de espírito duradoura'
    ],
    ritualPreview: 'Centramento cardíaco → Meditação da coerência → Prática de gratidão → Intenção de harmonia',
    duration: '12-18 min',
    difficulty: 'Intermediário'
  }
};

export const PortalRecommendation = ({ portalId, triadScores, onAccept, onRequestNew }: PortalRecommendationProps) => {
  const portal = portalsData[portalId];
  
  if (!portal) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <p>Portal não encontrado. Tente novamente.</p>
          <Button onClick={onRequestNew} className="mt-4">
            Buscar Novo Portal
          </Button>
        </CardContent>
      </Card>
    );
  }

  const IconComponent = portal.icon;
  const currentScore = triadScores[portal.category];

  // Calcular porque este portal foi recomendado
  const getRecommendationReason = () => {
    const scores = [
      { key: 'consciencia', value: triadScores.consciencia, label: 'Consciência' },
      { key: 'energia', value: triadScores.energia, label: 'Energia' },
      { key: 'coerencia', value: triadScores.coerencia, label: 'Coerência' }
    ];
    
    scores.sort((a, b) => a.value - b.value);
    const lowestScore = scores[0];
    
    if (lowestScore.key === portal.category) {
      return `Recomendado porque sua ${lowestScore.label} (${lowestScore.value}%) é o aspecto que mais precisa de atenção.`;
    }
    
    return `Este portal foi selecionado para fortalecer sua ${portal.category}.`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className={`p-4 rounded-full bg-gradient-to-r ${portal.bgColor} shadow-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl">
          {portal.name}
        </CardTitle>
        <p className="text-gray-600 mt-2">
          {portal.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Razão da Recomendação */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Por que este portal?</h4>
              <p className="text-blue-700 text-sm">{getRecommendationReason()}</p>
            </div>
          </div>
        </div>

        {/* Status Atual */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Seu nível atual
          </h4>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{portal.category}</span>
                <span className="font-medium">{currentScore}%</span>
              </div>
              <Progress value={currentScore} className="h-2" />
            </div>
            <Badge className={getDifficultyColor(portal.difficulty)}>
              {portal.difficulty}
            </Badge>
          </div>
        </div>

        {/* Benefícios */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Benefícios desta prática:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {portal.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview do Ritual */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            O que você fará:
          </h4>
          <p className="text-purple-700 text-sm mb-3">{portal.ritualPreview}</p>
          <div className="flex items-center justify-between text-xs text-purple-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Duração: {portal.duration}</span>
            </div>
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              {portal.difficulty}
            </Badge>
          </div>
        </div>

        {/* Ações */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => onAccept(portal.id)}
            className={`flex-1 bg-gradient-to-r ${portal.bgColor} hover:opacity-90 transition-opacity`}
            size="lg"
          >
            <IconComponent className="w-4 h-4 mr-2" />
            Iniciar {portal.name}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={onRequestNew}
            variant="outline"
            size="lg"
            className="px-4"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Nota Adicional */}
        <div className="text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          💡 Dica: Complete o ritual com intenção e presença. Cada prática fortalece sua Tríade Essencial.
        </div>
      </CardContent>
    </Card>
  );
};