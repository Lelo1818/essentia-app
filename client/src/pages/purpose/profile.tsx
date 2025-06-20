import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Mail, Calendar, Trophy, Heart, Star, 
  Edit, Save, X, Compass, BookOpen, Target, Sparkles 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDateRelative, getLevelTitle, calculateOverallProgress } from "@/lib/purpose-utils";
import type { UserProfile, DiaryEntry, PurposeMap, Achievement } from "@/types/purpose";

export default function PurposeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [bio, setBio] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ["/api/purpose/profile"],
  });

  const { data: diaryEntries = [] } = useQuery<DiaryEntry[]>({
    queryKey: ["/api/purpose/diary"],
  });

  const { data: purposeMap } = useQuery<PurposeMap>({
    queryKey: ["/api/purpose/purpose-map"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/purpose/achievements"],
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/purpose/user/1", { method: "PUT", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purpose/profile"] });
      setIsEditing(false);
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas com carinho." });
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar as alterações. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const startEditing = () => {
    setEditName(profile?.user?.name || "");
    setEditEmail(profile?.user?.email || "");
    setIsEditing(true);
  };

  const saveProfile = () => {
    updateUserMutation.mutate({
      name: editName,
      email: editEmail,
      bio: bio
    });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditName("");
    setEditEmail("");
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando com sua essência...</p>
        </div>
      </div>
    );
  }

  const user = profile?.user;
  const modules = profile?.modules || [];
  const currentLevel = user?.level || 1;
  const experience = user?.experience || 0;
  const experienceInLevel = experience % 100;
  const overallProgress = calculateOverallProgress(modules);

  const totalEntries = diaryEntries.length;
  const recentEntries = diaryEntries.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Meu Perfil Espiritual</h1>
        <p className="text-lg text-gray-600">
          Acompanhe sua jornada de autodescoberta e crescimento pessoal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Header */}
        <Card className="lg:col-span-3">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Seu nome espiritual"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={saveProfile} disabled={updateUserMutation.isPending}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={cancelEditing}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {user?.name || "Alma Buscadora"}
                      </h2>
                      <Button variant="outline" size="sm" onClick={startEditing}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-600 flex items-center justify-center md:justify-start mb-4">
                      <Mail className="w-4 h-4 mr-2" />
                      {user?.email || "email@exemplo.com"}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        <Star className="w-3 h-3 mr-1" />
                        Nível {currentLevel}
                      </Badge>
                      <span className="text-gray-600">{getLevelTitle(currentLevel)}</span>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        Jornada iniciada em {formatDateRelative(user?.createdAt || new Date())}
                      </Badge>
                    </div>
                    
                    <div className="max-w-md">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso Espiritual</span>
                        <span>{experienceInLevel}/100 exp</span>
                      </div>
                      <Progress value={experienceInLevel} className="h-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Compass className="w-5 h-5 mr-2 text-orange-500" />
              Progresso da Jornada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {overallProgress}%
                </div>
                <div className="text-sm text-gray-600">Jornada Completa</div>
              </div>
              
              <Progress value={overallProgress} className="h-3" />
              
              <div className="space-y-3">
                {[
                  { key: "despertar", name: "Despertar", icon: "🌅" },
                  { key: "descoberta", name: "Descoberta", icon: "🧭" },
                  { key: "decisao", name: "Decisão", icon: "🎯" },
                  { key: "direcao", name: "Direção", icon: "🗺️" }
                ].map((module) => {
                  const moduleData = modules.find(m => m.moduleType === module.key);
                  const progress = moduleData?.progress || 0;
                  
                  return (
                    <div key={module.key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{module.icon}</span>
                        <span className="text-sm font-medium">{module.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20">
                          <Progress value={progress} className="h-2" />
                        </div>
                        <span className="text-xs text-gray-600 w-8">{progress}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diary Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Diário Pessoal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {totalEntries}
                </div>
                <div className="text-sm text-gray-600">Reflexões Escritas</div>
              </div>
              
              {recentEntries.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Últimas Reflexões:</h4>
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-sm text-gray-900 mb-1">{entry.title}</h5>
                      <p className="text-xs text-gray-600">{formatDateRelative(entry.createdAt)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Comece escrevendo no seu diário</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Purpose Map Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Mapa do Propósito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purposeMap ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Valores</span>
                    <Badge variant={purposeMap.values ? "default" : "secondary"}>
                      {purposeMap.values ? "✓" : "○"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Paixões</span>
                    <Badge variant={purposeMap.passions ? "default" : "secondary"}>
                      {purposeMap.passions ? "✓" : "○"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Talentos</span>
                    <Badge variant={purposeMap.talents ? "default" : "secondary"}>
                      {purposeMap.talents ? "✓" : "○"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Missão</span>
                    <Badge variant={purposeMap.mission ? "default" : "secondary"}>
                      {purposeMap.mission ? "✓" : "○"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Visão</span>
                    <Badge variant={purposeMap.vision ? "default" : "secondary"}>
                      {purposeMap.vision ? "✓" : "○"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Target className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Crie seu mapa do propósito</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Conquistas Espirituais ({achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Suas conquistas aparecerão aqui</h3>
                <p className="text-gray-600">
                  Continue sua jornada de autodescoberta para desbloquear conquistas especiais
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl mr-4">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {formatDateRelative(achievement.unlockedAt)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inspirational Quote */}
        <Card className="lg:col-span-3 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <blockquote className="text-xl font-light text-gray-700 italic mb-4">
              "A jornada de autodescoberta não é sobre encontrar quem você deveria ser, 
              mas sobre lembrar quem você sempre foi."
            </blockquote>
            <p className="text-gray-600">— Desperte Seu Propósito</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}