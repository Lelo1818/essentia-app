import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

/**
 * ESSENTIA PITCH - SLIDE INTERATIVO
 * 
 * Slide 1: Capa com design gradiente, elementos neurais/orgânicos
 * e silhueta humana em meditação conforme especificações
 */

export default function EssentiaPitch() {
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fundo Gradiente Suave (azul para verde) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-green-400" />
      
      {/* Overlay para suavizar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

      {/* Elementos Neurais Abstratos - Circuitos de IA */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
        {/* Rede Neural Principal */}
        <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
          {/* Nós principais */}
          <circle cx="200" cy="150" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="400" cy="100" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="600" cy="200" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="800" cy="120" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="1000" cy="180" r="3" fill="rgba(255,255,255,0.6)" />
          
          {/* Conexões neurais */}
          <path d="M200,150 Q300,80 400,100" />
          <path d="M400,100 Q500,150 600,200" />
          <path d="M600,200 Q700,160 800,120" />
          <path d="M800,120 Q900,150 1000,180" />
          <path d="M200,150 Q400,250 600,200" />
          <path d="M400,100 Q600,50 800,120" />
          
          {/* Camada inferior */}
          <circle cx="150" cy="400" r="2" fill="rgba(255,255,255,0.4)" />
          <circle cx="350" cy="450" r="2" fill="rgba(255,255,255,0.4)" />
          <circle cx="550" cy="380" r="2" fill="rgba(255,255,255,0.4)" />
          <circle cx="750" cy="420" r="2" fill="rgba(255,255,255,0.4)" />
          <circle cx="950" cy="390" r="2" fill="rgba(255,255,255,0.4)" />
          
          <path d="M150,400 Q250,425 350,450" />
          <path d="M350,450 Q450,415 550,380" />
          <path d="M550,380 Q650,400 750,420" />
          <path d="M750,420 Q850,405 950,390" />
        </g>
      </svg>

      {/* Elementos Orgânicos - Folhas e Formas Fluidas */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 800">
        {/* Folhas estilizadas */}
        <g fill="rgba(255,255,255,0.3)">
          {/* Folha superior direita */}
          <path d="M900,50 Q950,80 980,130 Q950,180 900,200 Q880,150 900,50Z" />
          
          {/* Folha inferior esquerda */}
          <path d="M100,600 Q150,630 180,680 Q150,730 100,750 Q80,700 100,600Z" />
          
          {/* Elementos de água/fluidez */}
          <path d="M50,300 Q200,280 350,320 Q500,360 650,340 Q800,320 950,350" 
                stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          
          <path d="M80,500 Q230,480 380,520 Q530,560 680,540 Q830,520 980,550" 
                stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        </g>
      </svg>

      {/* Silhueta Humana em Meditação */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="200" height="300" viewBox="0 0 200 300" className="opacity-30">
          <g fill="rgba(255,255,255,0.8)">
            {/* Cabeça */}
            <ellipse cx="100" cy="40" rx="25" ry="30" />
            
            {/* Corpo */}
            <ellipse cx="100" cy="120" rx="35" ry="60" />
            
            {/* Braços em posição de meditação */}
            <ellipse cx="70" cy="110" rx="15" ry="40" transform="rotate(-30 70 110)" />
            <ellipse cx="130" cy="110" rx="15" ry="40" transform="rotate(30 130 110)" />
            
            {/* Pernas cruzadas */}
            <ellipse cx="80" cy="200" rx="20" ry="45" transform="rotate(-20 80 200)" />
            <ellipse cx="120" cy="200" rx="20" ry="45" transform="rotate(20 120 200)" />
            
            {/* Aura sutil */}
            <circle cx="100" cy="40" r="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <circle cx="100" cy="40" r="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8">
        
        {/* Título Principal */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider">
            Essentia
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-2xl md:text-3xl text-white/90 font-light tracking-wide max-w-4xl mx-auto">
            IA, Gamificação e Ciência para o Bem-Estar Holístico
          </h2>
        </div>

        {/* Elementos decorativos minimalistas */}
        <div className="flex items-center space-x-8 mb-12">
          <div className="w-16 h-px bg-white/40"></div>
          <div className="w-3 h-3 rounded-full bg-white/60"></div>
          <div className="w-16 h-px bg-white/40"></div>
        </div>

        {/* Controles de Apresentação */}
        <div className="flex items-center space-x-6">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
          >
            {isAutoPlay ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isAutoPlay ? 'Pausar' : 'Auto Play'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            Próximo Slide
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Indicador de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
        </div>
      </div>

      {/* Botão de volta */}
      <div className="absolute top-6 left-6 z-20">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          onClick={() => window.location.href = '/dashboard-unificado'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </div>

      {/* Animações sutis CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}