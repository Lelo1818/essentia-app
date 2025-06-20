import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverGallery, PhaseCover } from "./cover-gallery";
import { AudioSystem, JourneyAudio } from "./audio-system";
import { TextReader, PhaseTextReader } from "./text-reader";
import { OptimizedImage, EmotionalCover, InspirationGallery } from "./image-system";
import { cn } from "@/lib/utils";
import { 
  Image, 
  Volume2, 
  BookOpen, 
  Palette, 
  Play, 
  Settings,
  Eye,
  Headphones,
  FileText,
  Sparkles
} from "lucide-react";

interface MediaIntegrationProps {
  phase: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function MediaIntegration({ 
  phase, 
  title, 
  children, 
  className 
}: MediaIntegrationProps) {
  const [activeMedia, setActiveMedia] = useState("content");
  const [mediaSettings, setMediaSettings] = useState({
    showCover: true,
    autoPlayAudio: false,
    showTexts: true,
    showInspiration: true
  });

  return (
    <div className={cn("space-y-6", className)}>
      {/* Phase Cover */}
      {mediaSettings.showCover && (
        <PhaseCover phase={phase} />
      )}

      {/* Media Tabs */}
      <Tabs value={activeMedia} onValueChange={setActiveMedia} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content" className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Conteúdo</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center space-x-1">
            <Headphones className="w-4 h-4" />
            <span className="hidden sm:inline">Áudio</span>
          </TabsTrigger>
          <TabsTrigger value="texts" className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Textos</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center space-x-1">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Galeria</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-1">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Config</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
                  Experiência Sonora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <JourneyAudio phase={phase} autoPlay={mediaSettings.autoPlayAudio} />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <h4 className="font-medium text-blue-800 mb-4">🎧 Configuração de Áudio</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-white/50 rounded">
                    <h6 className="font-medium mb-1">Narração</h6>
                    <p className="text-blue-700">Voz suave guiando sua experiência</p>
                  </div>
                  <div className="p-3 bg-white/50 rounded">
                    <h6 className="font-medium mb-1">Ambiente</h6>
                    <p className="text-blue-700">Sons da natureza para imersão</p>
                  </div>
                  <div className="p-3 bg-white/50 rounded">
                    <h6 className="font-medium mb-1">Música</h6>
                    <p className="text-blue-700">Trilha instrumental harmônica</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="texts" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  Textos Inspiracionais
                </CardTitle>
              </CardHeader>
            </Card>
            
            <PhaseTextReader phase={phase} />
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="w-5 h-5 mr-2 text-amber-600" />
                  Galeria Inspiracional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InspirationGallery category="nature" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escolher Nova Capa</CardTitle>
              </CardHeader>
              <CardContent>
                <CoverGallery onSelect={(cover) => {
                  console.log("Nova capa selecionada:", cover);
                  // Aqui seria implementada a lógica para trocar a capa
                }} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-600" />
                Configurações de Mídia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h6 className="font-medium text-gray-800">Preferências Visuais</h6>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mediaSettings.showCover}
                        onChange={(e) => setMediaSettings(prev => ({
                          ...prev,
                          showCover: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar capas emocionais</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mediaSettings.showInspiration}
                        onChange={(e) => setMediaSettings(prev => ({
                          ...prev,
                          showInspiration: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span className="text-sm">Exibir galeria inspiracional</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="font-medium text-gray-800">Configurações de Áudio</h6>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mediaSettings.autoPlayAudio}
                        onChange={(e) => setMediaSettings(prev => ({
                          ...prev,
                          autoPlayAudio: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span className="text-sm">Reprodução automática</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="font-medium text-gray-800">Conteúdo Textual</h6>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mediaSettings.showTexts}
                        onChange={(e) => setMediaSettings(prev => ({
                          ...prev,
                          showTexts: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span className="text-sm">Mostrar textos inspiracionais</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h6 className="font-medium text-gray-800 mb-2">📱 Próximas Funcionalidades</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Narração personalizada com IA</li>
                    <li>• Upload de áudios próprios</li>
                    <li>• Galeria de fotos pessoais</li>
                    <li>• Textos escritos por você</li>
                    <li>• Sincronização com Marcela (fotos de ateliê)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente para experiência completa com mídia
export function ImmersiveExperience({ 
  phase, 
  title, 
  children 
}: { 
  phase: string; 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MediaIntegration phase={phase} title={title}>
        {children}
      </MediaIntegration>
    </div>
  );
}