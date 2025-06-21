import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createUser } from '@/lib/ecosystem-api';
import { Zap, Crown, Users, Sparkles } from 'lucide-react';

interface QuickDemoUserProps {
  onUserCreated?: (userId: number) => void;
}

export default function QuickDemoUser({ onUserCreated }: QuickDemoUserProps) {
  const { toast } = useToast();
  const [selectedDemo, setSelectedDemo] = useState<string>('');

  const demoUsers = [
    {
      id: 'investor',
      name: 'Daniel Allegri',
      email: 'daniel.allegri@investor.com',
      role: 'Investidor Anjo',
      description: 'Perfil para demonstração de investimento',
      color: 'from-purple-600 to-pink-600',
      icon: Crown
    },
    {
      id: 'student',
      name: 'Ana Silva',
      email: 'ana.silva@demo.com',
      role: 'Estudante Universitária',
      description: 'Foco em educação e desenvolvimento pessoal',
      color: 'from-blue-600 to-indigo-600',
      icon: Users
    },
    {
      id: 'entrepreneur',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@startup.com',
      role: 'Empreendedor Tech',
      description: 'Gestão financeira e crescimento profissional',
      color: 'from-green-600 to-emerald-600',
      icon: Zap
    },
    {
      id: 'family',
      name: 'Beatriz Costa',
      email: 'beatriz.costa@familia.com',
      role: 'Mãe de Família',
      description: 'Educação financeira familiar e propósito',
      color: 'from-orange-600 to-red-600',
      icon: Sparkles
    }
  ];

  const createDemoUser = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      toast({
        title: "✨ Usuário Demo Criado!",
        description: `Logado como ${user.name} - dados reais salvos no banco!`,
      });
      onUserCreated?.(user.id);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleCreateDemo = (demo: typeof demoUsers[0]) => {
    setSelectedDemo(demo.id);
    
    const initials = demo.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    createDemoUser.mutate({
      name: demo.name,
      email: demo.email,
      role: demo.role,
      initials,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <CardTitle className="text-center text-2xl">
          <Crown className="w-6 h-6 inline mr-2" />
          Demonstração Rápida - Usuários Pré-configurados
        </CardTitle>
        <p className="text-center text-gray-300">
          Crie um usuário demo com dados realistas para testar o sistema completo
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoUsers.map((demo) => {
            const Icon = demo.icon;
            const isSelected = selectedDemo === demo.id;
            const isLoading = createDemoUser.isPending && isSelected;
            
            return (
              <Card 
                key={demo.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <CardHeader className={`bg-gradient-to-r ${demo.color} text-white p-4`}>
                  <div className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold">{demo.name}</h3>
                    <Badge variant="outline" className="text-white border-white text-xs">
                      {demo.role}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-4 h-12">
                    {demo.description}
                  </p>
                  
                  <Button
                    onClick={() => handleCreateDemo(demo)}
                    disabled={createDemoUser.isPending}
                    className={`w-full bg-gradient-to-r ${demo.color} hover:opacity-90`}
                  >
                    {isLoading ? (
                      "Criando..."
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        Criar & Entrar
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✅ Todos os dados são salvos em PostgreSQL real
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}