import type { Express } from "express";
import { createServer, type Server } from "http";
import { eduStorage } from "./storage-edu.js";
import { insertUserSchema, insertLearningPathSchema, insertLearningSessionSchema, insertUserMaterialSchema, insertStudyReminderSchema } from "../shared/schema-edu.js";

export async function registerEduRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/edu/profile", async (req, res) => {
    try {
      const user = await eduStorage.getUser(1); // Default user for demo
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/edu/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertUserSchema.parse(req.body);
      const user = await eduStorage.updateUser(id, validatedData);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Learning Paths routes
  app.get("/api/edu/learning-paths", async (req, res) => {
    try {
      const paths = await eduStorage.getLearningPathsByUserId(1);
      res.json(paths);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/edu/learning-paths", async (req, res) => {
    try {
      const validatedData = insertLearningPathSchema.parse(req.body);
      const path = await eduStorage.createLearningPath(validatedData);
      res.status(201).json(path);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/edu/learning-paths/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const path = await eduStorage.updateLearningPath(id, req.body);
      
      if (!path) {
        return res.status(404).json({ error: "Learning path not found" });
      }
      
      res.json(path);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/edu/learning-paths/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await eduStorage.deleteLearningPath(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Learning path not found" });
      }
      
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Learning Sessions routes
  app.get("/api/edu/learning-sessions", async (req, res) => {
    try {
      const pathId = req.query.pathId ? parseInt(req.query.pathId as string) : undefined;
      
      let sessions;
      if (pathId) {
        sessions = await eduStorage.getLearningSessionsByPathId(pathId);
      } else {
        sessions = await eduStorage.getLearningSessionsByUserId(1);
      }
      
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/edu/learning-sessions", async (req, res) => {
    try {
      const validatedData = insertLearningSessionSchema.parse(req.body);
      const session = await eduStorage.createLearningSession(validatedData);
      res.status(201).json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/edu/learning-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await eduStorage.updateLearningSession(id, req.body);
      
      if (!session) {
        return res.status(404).json({ error: "Learning session not found" });
      }
      
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // User Materials routes
  app.get("/api/edu/materials", async (req, res) => {
    try {
      const materials = await eduStorage.getUserMaterialsByUserId(1);
      res.json(materials);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/edu/materials", async (req, res) => {
    try {
      const validatedData = insertUserMaterialSchema.parse(req.body);
      const material = await eduStorage.createUserMaterial(validatedData);
      res.status(201).json(material);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/edu/materials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const material = await eduStorage.updateUserMaterial(id, req.body);
      
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      
      res.json(material);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/edu/materials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await eduStorage.deleteUserMaterial(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Material not found" });
      }
      
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Study Reminders routes
  app.get("/api/edu/reminders", async (req, res) => {
    try {
      const reminders = await eduStorage.getStudyRemindersByUserId(1);
      res.json(reminders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/edu/reminders", async (req, res) => {
    try {
      const validatedData = insertStudyReminderSchema.parse(req.body);
      const reminder = await eduStorage.createStudyReminder(validatedData);
      res.status(201).json(reminder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/edu/reminders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const reminder = await eduStorage.updateStudyReminder(id, req.body);
      
      if (!reminder) {
        return res.status(404).json({ error: "Reminder not found" });
      }
      
      res.json(reminder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/edu/reminders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await eduStorage.deleteStudyReminder(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Reminder not found" });
      }
      
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Content Suggestions routes
  app.get("/api/edu/suggestions", async (req, res) => {
    try {
      const category = req.query.category as string;
      const trending = req.query.trending === 'true';
      const suggestions = await eduStorage.getContentSuggestions(category, trending);
      res.json(suggestions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Achievements routes
  app.get("/api/edu/achievements", async (req, res) => {
    try {
      const achievements = await eduStorage.getAchievementsByUserId(1);
      res.json(achievements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Progress Analytics routes
  app.get("/api/edu/analytics", async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : undefined;
      const analytics = await eduStorage.getProgressAnalyticsByUserId(1, days);
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create server instance
  const server = createServer(app);
  return server;
}