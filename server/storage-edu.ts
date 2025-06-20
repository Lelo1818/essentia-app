import { 
  User, InsertUser, LearningPath, InsertLearningPath, LearningSession, InsertLearningSession,
  UserMaterial, InsertUserMaterial, StudyReminder, InsertStudyReminder, Achievement, InsertAchievement,
  ContentSuggestion, InsertContentSuggestion, ProgressAnalytics, InsertProgressAnalytics
} from "../shared/schema-edu.js";

export interface IEduStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Learning Paths
  getLearningPathsByUserId(userId: number): Promise<LearningPath[]>;
  getLearningPath(id: number): Promise<LearningPath | undefined>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;
  updateLearningPath(id: number, updates: Partial<LearningPath>): Promise<LearningPath | undefined>;
  deleteLearningPath(id: number): Promise<boolean>;
  
  // Learning Sessions
  getLearningSessionsByPathId(pathId: number): Promise<LearningSession[]>;
  getLearningSessionsByUserId(userId: number): Promise<LearningSession[]>;
  createLearningSession(session: InsertLearningSession): Promise<LearningSession>;
  updateLearningSession(id: number, updates: Partial<LearningSession>): Promise<LearningSession | undefined>;
  
  // User Materials
  getUserMaterialsByUserId(userId: number): Promise<UserMaterial[]>;
  createUserMaterial(material: InsertUserMaterial): Promise<UserMaterial>;
  updateUserMaterial(id: number, updates: Partial<UserMaterial>): Promise<UserMaterial | undefined>;
  deleteUserMaterial(id: number): Promise<boolean>;
  
  // Study Reminders
  getStudyRemindersByUserId(userId: number): Promise<StudyReminder[]>;
  createStudyReminder(reminder: InsertStudyReminder): Promise<StudyReminder>;
  updateStudyReminder(id: number, updates: Partial<StudyReminder>): Promise<StudyReminder | undefined>;
  deleteStudyReminder(id: number): Promise<boolean>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Content Suggestions
  getContentSuggestions(category?: string, trending?: boolean): Promise<ContentSuggestion[]>;
  createContentSuggestion(suggestion: InsertContentSuggestion): Promise<ContentSuggestion>;
  
  // Progress Analytics
  getProgressAnalyticsByUserId(userId: number, days?: number): Promise<ProgressAnalytics[]>;
  createProgressAnalytics(analytics: InsertProgressAnalytics): Promise<ProgressAnalytics>;
}

export class EduMemStorage implements IEduStorage {
  private users: Map<number, User>;
  private learningPaths: Map<number, LearningPath>;
  private learningSessions: Map<number, LearningSession>;
  private userMaterials: Map<number, UserMaterial>;
  private studyReminders: Map<number, StudyReminder>;
  private achievements: Map<number, Achievement>;
  private contentSuggestions: Map<number, ContentSuggestion>;
  private progressAnalytics: Map<number, ProgressAnalytics>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.learningPaths = new Map();
    this.learningSessions = new Map();
    this.userMaterials = new Map();
    this.studyReminders = new Map();
    this.achievements = new Map();
    this.contentSuggestions = new Map();
    this.progressAnalytics = new Map();
    this.currentId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed default user
    const defaultUser: User = {
      id: 1,
      name: "Estudante",
      email: "estudante@edu.com",
      avatar: null,
      learningStyle: "visual",
      hasADHD: false,
      hasDyslexia: false,
      experience: 150,
      streak: 3,
      lastLoginDate: new Date(),
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);

    // Seed content suggestions
    const suggestions = [
      {
        id: 2,
        title: "Introdução à Inteligência Artificial",
        description: "Aprenda os conceitos básicos de IA e como aplicar no dia a dia",
        category: "tecnologia",
        difficulty: "beginner",
        estimatedTime: 8,
        trending: true,
        tags: ["ia", "tecnologia", "futuro"],
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Mindfulness e Produtividade",
        description: "Técnicas de meditação para melhorar foco e concentração",
        category: "bem-estar",
        difficulty: "beginner",
        estimatedTime: 4,
        trending: true,
        tags: ["meditação", "foco", "produtividade"],
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "Comunicação Assertiva",
        description: "Desenvolva habilidades de comunicação para vida pessoal e profissional",
        category: "soft-skills",
        difficulty: "intermediate",
        estimatedTime: 6,
        trending: false,
        tags: ["comunicação", "liderança", "relacionamentos"],
        createdAt: new Date(),
      },
      {
        id: 5,
        title: "Programação Python para Iniciantes",
        description: "Aprenda a programar do zero com a linguagem mais popular",
        category: "tecnologia",
        difficulty: "beginner",
        estimatedTime: 20,
        trending: true,
        tags: ["python", "programação", "desenvolvimento"],
        createdAt: new Date(),
      },
    ];

    suggestions.forEach(suggestion => {
      this.contentSuggestions.set(suggestion.id, suggestion);
    });

