// Validador inteligente de metas baseado no perfil financeiro

export interface GoalValidationResult {
  valid: boolean;
  message: string;
  suggestion?: string;
  alternativeGoals?: Array<{
    amount: number;
    months: number;
    monthlyAmount: number;
  }>;
}

export interface UserFinancialProfile {
  monthlyIncome: number;
  monthlyExpenses: number;
  availableForSaving: number;
  currentBalance: number;
}

export class GoalValidator {
  
  static validateGoal(
    targetAmount: number,
    targetMonths: number,
    userProfile: UserFinancialProfile
  ): GoalValidationResult {
    
    const monthlyRequired = targetAmount / targetMonths;
    const { availableForSaving, monthlyIncome } = userProfile;
    
    // Teste 1: Meta impossível - requer mais do que a renda total
    if (monthlyRequired > monthlyIncome) {
      return {
        valid: false,
        message: "Essa meta está muito além da sua capacidade atual. Mesmo poupando 100% da renda não seria possível.",
        suggestion: "Considere reduzir o valor ou estender o prazo",
        alternativeGoals: this.generateAlternatives(targetAmount, userProfile)
      };
    }
    
    // Teste 2: Meta muito agressiva - requer mais de 80% da sobra
    if (monthlyRequired > (availableForSaving * 0.8)) {
      return {
        valid: false,
        message: "Essa meta está além da sua capacidade atual. Deseja dividir em etapas?",
        suggestion: `Para atingir ${this.formatCurrency(targetAmount)}, sugerimos um prazo maior ou valor menor`,
        alternativeGoals: this.generateAlternatives(targetAmount, userProfile)
      };
    }
    
    // Teste 3: Meta desafiadora mas possível - 50-80% da sobra
    if (monthlyRequired > (availableForSaving * 0.5)) {
      return {
        valid: true,
        message: "Meta desafiadora! Você precisará economizar bastante, mas é possível.",
        suggestion: `Economia necessária: ${this.formatCurrency(monthlyRequired)}/mês (${Math.round((monthlyRequired/availableForSaving)*100)}% da sua sobra)`
      };
    }
    
    // Teste 4: Meta confortável - até 50% da sobra
    return {
      valid: true,
      message: "Meta bem planejada! Você consegue atingir facilmente.",
      suggestion: `Economia necessária: ${this.formatCurrency(monthlyRequired)}/mês (${Math.round((monthlyRequired/availableForSaving)*100)}% da sua sobra)`
    };
  }
  
  private static generateAlternatives(
    targetAmount: number, 
    userProfile: UserFinancialProfile
  ): Array<{amount: number, months: number, monthlyAmount: number}> {
    
    const maxMonthlyComfortable = userProfile.availableForSaving * 0.5;
    const maxMonthlyPossible = userProfile.availableForSaving * 0.8;
    
    return [
      // Opção confortável
      {
        amount: targetAmount,
        months: Math.ceil(targetAmount / maxMonthlyComfortable),
        monthlyAmount: maxMonthlyComfortable
      },
      // Opção desafiadora
      {
        amount: targetAmount,
        months: Math.ceil(targetAmount / maxMonthlyPossible),
        monthlyAmount: maxMonthlyPossible
      },
      // Opção reduzida prazo atual
      {
        amount: Math.floor(maxMonthlyPossible * (targetAmount / (targetAmount / 12))),
        months: 12,
        monthlyAmount: maxMonthlyPossible
      }
    ];
  }
  
  private static formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}