import { expect, test } from '@playwright/test';

const go = (route: string) => route.replace(/^\//, '');

test('major routes load', async ({ page }) => {
  const routes =
    test.info().project.name === 'no-js'
      ? ['/', '/start/', '/learn/', '/markets/', '/networks/', '/controls/', '/sources/', '/releases/']
      : ['/', '/start/', '/learn/', '/markets/', '/networks/', '/controls/', '/simulate/', '/studio/', '/workspace/', '/sources/', '/releases/'];

  for (const route of routes) {
    await page.goto(go(route));
    await expect(page.locator('h1').first()).toBeVisible();
  }
});

test('404 route behaves', async ({ page }) => {
  await page.goto(go('/missing-route/'));
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});

test('no-js reading flow still works', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'no-js', 'Only relevant in the no-JS project');
  await page.goto(go('/learn/'));
  await expect(page.getByRole('heading', { name: /Concepts with layered depth/i })).toBeVisible();
  await expect(page.getByText('Native crypto exposure')).toBeVisible();
});
