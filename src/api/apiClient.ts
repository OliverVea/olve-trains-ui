import { LogMessage } from './logMessage';
import { ApiError } from './error';
import { Success } from './success';

const API_BASE = 'http://localhost:5000';

async function fetchApi<T>(path: string): Promise<T | ApiError[]> {
  const resp = await fetch(`${API_BASE}${path}`);
  const text = await resp.text();
  if (!resp.ok) {
    try {
      return JSON.parse(text) as ApiError[];
    } catch {
      return [
        {
          message: text,
          tags: [],
          severity: 0,
          args: [],
          source: null,
          exception: null,
          originInformation: null,
        },
      ];
    }
  }
  return JSON.parse(text) as T;
}

async function fetchApiVoid(path: string): Promise<Success | ApiError[]> {
  const resp = await fetch(`${API_BASE}${path}`);
  if (!resp.ok) {
    const text = await resp.text();
    try {
      return JSON.parse(text) as ApiError[];
    } catch {
      return [
        {
          message: text,
          tags: [],
          severity: 0,
          args: [],
          source: null,
          exception: null,
          originInformation: null,
        },
      ];
    }
  }
  return { success: true };
}

export async function getLogs(): Promise<LogMessage[] | ApiError[]> {
  return fetchApi<LogMessage[]>('/logs');
}

export async function sendCommand(cmd: string): Promise<Success | ApiError[]> {
  return fetchApiVoid(`/command/${encodeURIComponent(cmd)}`);
}
