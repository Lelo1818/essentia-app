import { apiRequest } from "@/lib/queryClient";

export interface CreateUserRequest {
  name: string;
  email: string;
  initials?: string;
  role?: string;
}

export interface UpdateProgressRequest {
  userId: number;
  appType: 'flow' | 'edu' | 'purpose';
  data: Record<string, any>;
}

export interface AddInsightRequest {
  userId: number;
  type: 'breakthrough' | 'challenge' | 'growth';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

export interface RecordSessionRequest {
  userId: number;
  sessionType: 'course' | 'quiz' | 'practice';
  duration: number;
  topic: string;
  score?: number;
  completed: boolean;
}

// User operations
export const createUser = async (userData: CreateUserRequest) => {
  return await apiRequest('/api/ecosystem/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getUserStats = async (userId: number) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/stats`);
};

export const getUser = async (userId: number) => {
  return await apiRequest(`/api/ecosystem/user/${userId}`);
};

// Learning sessions
export const recordLearningSession = async (sessionData: RecordSessionRequest) => {
  return await apiRequest('/api/ecosystem/learning-sessions', {
    method: 'POST',
    body: JSON.stringify(sessionData),
  });
};

export const getLearningHistory = async (userId: number, limit = 10) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/learning-history?limit=${limit}`);
};

// Purpose insights
export const addPurposeInsight = async (insightData: AddInsightRequest) => {
  return await apiRequest('/api/ecosystem/purpose-insights', {
    method: 'POST',
    body: JSON.stringify(insightData),
  });
};

export const getPurposeInsights = async (userId: number, limit = 10) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/purpose-insights?limit=${limit}`);
};

// Progress updates
export const updateFlowProgress = async (userId: number, data: any) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/flow`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updateEduProgress = async (userId: number, data: any) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/edu`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const updatePurposeProgress = async (userId: number, data: any) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/purpose`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Achievements
export const addAchievement = async (achievementData: {
  userId: number;
  appType: string;
  achievementType: string;
  title: string;
  description: string;
}) => {
  return await apiRequest('/api/ecosystem/achievements', {
    method: 'POST',
    body: JSON.stringify(achievementData),
  });
};

export const getUserAchievements = async (userId: number) => {
  return await apiRequest(`/api/ecosystem/user/${userId}/achievements`);
};