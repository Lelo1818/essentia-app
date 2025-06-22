import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/financial-utils";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Medal,
  Trophy,
  Star,
  Wallet,
  BarChart3,
  User,
  Bell,
  Edit,
  Power,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import Income from "@/pages/income";
import Expenses from "@/pages/expenses";
import Planning from "@/pages/planning";
import Goals from "@/pages/goals";
import Profile from "@/pages/profile";

// Alert Center Component
function AlertsCenter() {
  const [alerts, setAlerts] = useState([
    { id: 1, category: "Gastos Mensais", limit: 5000, current: 4267, active: true, type: "success" },
    { id: 2, category: "Alimentação", limit: 600, current: 571, active: true, type: "success" },
    { id: 3, category: "Transporte", limit: 500, current: 461, active: true, type: "success" },
    { id: 4, category: "Sobra Mínima", limit: 10000, current: 16333, active: true, type: "success" }
  ]);
  
  const [showEditor, setShowEditor] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  const createNewAlert = () => {
    setEditingAlert({
      id: Date.now(),
      category: "",
      limit: 0,
      current: 0,
      active: true,
      type: "info"
    });
    setShowEditor(true);
  };

  const editAlert = (alert) => {
    setEditingAlert(alert);
    setShowEditor(true);
  };

  const saveAlert = (alertData) => {
    if (editingAlert.id && alerts.find(a => a.id === editingAlert.id)) {
      setAlerts(alerts.map(a => a.id === editingAlert.id ? alertData : a));
    } else {
      setAlerts([...alerts, alertData]);
    }
    setShowEditor(false);
    setEditingAlert(null);
  };

  const toggleAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? {...a, active: !a.active} : a));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Central de Alertas</h2>
        <Button onClick={createNewAlert} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Alerta
        </Button>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Ativos ({alerts.filter(a => a.active).length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map(alert => {
              const percentage = (alert.current / alert.limit) * 100;
              const status = percentage >= 100 ? "danger" : percentage >= 80 ? "warning" : "success";
              
              return (
                <div key={alert.id} className={`p-4 rounded-lg border ${
                  status === "danger" ? "bg-red-50 border-red-200" : 
                  status === "warning" ? "bg-yellow-50 border-yellow-200" :
                  "bg-green-50 border-green-200"
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.active ? "bg-green-500" : "bg-gray-400"
                      }`} />
                      <h3 className="font-semibold">{alert.category}</h3>
                      <Badge 
                        variant={status === "success" ? "default" : "destructive"}
                        className={`${
                          status === "success" ? "bg-green-100 text-green-800" :
                          status === "warning" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {status === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {status === "danger" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {status === "success" ? "OK" : status === "warning" ? "ATENÇÃO" : "ALERTA"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => editAlert(alert)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        size="sm" 
                        variant={alert.active ? "destructive" : "default"}
                        onClick={() => toggleAlert(alert.id)}
                      >
                        <Power className="w-3 h-3 mr-1" />
                        {alert.active ? "Desativar" : "Ativar"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Atual: </span>
                      <span className="font-semibold">R$ {alert.current.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Limite: </span>
                      <span className="font-semibold">R$ {alert.limit.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === "danger" ? "bg-red-500" :
                          status === "warning" ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alert Editor Modal */}
      {showEditor && (
        <AlertEditor
          alert={editingAlert}
          onSave={saveAlert}
          onCancel={() => {
            setShowEditor(false);
            setEditingAlert(null);
          }}
        />
      )}
    </div>
  );
}

// Alert Editor Component
function AlertEditor({ alert, onSave, onCancel }) {
  const [formData, setFormData] = useState(alert);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{alert.id ? "Editar Alerta" : "Novo Alerta"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Categoria</label>
            <select 
              className="w-full p-2 border rounded"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="Gastos Mensais">Gastos Mensais</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Entretenimento">Entretenimento</option>
              <option value="Sobra Mínima">Sobra Mínima</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Limite (R$)</label>
            <input 
              type="number"
              className="w-full p-2 border rounded"
              value={formData.limit}
              onChange={(e) => setFormData({...formData, limit: parseFloat(e.target.value) || 0})}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Salvar Alerta
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FlowWorking() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Real financial data
  const data = {
    totalIncome: 10050,
    totalExpenses: 3730,
    balance: 6320,
    savings: 15420,
    investments: 8750,
    creditCards: 2100,
    goals: [
      { name: "Viagem Europa", progress: 57, current: 8500, target: 15000 },
      { name: "Reserva Emergência", progress: 48, current: 12000, target: 25000 }
    ],
    transactions: [
      { type: "income", desc: "Salário Principal", amount: 8500, date: "Hoje" },
      { type: "expense", desc: "Supermercado", amount: -450, date: "Ontem" },
      { type: "income", desc: "Freelance Design", amount: 1200, date: "2 dias" },
      { type: "expense", desc: "Gasolina", amount: -280, date: "3 dias" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-full overflow-hidden">
        
        {/* Mobile-First Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          {/* Mobile Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Flow
                  </h1>
                  <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 hidden sm:block">
                    Sua gestão financeira inteligente
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                Online
              </Badge>
            </div>
          </div>

          {/* Mobile Navigation Tabs with Visual Improvements */}
          <TabsList className="grid w-full grid-cols-5 mb-4 sm:mb-6 h-auto p-1 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col gap-1 py-3 px-2 text-xs relative group hover:bg-blue-50 transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200"
            >
              <BarChart3 className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Dashboard</span>
              <span className="sm:hidden font-medium">Home</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </TabsTrigger>
            <TabsTrigger 
              value="income" 
              className="flex flex-col gap-1 py-3 px-2 text-xs relative group hover:bg-green-50 transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-green-200"
            >
              <TrendingUp className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
              <span className="font-medium">Renda</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="flex flex-col gap-1 py-3 px-2 text-xs relative group hover:bg-red-50 transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-200"
            >
              <TrendingDown className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
              <span className="font-medium">Gastos</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="flex flex-col gap-1 py-3 px-2 text-xs relative group hover:bg-purple-50 transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-200"
            >
              <Target className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
              <span className="font-medium">Metas</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </TabsTrigger>
            <TabsTrigger 
              value="planning" 
              className="flex flex-col gap-1 py-3 px-2 text-xs relative group hover:bg-indigo-50 transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-200"
            >
              <PiggyBank className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
              <span className="font-medium">Plan.</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-0">
            {/* Estatísticas principais */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Receitas</p>
                      <p className="text-lg sm:text-3xl font-bold text-green-600">
                        {formatCurrency(data.totalIncome)}
                      </p>
                      <p className="text-xs text-green-500 mt-1">+12.5%</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl">
                      <TrendingUp className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Gastos</p>
                      <p className="text-lg sm:text-3xl font-bold text-red-600">
                        {formatCurrency(data.totalExpenses)}
                      </p>
                      <p className="text-xs text-red-500 mt-1">-8.2%</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl">
                      <TrendingDown className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Saldo</p>
                      <p className="text-lg sm:text-3xl font-bold text-blue-600">
                        {formatCurrency(data.balance)}
                      </p>
                      <p className="text-xs text-blue-500 mt-1">+23.1%</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl">
                      <DollarSign className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Investimentos</p>
                      <p className="text-lg sm:text-3xl font-bold text-purple-600">
                        {formatCurrency(data.investments)}
                      </p>
                      <p className="text-xs text-purple-500 mt-1">+15.3%</p>
                    </div>
                    <div className="p-2 sm:p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl">
                      <Target className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Button className="h-16 flex flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Nova Receita</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 border-2 hover:bg-slate-50 transform hover:scale-105 transition-all duration-200">
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Novo Gasto</span>
              </Button>
              <Button 
                onClick={() => setActiveTab("alerts")}
                className="h-16 flex flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <span className="text-xs">Alertas</span>
              </Button>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.transactions.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {t.type === 'income' ? 
                            <ArrowUpRight className="w-4 h-4 text-green-600" /> : 
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{t.desc}</p>
                          <p className="text-xs text-slate-600">{t.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'income' ? '+' : ''}{formatCurrency(Math.abs(t.amount))}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income" className="mt-0">
            <Income />
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="mt-0">
            <Expenses />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="mt-0">
            <Goals />
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="mt-0">
            <Planning />
          </TabsContent>

          {/* Alerts Tab - NEW FUNCTIONAL INTERFACE */}
          <TabsContent value="alerts" className="mt-0">
            <AlertsCenter />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}