import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const go = (route: string) => route.replace(/^\//, '');

test('search returns tokenized fund content', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Search panel is client-enhanced');
  await page.goto(go('/'));
  await page.getByLabel('Ask a question or search the studio').fill('tokenized fund');
  await expect(page.getByRole('link', { name: /Tokenized funds/i }).first()).toBeVisible();
});

test('market pack renders warnings and sources', async ({ page }) => {
  await page.goto(go('/markets/sg/'));
  await expect(page.getByRole('heading', { name: 'Singapore' })).toBeVisible();
  await expect(page.getByText(/Project outputs do not remove the need/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Project Guardian/i })).toBeVisible();
});

test('critical pages pass axe in chromium', async ({ page, browserName }, testInfo) => {
  test.skip(browserName !== 'chromium' || testInfo.project.name === 'no-js', 'Run axe on JS-enabled Chromium only');
  await page.goto(go('/markets/eu/'));
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
