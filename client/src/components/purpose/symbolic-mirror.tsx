import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Camera, 
  Eye, 
  Heart, 
  Sparkles,
  CheckCircle,
  Search,
  Clock,
  Lightbulb
} from "lucide-react";

interface SymbolicMirrorProps {
  phase: number;
  onPhotoTaken?: (photoData: string) => void;
  onReflectionComplete?: (reflection: string, feeling: string) => void;
}

export function SymbolicMirror({ 
  phase, 
  onPhotoTaken, 
  onReflectionComplete 
}: SymbolicMirrorProps) {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<string>("");
  const [reflection, setReflection] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target?.result as string;
        setPhotoTaken(true);
        onPhotoTaken?.(photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleComplete = () => {
    if (reflection.trim() && selectedFeeling) {
      onReflectionComplete?.(reflection, selectedFeeling);
    }
  };

  const feelings = [
    { id: "recognizing", text: "Sim, estou me reconhecendo", icon: CheckCircle, color: "bg-green-100 text-green-700" },
    { id: "searching", text: "Ainda estou em busca", icon: Search, color: "bg-blue-100 text-blue-700" },
    { id: "uncertain", text: "Não sei — e tudo bem", icon: Clock, color: "bg-gray-100 text-gray-700" }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Eye className="w-6 h-6 mr-2" />
            Espelho Simbólico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-purple-700">
              Você está prestes a entrar numa nova fase. Antes disso… que tal se olhar com presença?
            </p>
            
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-purple-800 font-medium mb-2">
                Tire uma selfie. Não pra postar. Não pra julgar.
              </p>
              <p className="text-purple-700 text-sm">
                Apenas pra se ver. Pra guardar esse agora. Como você se olha? Como você se enxerga?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Taking Section */}
      {!photoTaken && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-purple-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Momento do Espelho
                </h3>
                <p className="text-gray-600">
                  Um registro do seu agora. Salvo apenas no seu dispositivo, para você.
                </p>
              </div>
              
              <Button 
                onClick={handleTakePhoto}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capturar Momento
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handlePhotoCapture}
                className="hidden"
              />
              
              <p className="text-sm text-gray-500">
                A foto fica salva apenas no seu dispositivo
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo Taken - Reflection Section */}
      {photoTaken && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Heart className="w-5 h-5 mr-2" />
              Você gostou do que viu?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Feeling Selection */}
              <div className="space-y-3">
                <p className="text-gray-700 mb-4">Como você se sente ao se olhar agora?</p>
                
                <div className="space-y-2">
                  {feelings.map((feeling) => {
                    const Icon = feeling.icon;
                    return (
                      <button
                        key={feeling.id}
                        onClick={() => setSelectedFeeling(feeling.id)}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                          selectedFeeling === feeling.id
                            ? "border-purple-300 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={cn("p-2 rounded-full", feeling.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-gray-800">{feeling.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reflection Text */}
              {selectedFeeling && (
                <div className="space-y-3">
                  <label className="block text-gray-700 font-medium">
                    O que mais te chamou atenção em você mesmo até aqui?
                  </label>
                  <Textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Mesmo que ainda esteja tudo fresco, algo em você já parece diferente? Se sim, anota aqui. Se não, só respira — tudo tem seu tempo."
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    Não pressupõe mudança, apenas convida à auto-observação leve
                  </p>
                </div>
              )}

              {/* Complete Button */}
              {selectedFeeling && reflection.trim() && (
                <Button 
                  onClick={handleComplete}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Guardar Reflexão
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Message */}
      {photoTaken && selectedFeeling && reflection.trim() && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Momento Guardado
                </h3>
                <p className="text-green-700">
                  Sua reflexão foi salva. No futuro, você poderá revisitar este momento e ver como sua jornada evoluiu.
                </p>
              </div>
              
              <Badge className="bg-green-100 text-green-700">
                Fase {phase} • Espelho Simbólico Completo
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Hook for managing symbolic mirror state
export function useSymbolicMirror() {
  const [mirrorData, setMirrorData] = useState<{
    photo?: string;
    feeling?: string;
    reflection?: string;
    timestamp?: Date;
  }>({});

  const saveMirrorMoment = (photo: string, feeling: string, reflection: string) => {
    const moment = {
      photo,
      feeling,
      reflection,
      timestamp: new Date()
    };
    
    setMirrorData(moment);
    
    // Save to localStorage for persistence
    localStorage.setItem('purpose-mirror-moment', JSON.stringify(moment));
  };

  const loadMirrorMoment = () => {
    const saved = localStorage.getItem('purpose-mirror-moment');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMirrorData({
        ...parsed,
        timestamp: new Date(parsed.timestamp)
      });
    }
  };

  return {
    mirrorData,
    saveMirrorMoment,
    loadMirrorMoment
  };
}