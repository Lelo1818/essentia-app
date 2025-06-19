import { 
  users, journeyModules, diaryEntries, purposeMap, reflections, achievements, inspirationContent,
  type User, type InsertUser,
  type JourneyModule, type InsertJourneyModule,
  type DiaryEntry, type InsertDiaryEntry,
  type PurposeMap, type InsertPurposeMap,
  type Reflection, type InsertReflection,
  type Achievement, type InsertAchievement,
  type InspirationContent
} from "../shared/schema-purpose";

export interface IPurposeStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Journey Modules
  getJourneyModulesByUserId(userId: number): Promise<JourneyModule[]>;
  createJourneyModule(module: InsertJourneyModule): Promise<JourneyModule>;
  updateJourneyModule(id: number, updates: Partial<JourneyModule>): Promise<JourneyModule | undefined>;
  
  // Diary Entries
  getDiaryEntriesByUserId(userId: number): Promise<DiaryEntry[]>;
  createDiaryEntry(entry: InsertDiaryEntry): Promise<DiaryEntry>;
  updateDiaryEntry(id: number, updates: Partial<DiaryEntry>): Promise<DiaryEntry | undefined>;
  deleteDiaryEntry(id: number): Promise<boolean>;
  
  // Purpose Map
  getPurposeMapByUserId(userId: number): Promise<PurposeMap | undefined>;
  createPurposeMap(purposeMap: InsertPurposeMap): Promise<PurposeMap>;
  updatePurposeMap(id: number, updates: Partial<PurposeMap>): Promise<PurposeMap | undefined>;
  
  // Reflections
  getReflectionsByUserId(userId: number): Promise<Reflection[]>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Inspiration Content
  getInspirationContent(type?: string, category?: string): Promise<InspirationContent[]>;
}

export class PurposeMemStorage implements IPurposeStorage {
  private users: Map<number, User>;
  private journeyModules: Map<number, JourneyModule>;
  private diaryEntries: Map<number, DiaryEntry>;
  private purposeMaps: Map<number, PurposeMap>;
  private reflections: Map<number, Reflection>;
  private achievements: Map<number, Achievement>;
  private inspirationContent: Map<number, InspirationContent>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.journeyModules = new Map();
    this.diaryEntries = new Map();
    this.purposeMaps = new Map();
    this.reflections = new Map();
    this.achievements = new Map();
    this.inspirationContent = new Map();
    this.currentId = 1;
    
    // Create a default user for development
    this.createUser({
      name: "Sofia",
      email: "sofia@exemplo.com"
    });

