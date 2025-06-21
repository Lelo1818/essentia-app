import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUserStats, 
  recordLearningSession, 
  addPurposeInsight,
  updateEduProgress,
  updatePurposeProgress,
  addAchievement,
  type RecordSessionRequest,
  type AddInsightRequest
} from '@/lib/ecosystem-api';

export function useEcosystemUser(userId: number) {
  const queryClient = useQueryClient();

  // Get user stats
  const { data: userStats, isLoading } = useQuery({
    queryKey: ['ecosystem-stats', userId],
    queryFn: () => getUserStats(userId),
    enabled: !!userId,
  });

  // Record learning session
  const recordSession = useMutation({
    mutationFn: recordLearningSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ecosystem-stats', userId] });
    },
  });

  // Add purpose insight
  const addInsight = useMutation({
    mutationFn: addPurposeInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ecosystem-stats', userId] });
    },
  });

  // Update progress
  const updateProgress = useMutation({
    mutationFn: async ({ appType, data }: { appType: 'edu' | 'purpose'; data: any }) => {
      if (appType === 'edu') {
        return updateEduProgress(userId, data);
      } else {
        return updatePurposeProgress(userId, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ecosystem-stats', userId] });
    },
  });

  // Add achievement
  const unlockAchievement = useMutation({
    mutationFn: addAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ecosystem-stats', userId] });
    },
  });

  // Helper functions for common actions
  const completeLesson = async (topic: string, duration: number, score?: number) => {
    await recordSession.mutateAsync({
      userId,
      sessionType: 'course',
      duration,
      topic,
      score,
      completed: true,
    });

    // Update streak and hours
    if (userStats?.edu) {
      await updateProgress.mutateAsync({
        appType: 'edu',
        data: {
          streak: userStats.edu.streak + 1,
          hoursStudied: userStats.edu.hoursStudied + Math.floor(duration / 60),
        }
      });
    }

    // Check for achievements
    if (score && score >= 90) {
      await unlockAchievement.mutateAsync({
        userId,
        appType: 'edu',
        achievementType: 'high_score',
        title: 'Excelência Acadêmica',
        description: 'Obteve nota 90+ em uma lição',
      });
    }
  };

  const addBreakthrough = async (title: string, description: string) => {
    await addInsight.mutateAsync({
      userId,
      type: 'breakthrough',
      title,
      description,
      impact: 'high',
    });

    // Update insights count
    if (userStats?.purpose) {
      await updateProgress.mutateAsync({
        appType: 'purpose',
        data: {
          insightsGained: userStats.purpose.insightsGained + 1,
          journeyProgress: Math.min(userStats.purpose.journeyProgress + 5, 100),
        }
      });
    }
  };

  const completeRitual = async (ritualName: string) => {
    if (userStats?.purpose) {
      await updateProgress.mutateAsync({
        appType: 'purpose',
        data: {
          ritualsCompleted: userStats.purpose.ritualsCompleted + 1,
          journeyProgress: Math.min(userStats.purpose.journeyProgress + 2, 100),
        }
      });

      await unlockAchievement.mutateAsync({
        userId,
        appType: 'purpose',
        achievementType: 'ritual_master',
        title: 'Praticante Dedicado',
        description: `Completou o ritual: ${ritualName}`,
      });
    }
  };

  return {
    userStats,
    isLoading,
    completeLesson,
    addBreakthrough,
    completeRitual,
    recordSession: recordSession.mutateAsync,
    addInsight: addInsight.mutateAsync,
    updateProgress: updateProgress.mutateAsync,
    unlockAchievement: unlockAchievement.mutateAsync,
  };
}