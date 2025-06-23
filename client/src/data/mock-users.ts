export const mockUsers = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    initials: "AS",
    role: "Estudante",
    avatar: "",
    stats: {
      flow: { balance: 4250.80, savings: 1200.00, investments: 850.30 },
      edu: { coursesCompleted: 8, hoursStudied: 124, streak: 15 },
      purpose: { journeyProgress: 75, ritualsCompleted: 12, insightsGained: 28 }
    }
  },
  {
    id: 2,
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com", 
    initials: "CM",
    role: "Empreendedor",
    avatar: "",
    stats: {
      flow: { balance: 12480.50, savings: 5000.00, investments: 3200.75 },
      edu: { coursesCompleted: 15, hoursStudied: 298, streak: 42 },
      purpose: { journeyProgress: 90, ritualsCompleted: 20, insightsGained: 45 }
    }
  },
  {
    id: 3,
    name: "Beatriz Costa",
    email: "beatriz.costa@email.com",
    initials: "BC", 
    role: "Designer",
    avatar: "",
    stats: {
      flow: { balance: 3180.25, savings: 800.00, investments: 450.80 },
      edu: { coursesCompleted: 6, hoursStudied: 89, streak: 8 },
      purpose: { journeyProgress: 60, ritualsCompleted: 8, insightsGained: 18 }
    }
  },
  {
    id: 4,
    name: "Rafael Santos",
    email: "rafael.santos@email.com",
    initials: "RS",
    role: "Desenvolvedor", 
    avatar: "",
    stats: {
      flow: { balance: 8750.90, savings: 2500.00, investments: 8750.00 },
      edu: { coursesCompleted: 22, hoursStudied: 445, streak: 67 },
      purpose: { journeyProgress: 85, ritualsCompleted: 18, insightsGained: 35 }
    }
  },
  {
    id: 5,
    name: "Mariana Oliveira",
    email: "mariana.oliveira@email.com",
    initials: "MO",
    role: "Professora",
    avatar: "",
    stats: {
      flow: { balance: 5920.40, savings: 1800.00, investments: 920.60 },
      edu: { coursesCompleted: 12, hoursStudied: 201, streak: 28 },
      purpose: { journeyProgress: 70, ritualsCompleted: 14, insightsGained: 31 }
    }
  }
];

export const getCurrentUser = () => {
  const user = mockUsers[3]; // Rafael Santos - usuário demonstração
  return {
    ...user,
    // Dados específicos para demonstração
    name: "Rafael Santos",
    email: "rafael.santos@flowecosystem.com",
    role: "Beta Tester",
    level: user.stats.edu.streak
  };
};

export const getRandomUser = () => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

export const getUserStats = (userId: number, app: "flow" | "edu" | "purpose") => {
  const user = mockUsers.find(u => u.id === userId);
  return user?.stats[app];
};