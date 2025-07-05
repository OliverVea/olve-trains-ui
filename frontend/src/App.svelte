<script lang="ts">
import { onMount } from 'svelte';
import { LogLevel } from './api/logMessage';
import type { LogMessage } from './api/logMessage';

const API_BASE = 'http://localhost:5000';
export let initialLogs: LogMessage[] = [];
let logs: LogMessage[] = initialLogs;
let command = '';
let commandResponse = '';

function formatLog(log: LogMessage): string {
  const timestamp = new Date(log.time).toISOString();
  return `[${timestamp}] [${LogLevel[log.level]}]: ${log.message}`;
}

async function fetchLogs(): Promise<void> {
  const resp = await fetch(`${API_BASE}/logs`);
  if (!resp.ok) throw new Error(`Fetch logs failed: ${resp.status}`);
  const data: any[] = await resp.json();
  logs = data.map((item) => ({
    level: item.level as LogLevel,
    message: item.message as string,
    sourcePath: item.sourcePath ?? null,
    sourceLine: item.sourceLine ?? null,
    time: item.time as string,
    tags: item.tags ?? null,
  }));
}
export { fetchLogs };

async function runCommand(): Promise<void> {
  const cmd = command.trim();
  if (!cmd) return;
  commandResponse = 'Running…';
  const resp = await fetch(`${API_BASE}/command/${encodeURIComponent(cmd)}`);
  commandResponse = resp.ok
    ? `✅ Command "${cmd}" succeeded`
    : `❌ Command "${cmd}" failed (${resp.status})`;
  if (resp.ok) {
    command = '';
    await fetchLogs();
  }
}

onMount(fetchLogs);
</script>

<header>
  <h1>Welcome to My Web Page</h1>
</header>

<section class="logs-container">
  <h2>Server Logs</h2>
  {#if logs.length}
    {#each logs as log}
      <div class="log-entry log-{LogLevel[log.level]}">{formatLog(log)}</div>
    {/each}
  {:else}
    <div>Loading…</div>
  {/if}
</section>

<section class="command-runner">
  <input
    id="command-input"
    type="text"
    bind:value={command}
    placeholder="Enter command…"
    autocomplete="off"
    on:keydown={(e) => e.key === 'Enter' && runCommand()}
  />
  <button id="command-send" on:click={runCommand}>Run</button>
  <div id="command-response" class="command-response">{commandResponse}</div>
</section>
