import { getApiClient } from '../api/client.js';
import type { ApiError } from '../api/error';

/** Query the backend health check endpoint. */
export async function checkHealth(): Promise<string | ApiError[]> {
  const client = getApiClient();
  try {
    const result = await client.health.get();
    return result ?? '';
  } catch (err) {
    return err as ApiError[];
  }
}
