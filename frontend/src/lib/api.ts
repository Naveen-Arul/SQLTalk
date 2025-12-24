import axios from 'axios';

let API_BASE_URL = 'http://localhost:5000';

// In production, use the environment variable or construct from window.location
if (typeof window !== 'undefined') {
  if (import.meta.env.VITE_API_BASE_URL) {
    API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  } else if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // In production, use the same protocol and host as the frontend
    API_BASE_URL = `${window.location.protocol}//${window.location.host}`;
  }
} else {
  // For server-side rendering or build time
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
}

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

export interface AnalyzeErrorResponse {
  error: string;
  message: string;
  sql: string;
  securityIssue?: boolean;
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
  try {
    const response = await api.post<AnalyzeResponse>('/api/analyze', { query });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response.data as AnalyzeErrorResponse;
      if (errorResponse.securityIssue) {
        // Create a specific error for security issues
        const securityError = new Error(errorResponse.message);
        (securityError as any).isSecurityIssue = true;
        throw securityError;
      }
      throw new Error(`${errorResponse.error}: ${errorResponse.message}`);
    }
    // For network/timeout errors, throw a connection error
    if (axios.isAxiosError(error)) {
      const connectionError = new Error('Connection error: Unable to reach the backend server');
      (connectionError as any).isConnectionError = true;
      throw connectionError;
    }
    throw error;
  }
};
