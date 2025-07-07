import { getApiClient } from '../api/client.js';
import type { ApiError } from '../api/error';

/** Outcome of attempting to run a server command. */
export interface CommandResult {
  /** True if the command executed successfully. */
  ok: boolean;
  /** Errors returned from the API when not successful. */
  errors?: ApiError[];
}

export async function runCommand(command: string): Promise<CommandResult> {
  const client = getApiClient();
  try {
    await client.runCommand.post({ command });
    return { ok: true };
  } catch (err) {
    return { ok: false, errors: err as ApiError[] };
  }
}
