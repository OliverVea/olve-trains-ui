import { getLogs } from '../api/apiClient';
import type { LogMessage } from '../api/logMessage';
import type { ApiError } from '../api/error';

/** Retrieve recent log messages from the backend. */
export async function fetchLogs(): Promise<LogMessage[] | ApiError[]> {
  return getLogs();
}
