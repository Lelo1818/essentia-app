import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppLogo } from "@/components/ui/app-logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { mockUsers, getCurrentUser } from "@/data/mock-users";
import { mockEduData } from "@/data/mock-edu-data";
import { mockPurposeData } from "@/data/mock-purpose-data";
import { 
  Users, 
  Globe, 
  TrendingUp,
  Brain,
  Target,
  Zap,
  Heart,
  Star
} from "lucide-react";

export default function EcosystemStats() {
  const currentUser = getCurrentUser();

  const globalStats = [
    {
      app: "flow",
      name: "Flow",
      users: 15847,
      growth: 23.5,
      feature: "OCR Financeiro",
      accuracy: 96.2
    },
    {
      app: "edu", 
      name: "EduVie",
      users: mockEduData.activeUsers,
      growth: 45.8,
      feature: "IA Emocional",
      accuracy: mockEduData.globalStats.emotionDetectionRate
    },
    {
      app: "purpose",
      name: "Essentia", 
      users: mockPurposeData.activeJourneys,
      growth: 67.2,
      feature: "Transformação",
      accuracy: 98.5
    }
  ];

  const communityHighlights = [
    {
      metric: "Usuários Ativos",
      value: (globalStats.reduce((sum, app) => sum + app.users, 0)).toLocaleString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      metric: "Países Ativos",
      value: "23",
      icon: Globe,
      color: "text-green-600"
    },
    {
      metric: "Taxa de Sucesso",
      value: "94.2%",
      icon: Target,
      color: "text-purple-600"
    },
    {
      metric: "Satisfação",
      value: "4.8/5",
      icon: Star,
      color: "text-amber-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Globais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Estatísticas do Ecossistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {communityHighlights.map((highlight, i) => {
              const IconComponent = highlight.icon;
              return (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${highlight.color}`} />
                  <div className="text-2xl font-bold text-gray-800">{highlight.value}</div>
                  <div className="text-sm text-gray-600">{highlight.metric}</div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <h6 className="font-medium text-gray-800">Performance por Aplicativo:</h6>
            {globalStats.map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AppLogo app={app.app as "flow" | "edu" | "purpose"} size="md" />
                  <div>
                    <h6 className="font-medium text-gray-800">{app.name}</h6>
                    <p className="text-sm text-gray-600">{app.users.toLocaleString()} usuários ativos</p>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700">
                      +{app.growth}% crescimento
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {app.feature}: {app.accuracy}% precisão
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comunidade Ativa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Comunidade Ativa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Usuários Online Agora</span>
              <span className="text-sm text-gray-600">
                {Math.floor(globalStats.reduce((sum, app) => sum + app.users, 0) * 0.12).toLocaleString()}
              </span>
            </div>
            <Progress value={12} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">
                  {Math.floor(globalStats[0].users * 0.15).toLocaleString()}
                </div>
                <div className="text-xs text-green-700">Flow Ativo</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">
                  {Math.floor(globalStats[1].users * 0.18).toLocaleString()}
                </div>
                <div className="text-xs text-blue-700">EduVie Estudando</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">
                  {Math.floor(globalStats[2].users * 0.08).toLocaleString()}
                </div>
                <div className="text-xs text-purple-700">Essentia Meditando</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usuários do Ecossistema */}
      <Card>
        <CardHeader>
          <CardTitle>Membros da Comunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserAvatar user={user} size="md" />
                  <div>
                    <h6 className="font-medium text-gray-800">{user.name}</h6>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <AppLogo app="flow" size="sm" />
                  <AppLogo app="edu" size="sm" />
                  <AppLogo app="purpose" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights da IA */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-800">
            <Brain className="w-5 h-5 mr-2" />
            Insights da IA do Ecossistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white/50 rounded border border-indigo-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-indigo-800">Performance Cross-App</span>
              </div>
              <p className="text-sm text-indigo-700">
                Usuários que usam os 3 apps têm 340% mais engajamento e 67% melhor retenção
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-pink-600" />
                <span className="font-medium text-purple-800">Bem-estar Integrado</span>
              </div>
              <p className="text-sm text-purple-700">
                Combinação Flow + Essentia resulta em 45% menos estresse financeiro reportado
              </p>
            </div>
            
            <div className="p-3 bg-white/50 rounded border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Aprendizado Acelerado</span>
              </div>
              <p className="text-sm text-blue-700">
                EduVie + técnicas de respiração Essentia aumentam retenção em 23%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}