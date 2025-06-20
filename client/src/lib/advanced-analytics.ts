// Advanced Analytics and Machine Learning-like predictions
export interface FinancialPattern {
  category: string;
  trend: "increasing" | "decreasing" | "stable";
  confidence: number;
  prediction: number;
  recommendation: string;
  impact: "high" | "medium" | "low";
}

export interface UserBehavior {
  spendingPatterns: string[];
  savingHabits: string[];
  riskProfile: "conservative" | "moderate" | "aggressive";
  goals: string[];
}

export class AdvancedAnalytics {
  static analyzeSpendingPatterns(transactions: any[]): FinancialPattern[] {
    if (!transactions.length) return [];

    const patterns: FinancialPattern[] = [];
    const categorySpending: { [key: string]: number[] } = {};

    // Group transactions by category and month
    transactions.forEach(transaction => {
      const category = transaction.category || "outros";
      if (!categorySpending[category]) {
        categorySpending[category] = [];
      }
      categorySpending[category].push(transaction.amount);
    });

    // Analyze trends for each category
    Object.entries(categorySpending).forEach(([category, amounts]) => {
      if (amounts.length < 2) return;

      const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
      const recent = amounts.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, amounts.length);
      const older = amounts.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(1, amounts.length - 3);

      let trend: "increasing" | "decreasing" | "stable" = "stable";
      let confidence = 0.7;
      let prediction = avg;
      let recommendation = "";
      let impact: "high" | "medium" | "low" = "medium";

      if (recent > older * 1.2) {
        trend = "increasing";
        prediction = recent * 1.1;
        recommendation = `Gastos com ${category} aumentaram 20%. Considere estabelecer um limite mensal.`;
        impact = avg > 500 ? "high" : "medium";
      } else if (recent < older * 0.8) {
        trend = "decreasing";
        prediction = recent * 0.9;
        recommendation = `Ótimo controle em ${category}! Continue assim para economizar mais.`;
        impact = "low";
      } else {
        prediction = avg;
        recommendation = `Gastos com ${category} estão estáveis. Boa consistência no orçamento.`;
      }

      patterns.push({
        category,
        trend,
        confidence,
        prediction,
        recommendation,
        impact
      });
    });

    return patterns.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    });
  }

  static generatePersonalizedInsights(userData: any): string[] {
    const insights: string[] = [];

    if (userData.totalIncome && userData.totalExpenses) {
      const savingsRate = ((userData.totalIncome - userData.totalExpenses) / userData.totalIncome) * 100;
      
      if (savingsRate < 10) {
        insights.push("Sua taxa de poupança está abaixo do recomendado. Meta: 20% da renda.");
      } else if (savingsRate >= 30) {
        insights.push("Excelente taxa de poupança! Considere diversificar investimentos.");
      }
    }

    if (userData.expenseCategories) {
      const categories = Object.entries(userData.expenseCategories);
      const highest = categories.reduce((max, current) => 
        (current[1] as number) > (max[1] as number) ? current : max
      );
      
      if ((highest[1] as number) > userData.totalExpenses * 0.4) {
        insights.push(`40%+ dos gastos concentrados em ${highest[0]}. Diversificar pode reduzir riscos.`);
      }
    }

    return insights;
  }

  static predictFutureBalance(currentBalance: number, avgIncome: number, avgExpenses: number, months: number): number[] {
    const predictions: number[] = [];
    let balance = currentBalance;
    
    for (let i = 0; i < months; i++) {
      // Add some realistic variance
      const incomeVariance = avgIncome * (0.9 + Math.random() * 0.2);
      const expenseVariance = avgExpenses * (0.9 + Math.random() * 0.2);
      
      balance += incomeVariance - expenseVariance;
      predictions.push(Math.round(balance));
    }
    
    return predictions;
  }

  static calculateFinancialHealth(userData: any): {
    score: number;
    grade: string;
    factors: { name: string; score: number; weight: number }[];
  } {
    const factors = [
      {
        name: "Taxa de Poupança",
        score: this.calculateSavingsScore(userData.totalIncome, userData.totalExpenses),
        weight: 0.3
      },
      {
        name: "Diversificação de Gastos",
        score: this.calculateDiversificationScore(userData.expenseCategories),
        weight: 0.2
      },
      {
        name: "Consistência de Renda",
        score: this.calculateIncomeConsistency(userData.incomes || []),
        weight: 0.25
      },
      {
        name: "Controle de Dívidas",
        score: this.calculateDebtScore(userData.debts || []),
        weight: 0.25
      }
    ];

    const totalScore = factors.reduce((sum, factor) => 
      sum + (factor.score * factor.weight), 0
    );

    let grade = "F";
    if (totalScore >= 90) grade = "A+";
    else if (totalScore >= 80) grade = "A";
    else if (totalScore >= 70) grade = "B";
    else if (totalScore >= 60) grade = "C";
    else if (totalScore >= 50) grade = "D";

    return { score: Math.round(totalScore), grade, factors };
  }

  private static calculateSavingsScore(income: number, expenses: number): number {
    if (!income) return 0;
    const savingsRate = ((income - expenses) / income) * 100;
    return Math.min(100, Math.max(0, savingsRate * 5)); // 20% savings = 100 points
  }

  private static calculateDiversificationScore(categories: any): number {
    if (!categories) return 50;
    const values = Object.values(categories) as number[];
    const total = values.reduce((a, b) => a + b, 0);
    
    // Calculate concentration (lower is better for diversification)
    const concentration = Math.max(...values) / total;
    return Math.round((1 - concentration) * 100);
  }

  private static calculateIncomeConsistency(incomes: any[]): number {
    if (incomes.length < 2) return 50;
    
    const amounts = incomes.map(i => i.amount);
    const avg = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - avg, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    const coefficient = stdDev / avg;
    
    return Math.round(Math.max(0, (1 - coefficient) * 100));
  }

  private static calculateDebtScore(debts: any[]): number {
    if (debts.length === 0) return 100;
    
    const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
    const highInterestDebt = debts.filter(d => d.interestRate > 15).reduce((sum, debt) => sum + debt.amount, 0);
    
    const ratio = highInterestDebt / totalDebt;
    return Math.round((1 - ratio) * 100);
  }
}

