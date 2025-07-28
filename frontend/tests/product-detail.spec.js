import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  const productId = 'ABC123-Samsung-Galaxy-A55';
  const productUrl = `/${productId}`;

  test('should display product details correctly after loading', async ({ page }) => {
    await page.goto(productUrl);

    // Expect the loading spinner to disappear
    await expect(page.locator('.animate-spin')).not.toBeVisible();

    // Assert product title
    await expect(page.locator('h1.text-xl')).toHaveText('Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM');

    // Assert product price
    await expect(page.locator('div.flex.items-baseline span.text-3xl')).toHaveText('US$ 439');

    // Assert characteristics presence
    await expect(page.locator('h2.text-2xl.font-light.text-gray-700.mb-6')).toHaveText('Características del producto');
    await expect(page.locator('div.grid.grid-cols-1.md\\:grid-cols-2 p.font-semibold').first()).toContainText('Tamaño de la pantalla');
  });

  test('should display loading state', async ({ page }) => {
    // Intercept the product data request to simulate a delay
    await page.route('**/api/items/*', route => {
      setTimeout(() => route.continue(), 2000);
    });

    await page.goto(productUrl);

    // Expect the loading spinner to be visible
    await expect(page.locator('.animate-spin')).toBeVisible();

    // Wait for the data to load and spinner to disappear
    await expect(page.locator('.animate-spin')).not.toBeVisible();
    await expect(page.locator('h1.text-xl')).toBeVisible(); // Ensure content is loaded
  });

  test('should display error message on API failure', async ({ page }) => {
    // Intercept the product data request to simulate an error
    await page.route('**/api/items/*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Product not found' }),
      });
    });

    await page.goto(productUrl);

    // Expect the loading spinner to disappear
    await expect(page.locator('.animate-spin')).not.toBeVisible();

    // Assert error message is displayed
    await expect(page.locator('div.text-center.text-red-500.mt-10')).toHaveText('Error: HTTP error! status: 500');
  });
});