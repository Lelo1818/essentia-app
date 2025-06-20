import { Plus, Camera, PieChart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const actions = [
    {
      title: "Adicionar Renda",
      description: "Registre sua renda",
      icon: Plus,
      color: "green",
      onClick: () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-xl font-bold mb-4 text-green-600">💰 Adicionar Renda</h3>
            <form id="income-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Descrição</label>
                <input type="text" placeholder="Ex: Salário, Freelance, Vendas" 
                       class="w-full p-2 border rounded focus:ring-2 focus:ring-green-400" required>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Valor (R$)</label>
                <input type="number" placeholder="0.00" step="0.01" 
                       class="w-full p-2 border rounded focus:ring-2 focus:ring-green-400" required>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Categoria</label>
                <select class="w-full p-2 border rounded focus:ring-2 focus:ring-green-400">
                  <option>Salário</option>
                  <option>Freelance</option>
                  <option>Investimentos</option>
                  <option>Vendas</option>
                  <option>Outros</option>
                </select>
              </div>
              <div class="flex gap-2">
                <button type="submit" class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  Adicionar
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" 
                        class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('income-form').onsubmit = function(e) {
          e.preventDefault();
          alert('Renda adicionada com sucesso! 🎉');
          modal.remove();
        };
      }
    },
    {
      title: "Foto Gasto",
      description: "OCR automático",
      icon: Camera,
      color: "red",
      onClick: () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-xl font-bold mb-4 text-blue-600">📸 Scanner de Nota Fiscal</h3>
            <div class="text-center space-y-4">
              <div class="border-2 border-dashed border-blue-300 rounded-lg p-8">
                <div class="w-12 h-12 mx-auto text-blue-400 mb-2">📷</div>
                <p class="text-gray-600">Fotografe sua nota fiscal</p>
                <p class="text-xs text-gray-400">IA extrairá os dados automaticamente</p>
              </div>
              <button onclick="
                this.innerHTML = '🤖 Processando...';
                setTimeout(() => {
                  this.closest('.bg-white').innerHTML = \`
                    <h3 class='text-xl font-bold mb-4 text-green-600'>✅ Nota Processada</h3>
                    <div class='space-y-2 text-left'>
                      <p><strong>Local:</strong> Supermercado Central</p>
                      <p><strong>Valor:</strong> R$ 127,45</p>
                      <p><strong>Data:</strong> Hoje</p>
                      <p><strong>Categoria:</strong> Alimentação</p>
                      <p><strong>Itens:</strong> 12 produtos</p>
                    </div>
                    <div class='flex gap-2 mt-4'>
                      <button onclick='alert(\\\"Gasto registrado!\\\"); this.closest(\\\".fixed\\\").remove();' 
                              class='flex-1 bg-green-500 text-white py-2 px-4 rounded'>Confirmar</button>
                      <button onclick='this.closest(\\\".fixed\\\").remove()' 
                              class='flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded'>Cancelar</button>
                    </div>
                  \`;
                }, 2000);
              " class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                📷 Fotografar
              </button>
              <button onclick="this.closest('.fixed').remove()" 
                      class="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
    },
    {
      title: "Planejar",
      description: "Alocar renda",
      icon: PieChart,
      color: "blue",
      onClick: onOpenPlanningModal
    },
    {
      title: "Nova Meta",
      description: "Definir objetivos",
      icon: Target,
      color: "purple",
      onClick: onOpenGoalsModal
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
