import { expect, test } from '@playwright/test';

const go = (route: string) => route.replace(/^\//, '');

test('fvd scoring updates in the workbench', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Workbench is interactive');
  await page.goto(go('/studio/strategy/fvd/'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('fvd-status')).toBeVisible();
  const slider = page.getByTestId('fvd-viability');
  await slider.evaluate((element: HTMLInputElement) => {
    element.value = '80';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(page.getByTestId('fvd-status')).toContainText(/Proceed with caution/i);
});

test('business model simulator recomputes and saves scenarios', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Business simulator is interactive');
  await page.goto(go('/studio/business-model/'));
  await page.getByTestId('business-input-clientCount').first().fill('120');
  await expect(page.getByTestId('metric-annual-revenue')).toBeVisible();
  await page.getByTestId('save-business-scenario').click();
  await page.goto(go('/workspace/'));
  await expect(page.getByText(/Business scenarios/i)).toBeVisible();
});
