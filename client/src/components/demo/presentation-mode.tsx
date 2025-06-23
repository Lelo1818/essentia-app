import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Presentation, Code } from "lucide-react";

interface PresentationModeProps {
  isDemo: boolean;
  onToggle: (enabled: boolean) => void;
}

export function PresentationMode({ isDemo, onToggle }: PresentationModeProps) {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
      <div className="flex items-center gap-3">
        <Badge variant={isDemo ? "default" : "secondary"} className="text-xs">
          {isDemo ? (
            <>
              <Presentation className="w-3 h-3 mr-1" />
              Demo Mode
            </>
          ) : (
            <>
              <Code className="w-3 h-3 mr-1" />
              Dev Mode
            </>
          )}
        </Badge>
        
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-gray-500" />
          <Switch
            checked={isDemo}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-blue-600"
          />
          <Eye className="w-4 h-4 text-blue-600" />
        </div>
      </div>
      
      {isDemo && (
        <div className="text-xs text-gray-600 mt-2 max-w-48">
          Modo apresentação ativo - Logs e debug ocultados
        </div>
      )}
    </div>
  );
}