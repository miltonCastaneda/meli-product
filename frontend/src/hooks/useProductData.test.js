import { renderHook, waitFor } from '@testing-library/react';
import { useProductData } from './useProductData';
import * as productService from '../api/productService';

describe('useProductData', () => {
  const mockProduct = {
    id: 'ABC123-Samsung-Galaxy-A55',
    title: 'Test Product',
    price: { amount: 100, currency: 'US$' },
  };

  beforeEach(() => {
    // Mock the fetchProductById function before each test
    vi.spyOn(productService, 'fetchProductById').mockResolvedValue(mockProduct);
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.restoreAllMocks();
  });

  test('should fetch product data successfully', async () => {
    const { result } = renderHook(() => useProductData('ABC123-Samsung-Galaxy-A55'));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert final state
    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
    expect(productService.fetchProductById).toHaveBeenCalledWith('ABC123-Samsung-Galaxy-A55');
  });

  test('should handle API error', async () => {
    const errorMessage = 'Failed to fetch product';
    vi.spyOn(productService, 'fetchProductById').mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProductData('ABC123-Samsung-Galaxy-A55'));

    // Initial state
    expect(result.current.loading).toBe(true);

    // Wait for the error to be handled
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert final state
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe(errorMessage);
  });

  test('should not fetch data if id is null or undefined', async () => {
    const { result } = renderHook(() => useProductData(null));

    // Should remain in initial loading state as no fetch is triggered
    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeNull();

    // Ensure fetchProductById was not called
    expect(productService.fetchProductById).not.toHaveBeenCalled();

    const { result: result2 } = renderHook(() => useProductData(undefined));
    expect(productService.fetchProductById).not.toHaveBeenCalled();
  });
});
