import api from './api';

export interface Project {
  id: string;
  name: string;
  targetUrl: string;
  status: string;
  createdAt: string;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'SUGGESTED' | 'APPROVED' | 'REJECTED' | 'PASSED' | 'FAILED';
  owasp_mapping: string;
}

export interface ProjectLog {
  id: string;
  projectId: string;
  message: string;
  level: string;
  timestamp: string;
}

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  getProject: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  createProject: async (data: Partial<Project>): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  getTestCases: async (projectId: string): Promise<TestCase[]> => {
    const response = await api.get(`/projects/${projectId}/test-cases`);
    return response.data;
  },
  updateTestCaseStatus: async (testCaseId: string, status: string): Promise<TestCase> => {
    const response = await api.post(`/projects/test-cases/${testCaseId}/status`, { status });
    return response.data;
  },
  executeProject: async (projectId: string): Promise<void> => {
    await api.post(`/projects/${projectId}/execute`);
  },
  getProjectLogs: async (projectId: string): Promise<ProjectLog[]> => {
    const response = await api.get(`/projects/${projectId}/logs`);
    return response.data;
  },
};
