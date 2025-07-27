import { fetchProductById } from './productService';

describe('productService', () => {
  const API_BASE_URL = 'http://localhost';
  const productId = 'ABC123-Samsung-Galaxy-A55';
  const productUrl = `${API_BASE_URL}/api/items/${productId}`;

  // Mock the global fetch function
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('fetchProductById should return product data on success', async () => {
    const mockProductData = {
      id: productId,
      title: 'Test Product',
      price: { amount: 100, currency: 'US$' },
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProductData),
    });

    const data = await fetchProductById(productId);

    expect(global.fetch).toHaveBeenCalledWith(productUrl);
    expect(data).toEqual(mockProductData);
  });

  test('fetchProductById should throw an error on network failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchProductById(productId)).rejects.toThrow('Network error');
    expect(global.fetch).toHaveBeenCalledWith(productUrl);
  });

  test('fetchProductById should throw an error on non-ok response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchProductById(productId)).rejects.toThrow('HTTP error! status: 404');
    expect(global.fetch).toHaveBeenCalledWith(productUrl);
  });
});
