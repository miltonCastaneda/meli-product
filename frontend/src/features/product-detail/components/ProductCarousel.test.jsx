import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ProductCarousel } from './ProductCarousel';

// Mock de los íconos
vi.mock('../../../components/icons', () => ({
  ChevronLeft: () => <span data-testid="chevron-left" />,
  ChevronRight: () => <span data-testid="chevron-right" />,
}));

const relatedProducts = [
  { promo: 'Promocionado', image: 'img1.webp', title: 'Related Product 1', original_price: 'U$S 200', price: 'U$S 180', discount: '10% OFF', installments: '10 cuotas sin interés', shipping: 'Envío gratis' },
  { image: 'img2.webp', title: 'Related Product 2', price: 'U$S 250', installments: '12 cuotas', shipping: 'Envío gratis' },
];

const brandProducts = [
  { image: 'img3.webp', title: 'Brand Product 1', specs: '8GB RAM', price: 'U$S 1200', installments: '6 cuotas', shipping: 'Envío gratis' },
];

describe('ProductCarousel', () => {
  // Mock para scrollBy, ya que no está implementado en jsdom
  const scrollByMock = vi.fn();
  window.HTMLElement.prototype.scrollBy = scrollByMock;

  beforeEach(() => {
    scrollByMock.mockClear();
  });

  test('should render title and related product cards correctly', () => {
    render(<ProductCarousel title="Productos Relacionados" products={relatedProducts} onAction={() => {}} />);

    expect(screen.getByText('Productos Relacionados')).toBeInTheDocument();
    expect(screen.getByText('Related Product 1')).toBeInTheDocument();
    expect(screen.getByText('U$S 180')).toBeInTheDocument();
    expect(screen.getByText('10% OFF')).toBeInTheDocument();
    expect(screen.getByText('Related Product 2')).toBeInTheDocument();
  });

  test('should render title and brand product cards correctly', () => {
    render(<ProductCarousel title="Productos de la Marca" products={brandProducts} type="brand" onAction={() => {}} />);

    expect(screen.getByText('Productos de la Marca')).toBeInTheDocument();
    expect(screen.getByText(/Brand Product 1.*8GB RAM/)).toBeInTheDocument();
    expect(screen.getByText('U$S 1200')).toBeInTheDocument();
    expect(screen.getByText(/Ver más productos/i)).toBeInTheDocument();
  });

  test('should call onAction when a product card is clicked', () => {
    const handleAction = vi.fn();
    render(<ProductCarousel title="Test Carousel" products={relatedProducts} onAction={handleAction} />);

    const firstCard = screen.getByText('Related Product 1').closest('div.cursor-pointer');
    fireEvent.click(firstCard);

    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  test('should trigger scroll when navigation buttons are clicked', () => {
    render(<ProductCarousel title="Test Scroll" products={relatedProducts} onAction={() => {}} />);

    const leftButton = screen.getByRole('button', { name: /scroll left/i });
    const rightButton = screen.getByRole('button', { name: /scroll right/i });

    fireEvent.click(leftButton);
    expect(scrollByMock).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });

    fireEvent.click(rightButton);
    expect(scrollByMock).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});
