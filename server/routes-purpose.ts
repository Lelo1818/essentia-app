import type { Express } from "express";
import { createServer, type Server } from "http";
import { purposeStorage } from "./storage-purpose";
import { 
  insertJourneyModuleSchema, insertDiaryEntrySchema, insertPurposeMapSchema, 
  insertReflectionSchema, insertAchievementSchema
} from "../shared/schema-purpose";
import { z } from "zod";

export async function registerPurposeRoutes(app: Express): Promise<Server> {
  // Mock user ID for development (in real app, this would come from authentication)
  const getCurrentUserId = () => 1;

  // User profile route
  app.get("/api/purpose/profile", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const user = await purposeStorage.getUser(userId);
      const modules = await purposeStorage.getJourneyModulesByUserId(userId);
      const achievements = await purposeStorage.getAchievementsByUserId(userId);
      
      res.json({
        user,
        modules,
        achievements,
        progress: {
          currentLevel: user?.level || 1,
          experience: user?.experience || 0,
          currentModule: user?.currentModule || "despertar"
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar perfil" });
    }
  });

  // Journey modules routes
  app.get("/api/purpose/modules", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const modules = await purposeStorage.getJourneyModulesByUserId(userId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar módulos" });
    }
  });

  app.post("/api/purpose/modules", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const validatedData = insertJourneyModuleSchema.parse({ ...req.body, userId });
      const module = await purposeStorage.createJourneyModule(validatedData);
      
      // Award experience for completing modules
      if (validatedData.isCompleted) {
        const user = await purposeStorage.getUser(userId);
        if (user) {
          const newExperience = user.experience + 50;
          const newLevel = Math.floor(newExperience / 100) + 1;
          await purposeStorage.updateUser(userId, { 
            experience: newExperience, 
            level: newLevel 
          });
        }
      }
      
      res.status(201).json(module);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar módulo" });
      }
    }
  });

  app.put("/api/purpose/modules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const module = await purposeStorage.updateJourneyModule(id, updates);
      
      if (module && updates.isCompleted && !module.isCompleted) {
        // Award experience for completing module
        const userId = getCurrentUserId();
        const user = await purposeStorage.getUser(userId);
        if (user) {
          const newExperience = user.experience + 50;
          const newLevel = Math.floor(newExperience / 100) + 1;
          await purposeStorage.updateUser(userId, { 
            experience: newExperience, 
            level: newLevel 
          });
        }
      }
      
      if (module) {
        res.json(module);
      } else {
        res.status(404).json({ message: "Módulo não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar módulo" });
    }
  });

  // Diary entries routes
  app.get("/api/purpose/diary", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const entries = await purposeStorage.getDiaryEntriesByUserId(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar entradas do diário" });
    }
  });

  app.post("/api/purpose/diary", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const validatedData = insertDiaryEntrySchema.parse({ ...req.body, userId });
      const entry = await purposeStorage.createDiaryEntry(validatedData);
      
      // Award experience for diary entries
      const user = await purposeStorage.getUser(userId);
      if (user) {
        const newExperience = user.experience + 10;
        const newLevel = Math.floor(newExperience / 100) + 1;
        await purposeStorage.updateUser(userId, { 
          experience: newExperience, 
          level: newLevel 
        });
      }
      
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar entrada" });
      }
    }
  });

  app.put("/api/purpose/diary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const entry = await purposeStorage.updateDiaryEntry(id, updates);
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).json({ message: "Entrada não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar entrada" });
    }
  });

  app.delete("/api/purpose/diary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await purposeStorage.deleteDiaryEntry(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Entrada não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar entrada" });
    }
  });

  // Purpose map routes
  app.get("/api/purpose/purpose-map", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const purposeMap = await purposeStorage.getPurposeMapByUserId(userId);
      res.json(purposeMap);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar mapa do propósito" });
    }
  });

  app.post("/api/purpose/purpose-map", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const existingMap = await purposeStorage.getPurposeMapByUserId(userId);
      const validatedData = insertPurposeMapSchema.parse({ ...req.body, userId });
      
      let purposeMap;
      if (existingMap) {
        purposeMap = await purposeStorage.updatePurposeMap(existingMap.id, validatedData);
      } else {
        purposeMap = await purposeStorage.createPurposeMap(validatedData);
      }
      
      res.json(purposeMap);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao salvar mapa do propósito" });
      }
    }
  });

  // Reflections routes
  app.get("/api/purpose/reflections", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const reflections = await purposeStorage.getReflectionsByUserId(userId);
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar reflexões" });
    }
  });

  app.post("/api/purpose/reflections", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const validatedData = insertReflectionSchema.parse({ ...req.body, userId });
      const reflection = await purposeStorage.createReflection(validatedData);
      
      // Award experience for reflections
      const user = await purposeStorage.getUser(userId);
      if (user) {
        const newExperience = user.experience + 25;
        const newLevel = Math.floor(newExperience / 100) + 1;
        await purposeStorage.updateUser(userId, { 
          experience: newExperience, 
          level: newLevel 
        });
      }
      
      res.status(201).json(reflection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro ao criar reflexão" });
      }
    }
  });

  // Inspiration content routes
  app.get("/api/purpose/inspiration", async (req, res) => {
    try {
      const { type, category } = req.query;
      const content = await purposeStorage.getInspirationContent(
        type as string, 
        category as string
      );
      
      // Return random selection to keep content fresh
      const shuffled = content.sort(() => 0.5 - Math.random());
      res.json(shuffled.slice(0, 5));
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar conteúdo inspirador" });
    }
  });

  // Achievements routes
  app.get("/api/purpose/achievements", async (req, res) => {
    try {
      const userId = getCurrentUserId();
      const achievements = await purposeStorage.getAchievementsByUserId(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar conquistas" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}