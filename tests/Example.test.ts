import { test, expect } from '@playwright/test';
import { exportedConst } from '../ESModule';

// The following will work because we import from commonjs module
// import { exportedConst } from '../CommonJSModule';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
  expect(exportedConst).toBe('foo');
});
