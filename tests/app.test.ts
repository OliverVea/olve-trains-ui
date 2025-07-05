import { screen, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
let renderLogs: () => Promise<void>;

// Setup DOM container similar to index.html
beforeEach(async () => {
  document.body.innerHTML = `
    <section id="log-parent" class="logs-container"></section>
  `;
  ({ renderLogs } = await import('../src/app'));
});

test('renders log entries from fixture', async () => {
  await renderLogs();

  await waitFor(() => {
    expect(screen.getByText(/Started/)).toBeInTheDocument();
    expect(screen.getByText(/Warning message/)).toBeInTheDocument();
  });
});
