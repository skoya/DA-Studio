import { expect, test } from '@playwright/test';

const go = (route: string) => route.replace(/^\//, '');

test('simulation flow updates and saves state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js' || testInfo.project.name === 'chromium-basepath', 'Covered by JS-enabled root projects and separate base-path route coverage');
  await page.goto(go('/simulate/tokenized-fund-subscription/'));
  await page.getByTestId('simulation-jurisdiction').selectOption('sg');
  await page.getByText('Wallet not whitelisted').click();
  await page.getByTestId('save-simulation').click();
  await expect(page.getByTestId('simulation-save-status')).toContainText('Saved');
});

test('simulation export triggers download', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Simulation export is interactive');
  await page.goto(go('/simulate/native-crypto-lifecycle/'));
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export-simulation').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('native-crypto-lifecycle');
});
