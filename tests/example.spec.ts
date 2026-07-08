import { test, expect } from '@playwright/test';

test('has correct homepage title', async ({ page }) => {
  // Test local homepage
  await page.goto('/');

  // Expect a title to contain "Botmartz".
  await expect(page).toHaveTitle(/Botmartz/);
});

test('can navigate to services and click sub-pages', async ({ page }) => {
  // Go to services page
  await page.goto('/services');

  // Verify that the services header is visible
  await expect(page.locator('h1')).toBeVisible();

  // Navigate directly to AI Solutions sub-page
  await page.goto('/services/ai-solutions');
  await expect(page.locator('h1')).toContainText(/AI Solutions/i);

  // Navigate directly to Web Development sub-page
  await page.goto('/services/web-development');
  await expect(page.locator('h1')).toContainText(/Web/i);
});

test('blog page loads successfully', async ({ page }) => {
  // Go to public blog page
  await page.goto('/blog');

  // Check that the main heading is visible
  await expect(page.locator('h1')).toBeVisible();
});
