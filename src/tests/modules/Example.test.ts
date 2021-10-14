import { test, expect } from '@playwright/test';
import { importFromEsModule } from '../../../ESModule';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
  expect(importFromEsModule).toBe('foo');
});