    this.currentId = 6;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { 
      id: this.currentId++, 
      ...insertUser,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Learning Paths
  async getLearningPathsByUserId(userId: number): Promise<LearningPath[]> {
    return Array.from(this.learningPaths.values()).filter(path => path.userId === userId);
  }

  async getLearningPath(id: number): Promise<LearningPath | undefined> {
    return this.learningPaths.get(id);
  }

  async createLearningPath(insertPath: InsertLearningPath): Promise<LearningPath> {
    const path: LearningPath = { 
      id: this.currentId++, 
      ...insertPath,
      createdAt: new Date(),
    };
    this.learningPaths.set(path.id, path);
    return path;
  }

  async updateLearningPath(id: number, updates: Partial<LearningPath>): Promise<LearningPath | undefined> {
    const path = this.learningPaths.get(id);
    if (!path) return undefined;
    
    const updatedPath = { ...path, ...updates };
    this.learningPaths.set(id, updatedPath);
    return updatedPath;
  }

  async deleteLearningPath(id: number): Promise<boolean> {
    return this.learningPaths.delete(id);
  }

  // Learning Sessions
  async getLearningSessionsByPathId(pathId: number): Promise<LearningSession[]> {
    return Array.from(this.learningSessions.values()).filter(session => session.pathId === pathId);
  }

  async getLearningSessionsByUserId(userId: number): Promise<LearningSession[]> {
    return Array.from(this.learningSessions.values()).filter(session => session.userId === userId);
  }

  async createLearningSession(insertSession: InsertLearningSession): Promise<LearningSession> {
    const session: LearningSession = { 
      id: this.currentId++, 
      ...insertSession,
      createdAt: new Date(),
    };
    this.learningSessions.set(session.id, session);
    return session;
  }

  async updateLearningSession(id: number, updates: Partial<LearningSession>): Promise<LearningSession | undefined> {
    const session = this.learningSessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.learningSessions.set(id, updatedSession);
    return updatedSession;
  }

  // User Materials
  async getUserMaterialsByUserId(userId: number): Promise<UserMaterial[]> {
    return Array.from(this.userMaterials.values()).filter(material => material.userId === userId);
  }

  async createUserMaterial(insertMaterial: InsertUserMaterial): Promise<UserMaterial> {
    const material: UserMaterial = { 
      id: this.currentId++, 
      ...insertMaterial,
      createdAt: new Date(),
    };
    this.userMaterials.set(material.id, material);
    return material;
  }

  async updateUserMaterial(id: number, updates: Partial<UserMaterial>): Promise<UserMaterial | undefined> {
    const material = this.userMaterials.get(id);
    if (!material) return undefined;
    
    const updatedMaterial = { ...material, ...updates };
    this.userMaterials.set(id, updatedMaterial);
    return updatedMaterial;
  }

  async deleteUserMaterial(id: number): Promise<boolean> {
    return this.userMaterials.delete(id);
  }

  // Study Reminders
  async getStudyRemindersByUserId(userId: number): Promise<StudyReminder[]> {
    return Array.from(this.studyReminders.values()).filter(reminder => reminder.userId === userId);
  }

  async createStudyReminder(insertReminder: InsertStudyReminder): Promise<StudyReminder> {
    const reminder: StudyReminder = { 
      id: this.currentId++, 
      ...insertReminder,
      createdAt: new Date(),
    };
    this.studyReminders.set(reminder.id, reminder);
    return reminder;
  }

  async updateStudyReminder(id: number, updates: Partial<StudyReminder>): Promise<StudyReminder | undefined> {
    const reminder = this.studyReminders.get(id);
    if (!reminder) return undefined;
    
    const updatedReminder = { ...reminder, ...updates };
    this.studyReminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteStudyReminder(id: number): Promise<boolean> {
    return this.studyReminders.delete(id);
  }

  // Achievements
  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const achievement: Achievement = { 
      id: this.currentId++, 
      ...insertAchievement,
      earnedAt: new Date(),
    };
    this.achievements.set(achievement.id, achievement);
    return achievement;
  }

  // Content Suggestions
  async getContentSuggestions(category?: string, trending?: boolean): Promise<ContentSuggestion[]> {
    let suggestions = Array.from(this.contentSuggestions.values());
    
    if (category) {
      suggestions = suggestions.filter(s => s.category === category);
    }
    
    if (trending !== undefined) {
      suggestions = suggestions.filter(s => s.trending === trending);
    }
    
    return suggestions;
  }

  async createContentSuggestion(insertSuggestion: InsertContentSuggestion): Promise<ContentSuggestion> {
    const suggestion: ContentSuggestion = { 
      id: this.currentId++, 
      ...insertSuggestion,
      createdAt: new Date(),
    };
    this.contentSuggestions.set(suggestion.id, suggestion);
    return suggestion;
  }

  // Progress Analytics
  async getProgressAnalyticsByUserId(userId: number, days?: number): Promise<ProgressAnalytics[]> {
    let analytics = Array.from(this.progressAnalytics.values()).filter(a => a.userId === userId);
    
    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      analytics = analytics.filter(a => a.date >= cutoffDate);
    }
    
    return analytics.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createProgressAnalytics(insertAnalytics: InsertProgressAnalytics): Promise<ProgressAnalytics> {
    const analytics: ProgressAnalytics = { 
      id: this.currentId++, 
      ...insertAnalytics,
      date: new Date(),
    };
    this.progressAnalytics.set(analytics.id, analytics);
    return analytics;
  }
}

export const eduStorage = new EduMemStorage();