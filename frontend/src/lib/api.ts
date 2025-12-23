import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface HealthResponse {
  status: string;
  message: string;
}

export interface AnalyzeRequest {
  query: string;
}

export interface AnalyzeResponse {
  sql: string;
  columns: string[];
  rows: Record<string, unknown>[];
  row_count: number;
  execution_time_ms: number;
}

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await api.get<HealthResponse>('/health');
  return response.data;
};

export const fetchRawData = async (): Promise<unknown[]> => {
  const response = await api.get('/api/data');
  return response.data;
};

export const analyzeQuery = async (query: string): Promise<AnalyzeResponse> => {
  const response = await api.post<AnalyzeResponse>('/api/analyze', { query });
  return response.data;
};
