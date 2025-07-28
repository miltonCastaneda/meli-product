import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ProductDetailPage } from './ProductDetailPage';
import { useProductData } from '../../hooks/useProductData';

// Mockear el custom hook
vi.mock('../../hooks/useProductData');

// Mockear todos los componentes hijos para aislar el componente bajo prueba
vi.mock('../../components/layout', () => ({
  Header: () => <header>Header Mock</header>,
}));
vi.mock('./components', () => ({
  Breadcrumbs: ({ onAction }) => <button onClick={onAction}>Breadcrumbs Mock</button>,
  ImageGallery: ({ images, title }) => <div>ImageGallery Mock: {title}</div>,
  ProductMiddleInfo: ({ data }) => <div>ProductMiddleInfo Mock</div>,
  ProductActionPanel: ({ data, onAction }) => <button onClick={onAction}>ProductActionPanel Mock</button>,
  RightSidePanels: ({ seller, onAction }) => <button onClick={onAction}>RightSidePanels Mock</button>,
  ProductCarousel: ({ title, products, onAction }) => <button onClick={onAction}>Carousel: {title}</button>,
  ProductCharacteristics: ({ characteristics }) => <div>ProductCharacteristics Mock</div>,
  ProductDescription: ({ description }) => <div>ProductDescription Mock</div>,
  SidebarRelatedProducts: ({ onAction }) => <button onClick={onAction}>SidebarRelatedProducts Mock</button>,
}));
vi.mock('../../components/icons', () => ({
    Share2: () => <span>Share2 Icon</span>
}));


// Mock de datos del producto
const mockProduct = {
  id: 'MLA123456',
  title: 'Samsung Galaxy A55',
  images: ['image1.jpg', 'image2.jpg'],
  seller: { name: 'Official Store' },
  characteristics: [{ name: 'RAM', value: '8 GB' }],
  description: 'A great phone.',
};

describe('ProductDetailPage', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
    // Mockear window.location
    Object.defineProperty(window, 'location', {
        value: {
            pathname: '/MLA123456-samsung-galaxy-a55',
        },
        writable: true,
    });
  });

  test('should display loading spinner while fetching data', () => {
    useProductData.mockReturnValue({ product: null, loading: true, error: null });
    render(<ProductDetailPage />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('should display error message if data fetching fails', () => {
    const errorMessage = 'Failed to fetch';
    useProductData.mockReturnValue({ product: null, loading: false, error: { message: errorMessage } });
    render(<ProductDetailPage />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test('should display "no product data" message when product is null and not loading', () => {
    useProductData.mockReturnValue({ product: null, loading: false, error: null });
    render(<ProductDetailPage />);
    expect(screen.getByText(/No product data available/i)).toBeInTheDocument();
  });

  describe('when product data is available', () => {
    beforeEach(() => {
      useProductData.mockReturnValue({ product: mockProduct, loading: false, error: null });
    });

    test('should render all child components with product data', () => {
      render(<ProductDetailPage />);
      
      // Verificar que los componentes principales se rendericen
      expect(screen.getByText('Header Mock')).toBeInTheDocument();
      expect(screen.getByText('Breadcrumbs Mock')).toBeInTheDocument();
      expect(screen.getByText(`ImageGallery Mock: ${mockProduct.title}`)).toBeInTheDocument();
      expect(screen.getByText('ProductMiddleInfo Mock')).toBeInTheDocument();
      expect(screen.getAllByText('ProductActionPanel Mock').length).toBe(2); // Uno para móvil y otro para desktop
      expect(screen.getByText('Carousel: Productos relacionados')).toBeInTheDocument();
      expect(screen.getByText('Carousel: Productos de Samsung')).toBeInTheDocument();
      expect(screen.getByText('ProductCharacteristics Mock')).toBeInTheDocument();
      expect(screen.getByText('ProductDescription Mock')).toBeInTheDocument();
      expect(screen.getByText('RightSidePanels Mock')).toBeInTheDocument();
      expect(screen.getByText('SidebarRelatedProducts Mock')).toBeInTheDocument();
    });

    test('should show and hide toast notification on action click', () => {
      vi.useFakeTimers();
      render(<ProductDetailPage />);

      // El toast no debe ser visible inicialmente
      expect(screen.queryByText('Funcionalidad en construcción')).not.toBeInTheDocument();

      // Simular click en un botón que dispara la acción
      fireEvent.click(screen.getByText('Breadcrumbs Mock'));

      // El toast debe aparecer
      expect(screen.getByText('Funcionalidad en construcción')).toBeInTheDocument();

      // Avanzar el tiempo para que el toast desaparezca
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // El toast ya no debe estar en el DOM
      expect(screen.queryByText('Funcionalidad en construcción')).not.toBeInTheDocument();

      vi.useRealTimers();
    });

    test('should show toast when floating share button is clicked', () => {
        vi.useFakeTimers();
        render(<ProductDetailPage />);
  
        const shareButton = screen.getByRole('button', { name: /share2 icon/i });
        fireEvent.click(shareButton);
  
        expect(screen.getByText('Funcionalidad en construcción')).toBeInTheDocument();
  
        act(() => {
          vi.advanceTimersByTime(3000);
        });
  
        expect(screen.queryByText('Funcionalidad en construcción')).not.toBeInTheDocument();
        vi.useRealTimers();
      });
  });
});