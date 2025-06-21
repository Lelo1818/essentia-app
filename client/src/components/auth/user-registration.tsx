import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createUser, type CreateUserRequest } from '@/lib/ecosystem-api';
import { UserPlus, Sparkles, Crown, Zap } from 'lucide-react';

interface UserRegistrationProps {
  onUserCreated?: (userId: number) => void;
}

export default function UserRegistration({ onUserCreated }: UserRegistrationProps) {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    email: '',
    role: 'Beta Tester'
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      toast({
        title: "🎉 Usuário Criado com Sucesso!",
        description: `Bem-vindo ao Flow Ecosystem, ${user.name}!`,
      });
      
      // Reset form
      setFormData({ name: '', email: '', role: 'Beta Tester' });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['ecosystem-stats'] });
      
      // Notify parent component
      onUserCreated?.(user.id);
    },
    onError: (error) => {
      toast({
        title: "Erro no Cadastro",
        description: "Tente novamente ou use um email diferente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Dados Incompletos",
        description: "Preencha nome e email para continuar.",
        variant: "destructive",
      });
      return;
    }

    const initials = formData.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    createUserMutation.mutate({
      ...formData,
      initials,
    });
  };

  const predefinedRoles = [
    'Beta Tester',
    'Estudante',
    'Empreendedor',
    'Desenvolvedor',
    'Designer',
    'Professor',
    'Investidor',
    'Consultor'
  ];

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-gradient-to-r from-purple-500 to-blue-500">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="flex items-center text-xl">
          <Crown className="w-6 h-6 mr-3" />
          Cadastro Flow Ecosystem
        </CardTitle>
        <p className="text-purple-100 text-sm">
          Primeira plataforma brasileira Avatar 3D + IA + Biometria
        </p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Seu nome completo"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Perfil</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {predefinedRoles.map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={formData.role === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, role }))}
                  className="text-xs"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={createUserMutation.isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
          >
            {createUserMutation.isPending ? (
              "Criando Conta..."
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Criar Conta & Iniciar Jornada
              </>
            )}
          </Button>
        </form>

        {/* Features Preview */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-semibold mb-3 text-center">Você terá acesso a:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Badge variant="outline" className="flex items-center p-2">
              <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
              Avatar 3D Interativo
            </Badge>
            <Badge variant="outline" className="flex items-center p-2">
              <Zap className="w-4 h-4 mr-1 text-blue-500" />
              IA Personalizada
            </Badge>
            <Badge variant="outline" className="flex items-center p-2">
              <Crown className="w-4 h-4 mr-1 text-yellow-500" />
              Progresso Salvo
            </Badge>
            <Badge variant="outline" className="flex items-center p-2">
              <UserPlus className="w-4 h-4 mr-1 text-green-500" />
              4 Apps Integrados
            </Badge>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          Dados salvos em PostgreSQL em tempo real
        </div>
      </CardContent>
    </Card>
  );
}