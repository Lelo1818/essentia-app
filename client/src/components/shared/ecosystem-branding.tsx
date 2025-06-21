import { Heart, Brain, DollarSign, Baby, Crown, Sparkles } from 'lucide-react';

interface EcosystemBrandingProps {
  variant?: 'flow' | 'edu' | 'purpose' | 'kids' | 'demo';
  size?: 'sm' | 'md' | 'lg';
}

export default function EcosystemBranding({ variant = 'flow', size = 'md' }: EcosystemBrandingProps) {
  const configs = {
    flow: {
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      name: 'Flow',
      tagline: 'Prosperidade Financeira'
    },
    edu: {
      icon: Brain,
      gradient: 'from-blue-500 to-indigo-600',
      name: 'EduVie',
      tagline: 'Educação Inteligente'
    },
    purpose: {
      icon: Heart,
      gradient: 'from-purple-500 to-pink-600',
      name: 'Essentia',
      tagline: 'Jornada de Propósito'
    },
    kids: {
      icon: Baby,
      gradient: 'from-yellow-500 to-orange-600',
      name: 'Flow Kids',
      tagline: 'Educação Lúdica'
    },
    demo: {
      icon: Crown,
      gradient: 'from-purple-500 to-pink-600',
      name: 'Flow Ecosystem',
      tagline: 'Demo Investidor'
    }
  };

  const config = configs[variant];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`
        ${sizeClasses[size]} rounded-xl bg-gradient-to-r ${config.gradient} 
        flex items-center justify-center shadow-lg
      `}>
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
      </div>
      
      <div>
        <h3 className={`font-bold ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl'}`}>
          {config.name}
        </h3>
        <p className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {config.tagline}
        </p>
      </div>
      
      <Sparkles className="w-4 h-4 text-yellow-500 opacity-75" />
    </div>
  );
}