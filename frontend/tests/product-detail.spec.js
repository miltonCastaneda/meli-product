import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  const productId = 'MLA123456789';
  const productUrl = `/${productId}`;

  test('should display product details correctly after loading', async ({ page }) => {
    await page.goto(productUrl);

    // Expect the loading spinner to disappear
    await expect(page.locator('.animate-spin')).not.toBeVisible();

    // Assert product title
    await expect(page.locator('h1.text-xl')).toHaveText('Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM');

    // Assert product price
    await expect(page.locator('div.flex.items-baseline span.text-3xl')).toHaveText('US$ 439');

    // Assert product condition and sold quantity
    // await expect(page.locator('div.text-xs.text-gray-500.mb-2.flex.items-center')).toContainText('Nuevo | 1500 vendidos');

    // Assert seller name
    // await expect(page.locator('a.text-blue-500.hover\:text-blue-700')).toHaveText('Visita la Tienda oficial de Samsung');

    // // Assert description presence
    // await expect(page.locator('h2.text-2xl.font-light.text-gray-700.mb-4')).toHaveText('Descripción');
    // await expect(page.locator('p.text-gray-600.whitespace-pre-line.text-base')).toContainText('Capacidad y eficiencia');

    // // Assert image gallery presence
    // await expect(page.locator('div.flex-1.flex.items-center.justify-center img').first()).toBeVisible();

    // // Assert key features presence
    // await expect(page.locator('h3.font-semibold.mb-2:has-text("Lo que tienes que saber de este producto")')).toBeVisible();
    // await expect(page.locator('ul.list-disc.list-inside.text-sm.space-y-2.text-gray-600 li').first()).toHaveText('Memoria RAM: 8 GB');

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