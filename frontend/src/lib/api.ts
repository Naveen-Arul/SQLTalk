import axios from 'axios';

const defaultApiBaseUrl = 'http://localhost:5000';

const normalizeApiBaseUrl = (value: string | undefined) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return defaultApiBaseUrl;
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmedValue)) {
    return trimmedValue.replace(/\/+$/, '');
  }

  return `https://${trimmedValue.replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const getApiBaseUrl = () => API_BASE_URL;

type ApiErrorWithFlags = Error & {
  isSecurityIssue?: boolean;
  isConnectionError?: boolean;
};

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
      const responseData = error.response.data;
      const errorResponse =
        responseData && typeof responseData === 'object'
          ? (responseData as Partial<AnalyzeErrorResponse>)
          : undefined;

      if (errorResponse?.securityIssue) {
        // Create a specific error for security issues
        const securityError = new Error(errorResponse.message || 'Security restriction');
        const flaggedSecurityError = securityError as ApiErrorWithFlags;
        flaggedSecurityError.isSecurityIssue = true;
        throw flaggedSecurityError;
      }

      if (typeof responseData === 'string' && responseData.trim()) {
        throw new Error(responseData.trim());
      }

      const fallbackMessage =
        errorResponse?.message ||
        error.response.statusText ||
        `Request failed with status ${error.response.status}`;

      const fallbackErrorLabel = errorResponse?.error || 'Backend error';
      throw new Error(`${fallbackErrorLabel}: ${fallbackMessage}`);
    }
    // For network/timeout errors, throw a connection error
    if (axios.isAxiosError(error)) {
      const connectionError = new Error('Connection error: Unable to reach the backend server');
      const flaggedConnectionError = connectionError as ApiErrorWithFlags;
      flaggedConnectionError.isConnectionError = true;
      throw flaggedConnectionError;
    }
    throw error;
  }
};
