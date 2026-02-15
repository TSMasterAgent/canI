import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/canI/);
});

test('can create a project', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByLabel('Project Name').fill('Test Project');
  await page.getByLabel('Target URL').fill('http://example.com');
  await page.getByRole('button', { name: 'Create Project' }).click();

  await expect(page.getByText('Test Project')).toBeVisible();
});
