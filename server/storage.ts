import { 
  users, achievements,
  type User, type InsertUser,
  type Achievement, type InsertAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Achievements
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
}

class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private achievements = new Map<number, Achievement>();
  private currentId = 1;

  constructor() {
    this.users = new Map();
    this.achievements = new Map();
    this.currentId = 1;
    this.seedUsers();
  }

  private seedUsers() {
    const usersData = [
      { name: "Daniel Allegri", email: "daniel.allegri@venture.com" },
      { name: "Rafael Santos", email: "rafael.santos@gmail.com" },
      { name: "Carlos Santos", email: "carlos.santos@outlook.com" }
    ];

    usersData.forEach(userData => {
      const user: User = { 
        id: this.currentId++, 
        name: userData.name,
        email: userData.email,
        initials: userData.name.split(' ').map(n => n[0]).join(''),
        role: 'user',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(user.id, user);
    });

    // Sample achievements
    const achievementsData = [
      { userId: 1, title: "Primeiro Login", description: "Bem-vindo ao Flow Ecosystem!", appType: "flow", achievementType: "milestone", earnedAt: new Date() },
      { userId: 2, title: "Explorador", description: "Visitou todos os apps", appType: "ecosystem", achievementType: "exploration", earnedAt: new Date() },
      { userId: 3, title: "Mestre do Flow", description: "Usou o Flow por 30 dias", appType: "flow", achievementType: "streak", earnedAt: new Date() }
    ];

    achievementsData.forEach(achievementData => {
      const achievement: Achievement = {
        id: this.currentId++,
        ...achievementData
      };
      this.achievements.set(achievement.id, achievement);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.name === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || insertUser.email.split('@')[0],
      initials: insertUser.name ? insertUser.name.split(' ').map(n => n[0]).join('') : insertUser.email.substring(0, 2).toUpperCase(),
      role: 'user',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id,
      description: insertAchievement.description || null,
      earnedAt: insertAchievement.earnedAt || null
    };
    this.achievements.set(id, achievement);
    return achievement;
  }
}

export const storage = new MemStorage();