export class LearningAnalytics {
  static analyzeStudyPatterns(sessions: any[]): {
    optimalStudyTime: string;
    averageSessionLength: number;
    productivityTrend: "improving" | "declining" | "stable";
    recommendations: string[];
  } {
    if (!sessions.length) {
      return {
        optimalStudyTime: "09:00",
        averageSessionLength: 0,
        productivityTrend: "stable",
        recommendations: ["Comece registrando suas sessões de estudo para análise personalizada"]
      };
    }

    // Analyze time patterns
    const timeScores: { [hour: string]: number[] } = {};
    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours().toString().padStart(2, '0');
      if (!timeScores[hour]) timeScores[hour] = [];
      timeScores[hour].push(session.score || session.progress || 70);
    });

    const optimalHour = Object.entries(timeScores)
      .sort(([,a], [,b]) => {
        const avgA = a.reduce((sum, val) => sum + val, 0) / a.length;
        const avgB = b.reduce((sum, val) => sum + val, 0) / b.length;
        return avgB - avgA;
      })[0]?.[0] || "09";

    const averageLength = sessions.reduce((sum, s) => sum + (s.duration || 30), 0) / sessions.length;

    // Analyze trend
    const recent = sessions.slice(-5);
    const older = sessions.slice(-10, -5);
    const recentAvg = recent.reduce((sum, s) => sum + (s.score || 70), 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + (s.score || 70), 0) / (older.length || 1);

    let trend: "improving" | "declining" | "stable" = "stable";
    if (recentAvg > olderAvg * 1.1) trend = "improving";
    else if (recentAvg < olderAvg * 0.9) trend = "declining";

    const recommendations = [
      `Seu melhor horário de estudo é ${optimalHour}:00`,
      averageLength > 60 ? "Considere sessões mais curtas com pausas" : "Suas sessões têm duração ideal",
      trend === "improving" ? "Continue o ótimo progresso!" : "Experimente novas técnicas de estudo"
    ];

    return {
      optimalStudyTime: `${optimalHour}:00`,
      averageSessionLength: Math.round(averageLength),
      productivityTrend: trend,
      recommendations
    };
  }
}

export class SpiritualAnalytics {
  static analyzeSpiritualGrowth(reflections: any[], practices: any[]): {
    growthStage: string;
    balanceScore: number;
    insights: string[];
    nextSteps: string[];
  } {
    const totalReflections = reflections.length;
    const recentPractices = practices.filter(p => 
      new Date(p.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;

    let growthStage = "Iniciante";
    if (totalReflections > 50 && recentPractices > 20) growthStage = "Avançado";
    else if (totalReflections > 20 && recentPractices > 10) growthStage = "Intermediário";

    const balanceScore = Math.min(100, (recentPractices * 3) + (totalReflections * 0.5));

    const insights = [
      `Você está no estágio ${growthStage} da jornada espiritual`,
      `${recentPractices} práticas no último mês mostram ${recentPractices > 15 ? 'excelente' : 'boa'} consistência`,
      balanceScore > 70 ? "Seu crescimento espiritual está bem equilibrado" : "Há espaço para aprofundar sua prática"
    ];

    const nextSteps = [
      "Estabeleça uma rotina diária de 10 minutos de reflexão",
      "Explore novas formas de meditação e mindfulness",
      "Conecte-se com sua comunidade espiritual"
    ];

    return { growthStage, balanceScore: Math.round(balanceScore), insights, nextSteps };
  }
}