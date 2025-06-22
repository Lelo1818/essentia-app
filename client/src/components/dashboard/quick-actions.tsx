import { Plus, Camera, PieChart, Target, Calculator, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuickActionsProps {
  onOpenIncomeModal: () => void;
  onOpenExpenseModal: () => void;
  onOpenPlanningModal: () => void;
  onOpenGoalsModal: () => void;
}

export default function QuickActions({
  onOpenIncomeModal,
  onOpenExpenseModal,
  onOpenPlanningModal,
  onOpenGoalsModal
}: QuickActionsProps) {
  const { toast } = useToast();
  
  const actions = [
    {
      title: "Agendar Pagamentos",
      description: "Organize pagamentos",
      icon: Calendar,
      color: "blue",
      onClick: () => window.location.href = '/agendar-pagamentos'
    },
    {
      title: "Simular Cenários",
      description: "Análise preditiva",
      icon: Calculator,
      color: "purple",
      onClick: () => toast({
        title: "Simulador de Cenários",
        description: "Funcionalidade em desenvolvimento..."
      })
    },
    {
      title: "Renegociar Dívidas",
      description: "Estratégias de pagamento",
      icon: DollarSign,
      color: "green",
      onClick: () => toast({
        title: "Renegociar Dívidas", 
        description: "Análise de renegociação em desenvolvimento..."
      })
    },
    {
      title: "Fotografar Gasto",
      description: "OCR inteligente",
      icon: Camera,
      color: "red",
      onClick: onOpenExpenseModal
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600", 
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.title}
            variant="outline"
            className="bg-white rounded-xl p-4 h-auto shadow-card hover:shadow-card-hover transition-shadow text-center border-0"
            onClick={action.onClick}
          >
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${getColorClasses(action.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{action.description}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}