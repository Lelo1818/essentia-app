export interface SeedsNotification {
  id: string;
  title: string;
  message: string;
  type: "ritual" | "reflection" | "reminder" | "celebration" | "transition";
  timing: "morning" | "afternoon" | "evening" | "anytime";
  frequency: "daily" | "weekly" | "situational" | "milestone";
  triggerCondition?: string;
  gentleReminder: boolean;
}

export const seedsNotifications: SeedsNotification[] = [
  // Morning Notifications
  {
    id: "morning-intention",
    title: "Sementes do Amanhecer",
    message: "Bom dia. Respire fundo. Qual é sua intenção para hoje?",
    type: "reflection",
    timing: "morning",
    frequency: "daily",
    gentleReminder: true
  },
  {
    id: "morning-ritual",
    title: "Ritual Matinal",
    message: "Que tal começar o dia com um momento de presença? Seu ritual da água te espera.",
    type: "ritual", 
    timing: "morning",
    frequency: "daily",
    gentleReminder: true
  },

  // Evening Notifications
  {
    id: "evening-reflection",
    title: "Pausa do Entardecer",
    message: "O dia termina. Como foi sua jornada? Seu diário vivo está aberto para você.",
    type: "reflection",
    timing: "evening", 
    frequency: "daily",
    gentleReminder: true
  },
  {
    id: "evening-gratitude",
    title: "Gratidão Silenciosa",
    message: "Três respirações. Três coisas pelas quais você é grato hoje.",
    type: "reflection",
    timing: "evening",
    frequency: "daily",
    gentleReminder: true
  },

  // Situational Notifications
  {
    id: "stress-detected",
    title: "Respire",
    message: "Percebo que você pode estar precisando de uma pausa. Que tal uma respiração quadrada?",
    type: "ritual",
    timing: "anytime",
    frequency: "situational",
    triggerCondition: "stress_level_high",
    gentleReminder: true
  },
  {
    id: "long-absence",
    title: "Sentimos Sua Falta",
    message: "Sua jornada te espera. Não com pressa, mas com carinho.",
    type: "reminder",
    timing: "anytime", 
    frequency: "situational",
    triggerCondition: "absence_7_days",
    gentleReminder: true
  },
  {
    id: "milestone-celebration",
    title: "Celebração Silenciosa",
    message: "Você completou uma fase importante. Parabéns por caminhar com coragem.",
    type: "celebration",
    timing: "anytime",
    frequency: "milestone",
    triggerCondition: "phase_completed",
    gentleReminder: false
  },

  // Weekly Reflections
  {
    id: "weekly-review",
    title: "Semana em Reflexão",
    message: "Uma semana se passou. O que floresceu em você? O que deseja plantar na próxima?",
    type: "reflection",
    timing: "evening",
    frequency: "weekly",
    gentleReminder: true
  },
  {
    id: "weekly-ritual",
    title: "Ritual Semanal",
    message: "Hora do seu ritual de transição semanal. Solte o que não serve, acolha o novo.",
    type: "ritual",
    timing: "evening",
    frequency: "weekly", 
    gentleReminder: true
  },

  // Transition Notifications
  {
    id: "phase-transition",
    title: "Nova Fase Disponível",
    message: "Você está pronto para a próxima fase da sua jornada. Quando quiser, ela te espera.",
    type: "transition",
    timing: "anytime",
    frequency: "situational",
    triggerCondition: "phase_completion_ready",
    gentleReminder: true
  },
  {
    id: "gentle-encouragement",
    title: "Você Não Está Sozinho",
    message: "Toda jornada tem pausas. Quando estiver pronto, estaremos aqui.",
    type: "reminder",
    timing: "anytime",
    frequency: "situational", 
    triggerCondition: "user_inactive_3_days",
    gentleReminder: true
  }
];

export const getNotificationsByTiming = (timing: string): SeedsNotification[] => {
  return seedsNotifications.filter(notif => notif.timing === timing || notif.timing === "anytime");
};

export const getNotificationsByType = (type: string): SeedsNotification[] => {
  return seedsNotifications.filter(notif => notif.type === type);
};

export const getGentleReminders = (): SeedsNotification[] => {
  return seedsNotifications.filter(notif => notif.gentleReminder);
};

export const getNotificationByTrigger = (condition: string): SeedsNotification | undefined => {
  return seedsNotifications.find(notif => notif.triggerCondition === condition);
};