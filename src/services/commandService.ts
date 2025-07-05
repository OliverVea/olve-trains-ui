import { sendCommand } from '../api/apiClient';
import type { ApiError } from '../api/error';
import type { Success } from '../api/success';

/** Outcome of attempting to run a server command. */
export interface CommandResult {
  /** True if the command executed successfully. */
  ok: boolean;
  /** Errors returned from the API when not successful. */
  errors?: ApiError[];
}

export async function runCommand(command: string): Promise<CommandResult> {
  const result = await sendCommand(command);
  if ((result as Success).success) {
    return { ok: true };
  }
  return { ok: false, errors: result as ApiError[] };
}
