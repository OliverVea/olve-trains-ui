// index.js
const API_BASE     = 'http://localhost:5000';
const LOG_PARENT_ID = 'log-parent';


/*
{
    "level": 1,
    "message": "Executing command: 'echo hi'",
    "sourcePath": null,
    "sourceLine": null,
    "time": "2025-07-05T15:36:55.1942097+09:00",
    "tags": null
}
*/

class LogMessage {

  constructor(message, level, time) {
    this.message   = message;
    this.level     = level;
    this.timestamp = time ? new Date(time) : new Date();
  }
  toString() {
    return `[${this.timestamp.toISOString()}] [${this.level}]: ${this.message}`;
  }
}

async function fetchLogMessages() {
  const resp = await fetch(`${API_BASE}/logs`);
  if (!resp.ok) throw new Error(`Fetch logs failed: ${resp.status}`);
  const data = await resp.json();
  return data.map(item => new LogMessage(item.message, item.level, item.time));
}

async function renderLogs() {
  const container = document.getElementById(LOG_PARENT_ID);
  container.innerHTML = '<h2>Server Logs</h2>'; // reset
  try {
    const logs = await fetchLogMessages();
    logs.forEach(log => {
      const entry = document.createElement('div');
      entry.className = `log-entry log-${log.level}`;
      entry.textContent = log.toString();
      container.appendChild(entry);
    });
  } catch (err) {
    const errDiv = document.createElement('div');
    errDiv.className = 'log-error';
    errDiv.textContent = `Error loading logs: ${err.message}`;
    container.appendChild(errDiv);
  }
}

async function runCommand(command) {
  const resp = await fetch(
    `${API_BASE}/command/${encodeURIComponent(command)}`
  );
  const text = resp.ok
    ? `✅ Command "${command}" succeeded`
    : `❌ Command "${command}" failed (${resp.status})`;
  return { ok: resp.ok, message: text, body: await resp.text() };
}

function setupCommandRunner() {
  const input   = document.getElementById('command-input');
  const button  = document.getElementById('command-send');
  const output  = document.getElementById('command-response');

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
        await renderLogs();      // refresh logs on success
      }
    } catch (err) {
      output.textContent = `Error: ${err.message}`;
    } finally {
      button.disabled = false;
    }
  });

  // allow Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      button.click();
    }
  });
}

// wire it all up on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderLogs();
    setupCommandRunner();
  });
} else {
  renderLogs();
  setupCommandRunner();
}
