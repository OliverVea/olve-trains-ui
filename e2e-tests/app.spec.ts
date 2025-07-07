import { test, expect } from '@playwright/test';

// Basic example: run a command and see it appear in logs

test('command logs appear', async ({ page }) => {
  await page.goto('/');
  await page.fill('#command-input', 'hello');
  await page.click('#command-send');

  await expect(page.locator('#command-response')).toContainText('succeeded');
  await expect(page.locator('.log-entry').last()).toContainText('hello');
});
