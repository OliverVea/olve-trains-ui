var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_BASE = 'http://localhost:5000';
const LOG_PARENT_ID = 'log-parent';
import { LogLevel } from './api/logMessage.js';
/** Convert a raw log JSON object into a typed {@link LogMessage}. */
function parseLog(item) {
    var _a, _b, _c;
    return {
        level: item.level,
        message: item.message,
        sourcePath: (_a = item.sourcePath) !== null && _a !== void 0 ? _a : null,
        sourceLine: (_b = item.sourceLine) !== null && _b !== void 0 ? _b : null,
        time: item.time,
        tags: (_c = item.tags) !== null && _c !== void 0 ? _c : null,
    };
}
function formatLog(log) {
    const timestamp = new Date(log.time).toISOString();
    const level = LogLevel[log.level];
    return `[${timestamp}] [${level}]: ${log.message}`;
}
function fetchLogMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${API_BASE}/logs`);
        if (!resp.ok)
            throw new Error(`Fetch logs failed: ${resp.status}`);
        const data = yield resp.json();
        return data.map(parseLog);
    });
}
function renderLogs() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById(LOG_PARENT_ID);
        container.innerHTML = '<h2>Server Logs</h2>';
        try {
            const logs = yield fetchLogMessages();
            logs.forEach(log => {
                const entry = document.createElement('div');
                entry.className = `log-entry log-${LogLevel[log.level]}`;
                entry.textContent = formatLog(log);
                container.appendChild(entry);
            });
        }
        catch (err) {
            const errDiv = document.createElement('div');
            errDiv.className = 'log-error';
            errDiv.textContent = `Error loading logs: ${err.message}`;
            container.appendChild(errDiv);
        }
    });
}
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`${API_BASE}/command/${encodeURIComponent(command)}`);
        const text = resp.ok
            ? `✅ Command "${command}" succeeded`
            : `❌ Command "${command}" failed (${resp.status})`;
        return { ok: resp.ok, message: text, body: yield resp.text() };
    });
}
function setupCommandRunner() {
    const input = document.getElementById('command-input');
    const button = document.getElementById('command-send');
    const output = document.getElementById('command-response');
    button.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        const cmd = input.value.trim();
        if (!cmd)
            return;
        button.disabled = true;
        output.textContent = 'Running…';
        try {
            const { ok, message } = yield runCommand(cmd);
            output.textContent = message;
            if (ok) {
                input.value = '';
                yield renderLogs();
            }
        }
        catch (err) {
            output.textContent = `Error: ${err.message}`;
        }
        finally {
            button.disabled = false;
        }
    }));
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
}
else {
    renderLogs();
    setupCommandRunner();
}
