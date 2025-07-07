import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: [
    {
      command: 'bun run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'dotnet run --project backend/Olve.Trains.UI.Server.csproj',
      url: 'http://localhost:5000',
      reuseExistingServer: !process.env.CI,
    },
  ],
  use: {
    baseURL: 'http://localhost:5173',
  },
});
