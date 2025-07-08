import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Award, 
  Trophy, 
  Star, 
  TrendingUp, 
  Target, 
  Zap,
  Download,
  Share2,
  Copy,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "savings" | "investment" | "debt" | "goal" | "milestone";
  value: number;
  date: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: any;
  color: string;
}

interface NFTDesign {
  background: string;
  pattern: string;
  frame: string;
  glow: string;
}

export default function NFTGenerator() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNFT, setGeneratedNFT] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const { toast } = useToast();

  const achievements: Achievement[] = [
    {
      id: "first-1k",
      title: "Primeiro R$ 1.000",
      description: "Economia de R$ 1.000 pela primeira vez",
      category: "savings",
      value: 1000,
      date: new Date(),
      rarity: "common",
      icon: Trophy,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: "debt-free",
      title: "Livre de Dívidas",
      description: "Quitou todas as dívidas pendentes",
      category: "debt",
      value: 0,
      date: new Date(),
      rarity: "epic",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-600"
    },
    {
      id: "first-investment",
      title: "Primeiro Investimento",
      description: "Realizou seu primeiro investimento",
      category: "investment",
      value: 500,
      date: new Date(),
      rarity: "rare",
      icon: TrendingUp,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "emergency-fund",
      title: "Reserva de Emergência",
      description: "Criou reserva de 6 meses de gastos",
      category: "goal",
      value: 10000,
      date: new Date(),
      rarity: "legendary",
      icon: Star,
      color: "from-purple-400 to-purple-600"
    }
  ];

  const getRarityConfig = (rarity: string): NFTDesign => {
    switch (rarity) {
      case "legendary":
        return {
          background: "bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900",
          pattern: "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.4),transparent_50%)]",
          frame: "border-4 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)]",
          glow: "animate-pulse"
        };
      case "epic":
        return {
          background: "bg-gradient-to-br from-emerald-800 via-green-800 to-emerald-800",
          pattern: "bg-[radial-gradient(circle_at_30%_70%,rgba(34,197,94,0.3),transparent_50%)]",
          frame: "border-4 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]",
          glow: ""
        };
      case "rare":
        return {
          background: "bg-gradient-to-br from-blue-800 via-indigo-800 to-blue-800",
          pattern: "bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.3),transparent_50%)]",
          frame: "border-3 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
          glow: ""
        };
      default:
        return {
          background: "bg-gradient-to-br from-gray-800 via-slate-800 to-gray-800",
          pattern: "bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.3),transparent_50%)]",
          frame: "border-2 border-gray-300 shadow-[0_0_10px_rgba(148,163,184,0.4)]",
          glow: ""
        };
    }
  };

  const generateNFT = async (achievement: Achievement) => {
    setIsGenerating(true);
    setSelectedAchievement(achievement);
    
    // Simulate NFT generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const nftId = `nft-${achievement.id}-${Date.now()}`;
    setGeneratedNFT(nftId);
    setIsGenerating(false);
    
    toast({
      title: "NFT Gerado com Sucesso!",
      description: `Sua conquista "${achievement.title}" foi transformada em NFT único`,
      variant: "default"
    });
  };

  const shareNFT = async (platform: string) => {
    const shareText = `🏆 Acabei de conquistar "${selectedAchievement?.title}" no Flow! #FlowNFT #ConquistaFinanceira`;
    
    if (platform === "copy") {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Link Copiado!",
        description: "Link do NFT copiado para a área de transferência"
      });
    } else {
      // Simulate sharing to social platforms
      toast({
        title: `Compartilhado no ${platform}!`,
        description: "Seu NFT foi compartilhado com sucesso"
      });
    }
  };

  const downloadNFT = () => {
    // Simulate download
    toast({
      title: "Download Iniciado!",
      description: "Seu NFT está sendo baixado em alta resolução"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-600" />
            Gerador de NFT de Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const design = getRarityConfig(achievement.rarity);
              const IconComponent = achievement.icon;
              
              return (
                <Card 
                  key={achievement.id}
                  className={`${design.background} ${design.pattern} ${design.frame} ${design.glow} relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-6 relative z-10">
                    {/* Overlay escuro para garantir contraste */}
                    <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                    
                    <div className="relative z-10 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`bg-gradient-to-r ${achievement.color} text-white border-0 shadow-md`}>
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                        <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{achievement.title}</h3>
                      <p className="text-gray-100 text-sm mb-4 drop-shadow-sm">{achievement.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-200 drop-shadow-sm">
                          {achievement.date.toLocaleDateString('pt-BR')}
                        </div>
                        <InteractiveButton
                          onClick={() => generateNFT(achievement)}
                          className="bg-white/20 hover:bg-white/30 text-white border-white/20 shadow-lg"
                          size="sm"
                          soundType="success"
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Gerar NFT
                        </InteractiveButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Generation Modal */}
      <Dialog open={isGenerating} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Gerando seu NFT único...</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-6">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Criando design exclusivo</p>
              <p className="text-xs text-gray-500">Aplicando padrões únicos baseados na sua conquista</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={!!generatedNFT && !isGenerating} onOpenChange={() => setGeneratedNFT(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>NFT Gerado com Sucesso!</DialogTitle>
          </DialogHeader>
          {selectedAchievement && (
            <div className="space-y-6">
              {/* NFT Preview */}
              <div className="flex justify-center">
                <div className={`${getRarityConfig(selectedAchievement.rarity).background} ${getRarityConfig(selectedAchievement.rarity).pattern} ${getRarityConfig(selectedAchievement.rarity).frame} ${getRarityConfig(selectedAchievement.rarity).glow} w-64 h-64 rounded-lg relative overflow-hidden`}>
                  {/* Overlay escuro para garantir contraste */}
                  <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 relative z-10">
                    <selectedAchievement.icon className="w-16 h-16 mb-4 text-white drop-shadow-lg" />
                    <h3 className="text-lg font-bold text-center mb-2 text-white drop-shadow-lg">{selectedAchievement.title}</h3>
                    <Badge className={`bg-gradient-to-r ${selectedAchievement.color} text-white border-0 mb-2 shadow-md`}>
                      {selectedAchievement.rarity.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-center text-gray-200 drop-shadow-sm">#{generatedNFT}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <InteractiveButton
                  onClick={downloadNFT}
                  className="w-full"
                  variant="outline"
                  soundType="click"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => setShowShareModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  soundType="success"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </InteractiveButton>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Detalhes do NFT:</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>ID: #{generatedNFT}</div>
                  <div>Raridade: {selectedAchievement.rarity}</div>
                  <div>Data de Criação: {new Date().toLocaleDateString('pt-BR')}</div>
                  <div>Blockchain: Flow Network (Simulado)</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar NFT</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InteractiveButton
                onClick={() => shareNFT("Twitter")}
                className="w-full bg-blue-500 hover:bg-blue-600"
                soundType="click"
              >
                Twitter
              </InteractiveButton>
              <InteractiveButton
                onClick={() => shareNFT("LinkedIn")}
                className="w-full bg-blue-700 hover:bg-blue-800"
                soundType="click"
              >
                LinkedIn
              </InteractiveButton>
              <InteractiveButton
                onClick={() => shareNFT("Instagram")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                soundType="click"
              >
                Instagram
              </InteractiveButton>
              <InteractiveButton
                onClick={() => shareNFT("copy")}
                className="w-full"
                variant="outline"
                soundType="click"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Link
              </InteractiveButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}