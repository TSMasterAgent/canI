import { test, expect } from '@playwright/test';

test.describe('Project Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should create a new project', async ({ page }) => {
    const projectName = `Test Project ${Date.now()}`;
    const targetUrl = 'https://example.com';

    await page.getByLabel('Project Name').fill(projectName);
    await page.getByLabel('Target URL').fill(targetUrl);
    await page.getByRole('button', { name: 'Create Project' }).click();

    // Verify project appears in list
    await expect(page.getByRole('cell', { name: projectName })).toBeVisible();
    await expect(page.getByRole('cell', { name: targetUrl })).toBeVisible();
  });

  test('should select a project and view details', async ({ page }) => {
    // Wait for list to load
    await expect(page.getByText('Projects')).toBeVisible();
    
    // Assuming at least one project exists or we create one
    const projectName = `View Test ${Date.now()}`;
    await page.getByLabel('Project Name').fill(projectName);
    await page.getByLabel('Target URL').fill('https://test.com');
    await page.getByRole('button', { name: 'Create Project' }).click();

    // Find the 'View' button for our new project
    const row = page.getByRole('row', { name: projectName });
    await row.getByRole('button', { name: 'View' }).click();

    // Verify sections related to the project are shown
    await expect(page.getByText('Test Case Review')).toBeVisible();
    await expect(page.getByText('Execution Monitor')).toBeVisible();
  });
});
