import { getApiClient } from '../api/client.js';
import type { LogMessage } from '../api/logMessage';
import type { ApiError } from '../api/error';

/** Retrieve recent log messages from the backend. */
export async function fetchLogs(): Promise<LogMessage[] | ApiError[]> {
  const client = getApiClient();
  try {
    const result = await client.logs.get();
    return result ?? [];
  } catch (err) {
    return err as ApiError[];
  }
}
