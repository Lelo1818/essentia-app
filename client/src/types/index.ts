export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: Record<string, { total: number; count: number }>;
  budget?: any;
  goals: any[];
  debts: any[];
  recentTransactions: any[];
}

export interface CategoryInfo {
  name: string;
  icon: string;
  color: string;
}

export const EXPENSE_CATEGORIES: Record<string, CategoryInfo> = {
  moradia: { name: "Moradia", icon: "fas fa-home", color: "red" },
  alimentacao: { name: "Alimentação", icon: "fas fa-utensils", color: "blue" },
  transporte: { name: "Transporte", icon: "fas fa-car", color: "green" },
  lazer: { name: "Lazer", icon: "fas fa-gamepad", color: "purple" },
  saude: { name: "Saúde", icon: "fas fa-heart", color: "pink" },
  educacao: { name: "Educação", icon: "fas fa-graduation-cap", color: "indigo" },
  outros: { name: "Outros", icon: "fas fa-shopping-bag", color: "gray" }
};

export const INCOME_FREQUENCIES = [
  { value: "mensal", label: "Mensal" },
  { value: "semanal", label: "Semanal" },
  { value: "quinzenal", label: "Quinzenal" },
  { value: "unica", label: "Única" }
];
