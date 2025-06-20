import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, Trophy, Target, TrendingUp, Edit, Save, X } from "lucide-react";
import UserAvatar from "@/components/ui/user-avatar";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate } from "@/lib/financial-utils";
import type { User as UserType, Achievement, Goal } from "@/types";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ["/api/user/1"], // Mock user ID
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const { data: financialSummary } = useQuery({
    queryKey: ["/api/financial-summary"],
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/user/1", { method: "PUT", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/1"] });
      setIsEditing(false);
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas." });
    }
  });

  const startEditing = () => {
    setEditName(user?.username || "");
    setEditEmail(user?.email || "");
    setIsEditing(true);
  };

  const saveProfile = () => {
    updateUserMutation.mutate({
      username: editName,
      email: editEmail
    });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditName("");
    setEditEmail("");
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
  const goalProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const totalIncome = financialSummary?.totalIncome || 0;
  const totalExpenses = financialSummary?.totalExpenses || 0;
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-lg text-gray-600">Gerencie suas informações e acompanhe seu progresso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações Pessoais
              </span>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={startEditing}>
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Seu nome"
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
                  <Button 
                    onClick={saveProfile} 
                    disabled={updateUserMutation.isPending}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={cancelEditing}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user?.username || "Usuário"}</h3>
                    <p className="text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user?.email || "email@exemplo.com"}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Membro desde {formatDate(user?.createdAt || new Date())}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Resumo Financeiro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {formatCurrency(totalIncome)}
                </div>
                <div className="text-sm text-gray-600">Total de Receitas</div>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {formatCurrency(totalExpenses)}
                </div>
                <div className="text-sm text-gray-600">Total de Gastos</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className={`text-2xl font-bold mb-1 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </div>
                <div className="text-sm text-gray-600">Saldo Atual</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Progresso das Metas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Metas Concluídas</span>
                  <span>{completedGoals}/{totalGoals}</span>
                </div>
                <Progress value={goalProgress} className="h-3" />
              </div>
              
              {goals.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <Target className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Nenhuma meta definida ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {goals.slice(0, 3).map((goal) => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100;
                    return (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{goal.name}</span>
                          <span className="text-xs text-gray-600">
                            {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Conquistas ({achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Nenhuma conquista ainda</p>
                <p className="text-sm text-gray-400">Continue usando o Flow para desbloquear conquistas!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <Badge variant="secondary" className="mt-1">
                        {formatDate(achievement.unlockedAt)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}