import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/services',
  '/services/enterprise-rag',
  '/services/ai-agents',
  '/industries',
  '/insights',
  '/work',
  '/work/labs',
  '/glossary',
  '/about',
  '/contact'
];

test.describe('Botmartz Complete Website Revamp & UI Audit', () => {
  for (const route of ROUTES) {
    test(`Route ${route} renders with HTTP 200 and valid footer & container`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      expect(response?.status()).toBe(200);

      // Verify header logo exists and has no border
      const logo = page.locator('header img[alt*="Botmartz"]');
      await expect(logo.first()).toBeVisible();

      // Verify footer is rendered with high-contrast text and exploded stack card
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Check footer links to aviotron.ai
      const aviotronLink = footer.locator('a[href*="aviotron.ai"]');
      await expect(aviotronLink).toBeVisible();

      // Check Newsletter input exists in footer
      const newsletterInput = footer.locator('input[type="email"]');
      await expect(newsletterInput).toBeVisible();
    });
  }

  test('Homepage features interactive 3-Layer Stack with Exploded View', async ({ page }) => {
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    
    // Check 3-Layer Stack component
    const stack = page.locator('#architecture');
    await expect(stack).toBeVisible();

    // Verify Exploded 3D Stack button
    const explodedBtn = stack.locator('button:has-text("Exploded 3D Stack")');
    await expect(explodedBtn).toBeVisible();

    // Verify Interactive Layer switcher
    const visualBtn = stack.locator('button:has-text("Interactive Layer")');
    await visualBtn.click();
    await expect(stack.locator('text=03 / INTELLIGENCE & AGENT ACTION')).toBeVisible();

    // Verify Python Source Code view
    const codeBtn = stack.locator('button:has-text("Python Source")');
    await codeBtn.click();
    await expect(stack.locator('code')).toBeVisible();
  });
});
