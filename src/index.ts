const API_BASE = 'http://localhost:5000';
const LOG_PARENT_ID = 'log-parent';

import { LogMessage, LogLevel } from './api/logMessage';

/** Convert a raw log JSON object into a typed {@link LogMessage}. */
function parseLog(item: any): LogMessage {
  return {
    level: item.level as LogLevel,
    message: item.message as string,
    sourcePath: item.sourcePath ?? null,
    sourceLine: item.sourceLine ?? null,
    time: item.time as string,
    tags: item.tags ?? null,
  };
}

function formatLog(log: LogMessage): string {
  const timestamp = new Date(log.time).toISOString();
  const level = LogLevel[log.level];
  return `[${timestamp}] [${level}]: ${log.message}`;
}

async function fetchLogMessages(): Promise<LogMessage[]> {
  const resp = await fetch(`${API_BASE}/logs`);
  if (!resp.ok) throw new Error(`Fetch logs failed: ${resp.status}`);
  const data: any[] = await resp.json();
  return data.map(parseLog);
}

async function renderLogs(): Promise<void> {
  const container = document.getElementById(LOG_PARENT_ID)!;
  container.innerHTML = '<h2>Server Logs</h2>';
  try {
    const logs = await fetchLogMessages();
    logs.forEach(log => {
      const entry = document.createElement('div');
      entry.className = `log-entry log-${LogLevel[log.level]}`;
      entry.textContent = formatLog(log);
      container.appendChild(entry);
    });
  } catch (err) {
    const errDiv = document.createElement('div');
    errDiv.className = 'log-error';
    errDiv.textContent = `Error loading logs: ${(err as Error).message}`;
    container.appendChild(errDiv);
  }
}

async function runCommand(command: string): Promise<{ ok: boolean; message: string; body: string }> {
  const resp = await fetch(`${API_BASE}/command/${encodeURIComponent(command)}`);
  const text = resp.ok
    ? `✅ Command "${command}" succeeded`
    : `❌ Command "${command}" failed (${resp.status})`;
  return { ok: resp.ok, message: text, body: await resp.text() };
}

function setupCommandRunner(): void {
  const input = document.getElementById('command-input') as HTMLInputElement;
  const button = document.getElementById('command-send') as HTMLButtonElement;
  const output = document.getElementById('command-response') as HTMLElement;

  button.addEventListener('click', async () => {
    const cmd = input.value.trim();
    if (!cmd) return;
    button.disabled = true;
    output.textContent = 'Running…';
    try {
      const { ok, message } = await runCommand(cmd);
      output.textContent = message;
      if (ok) {
        input.value = '';
        await renderLogs();
      }
    } catch (err) {
      output.textContent = `Error: ${(err as Error).message}`;
    } finally {
      button.disabled = false;
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      button.click();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderLogs();
    setupCommandRunner();
  });
} else {
  renderLogs();
  setupCommandRunner();
}
