import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Crown } from 'lucide-react';
import { Link } from 'wouter';
import { PortalsSection } from '../components/essentia-premium/PortalsSection';

export default function EssentiaPremium() {
  const [userClarity, setUserClarity] = useState(67);

  const handleClarityIncrease = (amount: number) => {
    setUserClarity(prev => Math.min(100, prev + amount));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Essentia Premium
            </Badge>
          </div>

          {/* Welcome Section */}
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl text-center flex items-center justify-center">
                <Sparkles className="w-10 h-10 mr-4" />
                Bem-vindo ao Essentia Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg opacity-90">
                  Transforme sua vida através de uma jornada profunda de autoconhecimento
                </p>
                <p className="text-base opacity-80">
                  Acesse portais únicos de transformação, práticas guiadas e insights personalizados da IA
                </p>
                
                {/* Stats */}
                <div className="flex justify-center space-x-8 mt-6 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userClarity}%</div>
                    <div className="text-sm opacity-80">Clareza Atual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm opacity-80">Portais Disponíveis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">∞</div>
                    <div className="text-sm opacity-80">Potencial de Crescimento</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portals Section */}
        <PortalsSection 
          userClarity={userClarity} 
          onClarityIncrease={handleClarityIncrease} 
        />

        {/* Premium Features */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-center">Recursos Premium Exclusivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              
              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">Portais Interativos</h3>
                <p className="text-sm text-gray-600">
                  Experiências imersivas de transformação com práticas guiadas e reflexão pessoal
                </p>
              </div>

              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">IA Personalizada</h3>
                <p className="text-sm text-gray-600">
                  Coaching personalizado com insights únicos baseados em sua jornada individual
                </p>
              </div>

              <div className="p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">Crescimento Contínuo</h3>
                <p className="text-sm text-gray-600">
                  Sistema de progressão que evolui com você, desbloqueando novos níveis de consciência
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Essentia Premium - Transformando vidas através do autoconhecimento profundo
          </p>
        </div>

      </div>
    </div>
  );
}