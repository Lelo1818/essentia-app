export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(date: Date | string): string {
  if (!date) return "Data inválida";
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(d.getTime())) return "Data inválida";
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}

export function formatDateRelative(date: Date | string): string {
  if (!date) return "Data inválida";
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(d.getTime())) return "Data inválida";
  
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Hoje";
  if (diffInDays === 1) return "Ontem";
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  
  return formatDate(d);
}

export function calculateDebtOptimization(debt: any) {
  const monthlyInterest = parseFloat(debt.interestRate) / 100;
  const balance = parseFloat(debt.amount);
  const minPayment = parseFloat(debt.minPayment);
  
  // Calculate suggested payment (double minimum or 20% of balance, whichever is higher)
  const suggestedPayment = Math.max(minPayment * 2, balance * 0.2);
  
  // Calculate savings with suggested payment
  const monthsWithMin = Math.ceil(Math.log(1 + (balance * monthlyInterest) / minPayment) / Math.log(1 + monthlyInterest));
  const totalWithMin = monthsWithMin * minPayment;
  
  const monthsWithSuggested = Math.ceil(Math.log(1 + (balance * monthlyInterest) / suggestedPayment) / Math.log(1 + monthlyInterest));
  const totalWithSuggested = monthsWithSuggested * suggestedPayment;
  
  const savings = totalWithMin - totalWithSuggested;
  
  return {
    suggestedPayment,
    savings,
    monthsSaved: monthsWithMin - monthsWithSuggested
  };
}

export function calculateGoalProgress(goal: any) {
  const current = parseFloat(goal.currentAmount);
  const target = parseFloat(goal.targetAmount);
  const progress = (current / target) * 100;
  
  return {
    percentage: Math.min(progress, 100),
    remaining: target - current,
    isCompleted: current >= target
  };
}
