<script lang="ts">
import { onMount } from 'svelte';
import { LogLevel } from './api/logMessage';
import type { LogMessage } from './api/logMessage';
import { fetchLogs } from './services/logService.js';
import { runCommand as executeCommand } from './services/commandService.js';

/** Optional starting logs for easier testing */
export let initialLogs: LogMessage[] = [];
let logs: LogMessage[] = initialLogs;
let command = '';
let commandResponse = '';

function formatLog(log: LogMessage): string {
  const timestamp = new Date(log.time).toISOString();
  return `[${timestamp}] [${LogLevel[log.level]}]: ${log.message}`;
}

async function loadLogs(): Promise<void> {
  const result = await fetchLogs();
  if (Array.isArray(result) && 'severity' in result[0]) {
    throw new Error(result[0].message);
  }
  logs = result as LogMessage[];
}
export { loadLogs as fetchLogs };

async function runCommand(): Promise<void> {
  const cmd = command.trim();
  if (!cmd) return;
  commandResponse = 'Running…';
  const result = await executeCommand(cmd);
  commandResponse = result.ok
    ? `✅ Command "${cmd}" succeeded`
    : `❌ Command "${cmd}" failed: ${result.errors?.map(e => e.message).join('; ')}`;
  if (result.ok) {
    command = '';
    await loadLogs();
  }
}

onMount(loadLogs);
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