    // Seed inspiration content
    this.seedInspirationContent();
  }

  private seedInspirationContent() {
    const inspirations: Omit<InspirationContent, 'id'>[] = [
      {
        type: "quote",
        title: "Propósito Interior",
        content: "O propósito da vida não é ser feliz. É ser útil, honrado, compassivo, fazer alguma diferença que você viveu e viveu bem.",
        author: "Ralph Waldo Emerson",
        category: "propósito",
        isActive: true
      },
      {
        type: "quote",
        title: "Autodescoberta",
        content: "Conheça-te a ti mesmo e conhecerás o universo e os deuses.",
        author: "Oráculo de Delfos",
        category: "autoconhecimento",
        isActive: true
      },
      {
        type: "meditation",
        title: "Respiração para Clareza",
        content: "Respire profundamente por 5 segundos, segure por 3, expire por 7. Repita 10 vezes enquanto se pergunta: 'O que meu coração realmente deseja?'",
        author: "Desperte Seu Propósito",
        category: "meditação",
        isActive: true
      },
      {
        type: "quote",
        title: "Valores Autênticos",
        content: "Seus valores são suas direções mais profundas na vida. Quando você os segue, encontra significado mesmo nas situações mais difíceis.",
        author: "Russ Harris",
        category: "valores",
        isActive: true
      }
    ];

    inspirations.forEach((inspiration) => {
      const id = this.currentId++;
      this.inspirationContent.set(id, { ...inspiration, id });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      level: insertUser.level || 1,
      experience: insertUser.experience || 0,
      currentModule: insertUser.currentModule || "despertar",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Journey Modules
  async getJourneyModulesByUserId(userId: number): Promise<JourneyModule[]> {
    return Array.from(this.journeyModules.values()).filter(module => module.userId === userId);
  }

  async createJourneyModule(insertModule: InsertJourneyModule): Promise<JourneyModule> {
    const id = this.currentId++;
    const module: JourneyModule = { 
      ...insertModule, 
      id,
      createdAt: new Date(),
      completedAt: insertModule.completedAt || null,
      isCompleted: insertModule.isCompleted || false,
      progress: insertModule.progress || 0
    };
    this.journeyModules.set(id, module);
    return module;
  }

  async updateJourneyModule(id: number, updates: Partial<JourneyModule>): Promise<JourneyModule | undefined> {
    const module = this.journeyModules.get(id);
    if (!module) return undefined;
    
    const updatedModule = { ...module, ...updates };
    this.journeyModules.set(id, updatedModule);
    return updatedModule;
  }

  // Diary Entries
  async getDiaryEntriesByUserId(userId: number): Promise<DiaryEntry[]> {
    return Array.from(this.diaryEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createDiaryEntry(insertEntry: InsertDiaryEntry): Promise<DiaryEntry> {
    const id = this.currentId++;
    const entry: DiaryEntry = { 
      ...insertEntry, 
      id,
      createdAt: new Date(),
      tags: insertEntry.tags || [],
      mood: insertEntry.mood || null,
      isPrivate: insertEntry.isPrivate !== undefined ? insertEntry.isPrivate : true
    };
    this.diaryEntries.set(id, entry);
    return entry;
  }

  async updateDiaryEntry(id: number, updates: Partial<DiaryEntry>): Promise<DiaryEntry | undefined> {
    const entry = this.diaryEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, ...updates };
    this.diaryEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteDiaryEntry(id: number): Promise<boolean> {
    return this.diaryEntries.delete(id);
  }

  // Purpose Map
  async getPurposeMapByUserId(userId: number): Promise<PurposeMap | undefined> {
    return Array.from(this.purposeMaps.values()).find(map => map.userId === userId);
  }

  async createPurposeMap(insertPurposeMap: InsertPurposeMap): Promise<PurposeMap> {
    const id = this.currentId++;
    const purposeMap: PurposeMap = { 
      ...insertPurposeMap, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      values: insertPurposeMap.values || null,
      passions: insertPurposeMap.passions || null,
      talents: insertPurposeMap.talents || null,
      mission: insertPurposeMap.mission || null,
      vision: insertPurposeMap.vision || null
    };
    this.purposeMaps.set(id, purposeMap);
    return purposeMap;
  }

  async updatePurposeMap(id: number, updates: Partial<PurposeMap>): Promise<PurposeMap | undefined> {
    const purposeMap = this.purposeMaps.get(id);
    if (!purposeMap) return undefined;
    
    const updatedPurposeMap = { ...purposeMap, ...updates, updatedAt: new Date() };
    this.purposeMaps.set(id, updatedPurposeMap);
    return updatedPurposeMap;
  }

  // Reflections
  async getReflectionsByUserId(userId: number): Promise<Reflection[]> {
    return Array.from(this.reflections.values())
      .filter(reflection => reflection.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const id = this.currentId++;
    const reflection: Reflection = { 
      ...insertReflection, 
      id,
      createdAt: new Date(),
      insights: insertReflection.insights || null
    };
    this.reflections.set(id, reflection);
    return reflection;
  }

  // Achievements
  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      unlockedAt: new Date()
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  // Inspiration Content
  async getInspirationContent(type?: string, category?: string): Promise<InspirationContent[]> {
    let content = Array.from(this.inspirationContent.values()).filter(item => item.isActive);
    
    if (type) {
      content = content.filter(item => item.type === type);
    }
    
    if (category) {
      content = content.filter(item => item.category === category);
    }
    
    return content;
  }
}

export const purposeStorage = new PurposeMemStorage();