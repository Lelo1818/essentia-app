import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Brain, 
  DollarSign, 
  Heart, 
  Baby, 
  Crown,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';

export default function GlobalNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const apps = [
    {
      id: 'home',
      name: 'Ecosystem',
      path: '/',
      icon: Home,
      color: 'from-gray-600 to-gray-800',
      description: 'Visão Geral'
    },
    {
      id: 'flow',
      name: 'Flow',
      path: '/flow',
      icon: DollarSign,
      color: 'from-green-600 to-emerald-800',
      description: 'Gestão Financeira'
    },
    {
      id: 'edu',
      name: 'EduVie',
      path: '/edu',
      icon: Brain,
      color: 'from-blue-600 to-indigo-800',
      description: 'Educação IA'
    },
    {
      id: 'purpose',
      name: 'Essentia',
      path: '/purpose',
      icon: Heart,
      color: 'from-purple-600 to-pink-800',
      description: 'Autoconhecimento'
    },
    {
      id: 'kids',
      name: 'Flow Kids',
      path: '/kids',
      icon: Baby,
      color: 'from-yellow-600 to-orange-800',
      description: 'Educação Infantil'
    },
    {
      id: 'demo',
      name: 'Demo',
      path: '/epic-demo',
      icon: Crown,
      color: 'from-red-600 to-pink-800',
      description: 'Apresentação'
    }
  ];

  const currentApp = apps.find(app => location === app.path) || apps[0];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-gray-900 text-white z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:block
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Flow Ecosystem</h1>
            <p className="text-sm text-gray-400">Navegação Integrada</p>
          </div>

          {/* Current App Highlight */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentApp.color} flex items-center justify-center`}>
                  <currentApp.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{currentApp.name}</h3>
                  <p className="text-sm text-gray-400">{currentApp.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Navigation */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Aplicativos
            </h3>
            
            {apps.map((app) => {
              const isActive = location === app.path;
              
              return (
                <Link key={app.id} href={app.path}>
                  <Button
                    variant="ghost"
                    className={`
                      w-full justify-start h-12 transition-all duration-200
                      ${isActive 
                        ? 'bg-white/10 text-white border-l-4 border-blue-400' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-8 h-8 rounded mr-3 bg-gradient-to-r ${app.color} flex items-center justify-center`}>
                      <app.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{app.name}</div>
                      <div className="text-xs text-gray-400">{app.description}</div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Acesso Rápido
            </h3>
            
            <div className="space-y-2">
              <Link href="/epic-demo">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-purple-500 text-purple-300 hover:bg-purple-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Demo Investidor
                </Button>
              </Link>
              
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-gray-500 text-gray-300 hover:bg-gray-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Página Inicial
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs text-gray-500 text-center">
              <Badge variant="outline" className="text-gray-400 border-gray-600">
                Daniel Allegri Demo
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main content padding */}
      <div className="lg:ml-80">
        {/* Content goes here */}
      </div>
    </>
  );
}