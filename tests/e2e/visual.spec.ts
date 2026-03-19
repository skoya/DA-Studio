import { expect, test } from '@playwright/test';

test('visual regression for home and business model views', async ({ page, browserName }, testInfo) => {
  test.skip(browserName !== 'chromium' || testInfo.project.name !== 'chromium-root', 'Keep visual baseline stable on Chromium root only');
  await page.goto('/');
  await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
  await page.goto('/studio/business-model/');
  await expect(page).toHaveScreenshot('business-model-page.png', { fullPage: true });
});
