import { writeFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const go = (route: string) => route.replace(/^\//, '');

test('workspace export and import round-trip', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Workspace import/export is interactive');
  await page.goto(go('/workspace/'));
  await page.locator('textarea').fill('note-one\nnote-two');
  const exportPath = testInfo.outputPath('workspace-export.json');
  const exportHref = await page.getByTestId('workspace-export').getAttribute('href');
  expect(exportHref).toContain('data:application/json');
  const payload = decodeURIComponent((exportHref ?? '').split(',', 2)[1] ?? '');
  await writeFile(exportPath, payload, 'utf8');
  await page.locator('textarea').fill('');
  await page.getByTestId('workspace-import').setInputFiles(exportPath);
  await expect(page.getByTestId('workspace-status')).toContainText('Imported workspace bundle');
  await expect(page.locator('textarea')).toHaveValue(/note-one/);
});

test('legacy workspace import migrates', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'no-js', 'Workspace import/export is interactive');
  await page.goto(go('/workspace/'));
  await page
    .getByTestId('workspace-import')
    .setInputFiles({
      name: 'legacy-workspace.json',
      mimeType: 'application/json',
      buffer: Buffer.from(
        JSON.stringify({
          schemaVersion: 1,
          projects: [],
          simulations: [{ scenarioId: 'native-crypto-lifecycle' }],
          notes: ['legacy note'],
        }),
      ),
    });
  await expect(page.getByText('native-crypto-lifecycle')).toBeVisible();
});
