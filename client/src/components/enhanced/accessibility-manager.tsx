import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Accessibility, Eye, Volume2, Keyboard, MousePointer,
  Contrast, Type, ZoomIn, Pause, RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilitySettings {
  fontSize: number;
  contrast: "normal" | "high" | "dark";
  motionReduce: boolean;
  screenReader: boolean;
  keyboardNav: boolean;
  focusIndicator: boolean;
  colorblindMode: "none" | "deuteranopia" | "protanopia" | "tritanopia";
  voiceControl: boolean;
}

interface AccessibilityManagerProps {
  className?: string;
}

export function AccessibilityManager({ className }: AccessibilityManagerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState<AccessibilitySettings>({
    fontSize: 16,
    contrast: "normal",
    motionReduce: false,
    screenReader: false,
    keyboardNav: true,
    focusIndicator: true,
    colorblindMode: "none",
    voiceControl: false
  });

  React.useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  React.useEffect(() => {
    // Apply settings to document
    applyAccessibilitySettings(settings);
    // Save settings
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
  }, [settings]);

  const applyAccessibilitySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${newSettings.fontSize}px`;

    // Contrast
    root.classList.remove("high-contrast", "dark-mode");
    if (newSettings.contrast === "high") {
      root.classList.add("high-contrast");
    } else if (newSettings.contrast === "dark") {
      root.classList.add("dark-mode");
    }

    // Motion reduction
    if (newSettings.motionReduce) {
      root.style.setProperty("--animation-duration", "0.01ms");
      root.classList.add("reduce-motion");
    } else {
      root.style.removeProperty("--animation-duration");
      root.classList.remove("reduce-motion");
    }

    // Focus indicators
    if (newSettings.focusIndicator) {
      root.classList.add("enhanced-focus");
    } else {
      root.classList.remove("enhanced-focus");
    }

    // Colorblind filters
    root.classList.remove("deuteranopia", "protanopia", "tritanopia");
    if (newSettings.colorblindMode !== "none") {
      root.classList.add(newSettings.colorblindMode);
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      contrast: "normal",
      motionReduce: false,
      screenReader: false,
      keyboardNav: true,
      focusIndicator: true,
      colorblindMode: "none",
      voiceControl: false
    };
    setSettings(defaultSettings);
  };

  if (!isOpen) {
    return (
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="icon"
          aria-label="Abrir configurações de acessibilidade"
        >
          <Accessibility className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className={cn("fixed left-4 top-1/2 transform -translate-y-1/2 w-80 z-50 max-h-[80vh] overflow-y-auto", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Accessibility className="w-5 h-5 text-blue-600" />
            <span>Acessibilidade</span>
          </span>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Visual Settings */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Configurações Visuais</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tamanho da Fonte: {settings.fontSize}px
              </label>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting("fontSize", value)}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Alto Contraste</label>
              <Switch
                checked={settings.contrast === "high"}
                onCheckedChange={(checked) => 
                  updateSetting("contrast", checked ? "high" : "normal")
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Modo Escuro</label>
              <Switch
                checked={settings.contrast === "dark"}
                onCheckedChange={(checked) => 
                  updateSetting("contrast", checked ? "dark" : "normal")
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Filtro para Daltonismo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "none", label: "Nenhum" },
                  { value: "deuteranopia", label: "Deuteranopia" },
                  { value: "protanopia", label: "Protanopia" },
                  { value: "tritanopia", label: "Tritanopia" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => updateSetting("colorblindMode", option.value as any)}
                    variant={settings.colorblindMode === option.value ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Motion Settings */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Pause className="w-4 h-4" />
            <span>Movimento e Animações</span>
          </h4>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Reduzir Animações</label>
            <Switch
              checked={settings.motionReduce}
              onCheckedChange={(checked) => updateSetting("motionReduce", checked)}
            />
          </div>
        </div>

        {/* Navigation Settings */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Keyboard className="w-4 h-4" />
            <span>Navegação</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Navegação por Teclado</label>
              <Switch
                checked={settings.keyboardNav}
                onCheckedChange={(checked) => updateSetting("keyboardNav", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Indicadores de Foco</label>
              <Switch
                checked={settings.focusIndicator}
                onCheckedChange={(checked) => updateSetting("focusIndicator", checked)}
              />
            </div>
          </div>
        </div>

        {/* Assistive Technology */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Tecnologia Assistiva</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Leitor de Tela</label>
              <Switch
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSetting("screenReader", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Controle por Voz</label>
              <Switch
                checked={settings.voiceControl}
                onCheckedChange={(checked) => updateSetting("voiceControl", checked)}
              />
            </div>
          </div>
        </div>

        {/* Accessibility Tips */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Dicas de Acessibilidade</h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use Tab para navegar entre elementos</li>
            <li>• Enter ou Espaço para ativar botões</li>
            <li>• Esc para fechar modais</li>
            <li>• Setas para navegar em listas</li>
          </ul>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetSettings}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar Padrão
        </Button>
      </CardContent>
    </Card>
  );
}