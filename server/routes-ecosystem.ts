import type { Express } from "express";
import { createServer, type Server } from "http";
import { ecosystemStorage } from "./storage-ecosystem";
import { 
  insertUserSchema, 
  insertLearningSessionSchema,
  insertPurposeInsightSchema,
  insertTransactionSchema,
  insertAchievementSchema
} from "../shared/schema";

export async function registerEcosystemRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.get('/api/ecosystem/user/:id', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await ecosystemStorage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  app.post('/api/ecosystem/users', async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await ecosystemStorage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });

  // User stats route
  app.get('/api/ecosystem/user/:id/stats', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const stats = await ecosystemStorage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user stats' });
    }
  });

  // Learning session routes
  app.post('/api/ecosystem/learning-sessions', async (req, res) => {
    try {
      const validatedData = insertLearningSessionSchema.parse(req.body);
      const session = await ecosystemStorage.recordLearningSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ message: 'Invalid session data' });
    }
  });

  app.get('/api/ecosystem/user/:id/learning-history', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 10;
      const history = await ecosystemStorage.getLearningHistory(userId, limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch learning history' });
    }
  });

  // Purpose insights routes
  app.post('/api/ecosystem/purpose-insights', async (req, res) => {
    try {
      const validatedData = insertPurposeInsightSchema.parse(req.body);
      const insight = await ecosystemStorage.addPurposeInsight(validatedData);
      res.status(201).json(insight);
    } catch (error) {
      res.status(400).json({ message: 'Invalid insight data' });
    }
  });

  app.get('/api/ecosystem/user/:id/purpose-insights', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 10;
      const insights = await ecosystemStorage.getPurposeInsights(userId, limit);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch insights' });
    }
  });

  // Transaction routes
  app.post('/api/ecosystem/transactions', async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await ecosystemStorage.addTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: 'Invalid transaction data' });
    }
  });

  app.get('/api/ecosystem/user/:id/transactions', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 20;
      const transactions = await ecosystemStorage.getTransactions(userId, limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch transactions' });
    }
  });

  // Achievement routes
  app.post('/api/ecosystem/achievements', async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await ecosystemStorage.addAchievement(validatedData);
      res.status(201).json(achievement);
    } catch (error) {
      res.status(400).json({ message: 'Invalid achievement data' });
    }
  });

  app.get('/api/ecosystem/user/:id/achievements', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const achievements = await ecosystemStorage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch achievements' });
    }
  });

  // Update routes for each app data
  app.put('/api/ecosystem/user/:id/flow', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const flowData = await ecosystemStorage.updateFlowData(userId, updates);
      res.json(flowData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update flow data' });
    }
  });

  app.put('/api/ecosystem/user/:id/edu', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const eduData = await ecosystemStorage.updateEduData(userId, updates);
      res.json(eduData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update edu data' });
    }
  });

  app.put('/api/ecosystem/user/:id/purpose', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const purposeData = await ecosystemStorage.updatePurposeData(userId, updates);
      res.json(purposeData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update purpose data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}