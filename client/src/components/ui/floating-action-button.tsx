import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Camera, Receipt, CreditCard, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FABProps {
  onCameraClick: () => void;
  onExpenseClick: () => void;
  onIncomeClick: () => void;
  onGoalClick: () => void;
}

export function FloatingActionButton({ onCameraClick, onExpenseClick, onIncomeClick, onGoalClick }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Camera, label: "Foto Gasto", onClick: onCameraClick, color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Receipt, label: "Gasto Manual", onClick: onExpenseClick, color: "bg-green-600 hover:bg-green-700" },
    { icon: FileText, label: "Renda", onClick: onIncomeClick, color: "bg-purple-600 hover:bg-purple-700" },
    { icon: CreditCard, label: "Meta", onClick: onGoalClick, color: "bg-orange-600 hover:bg-orange-700" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={cn(
        "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <Button
              size="lg"
              className={cn("rounded-full w-12 h-12 shadow-lg", action.color)}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
            >
              <action.icon className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB button */}
      <Button
        size="lg"
        className={cn(
          "rounded-full w-14 h-14 shadow-lg transition-all duration-300",
          isOpen 
            ? "bg-red-600 hover:bg-red-700 rotate-45" 
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  );
}