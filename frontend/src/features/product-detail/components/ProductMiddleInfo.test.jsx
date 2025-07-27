import { render, screen } from '@testing-library/react';
import { ProductMiddleInfo } from './ProductMiddleInfo';

describe('ProductMiddleInfo', () => {
  const mockProductData = {
    id: 'MLA123456789',
    condition: 'Nuevo',
    sold_quantity: 1500,
    title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
    price: {
      amount: 439,
      currency: 'US$',
      installments: {
          quantity: 10,
          amount: 19.14,
      }
    },
    original_price: 499,
    discount_percentage: 12,
    images: [],
    seller: {
      name: 'Samsung',
      is_official: true,
      sales: "+5mil",
      products_count: 50
    },
    shipping: {
      free_shipping: true,
    },
    stock: 50,
    rating: {
      average: 4.5,
      count: 769,
    },
    key_features: [
        'Memoria RAM: 8 GB',
        'Dispositivo desbloqueado para que elijas la compañía telefónica preferida.',
        'Memoria interna de 256 GB.'
    ],
    characteristics: [],
    description: "Capacidad y eficiencia",
  };

  test('renders product title, condition, sold quantity, and price', () => {
    render(<ProductMiddleInfo data={mockProductData} />);

    expect(screen.getByText('Nuevo')).toBeInTheDocument();
    expect(screen.getByText(`${mockProductData.sold_quantity.toLocaleString()} vendidos`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: mockProductData.title })).toBeInTheDocument();
    expect(screen.getByText('US$ 439')).toBeInTheDocument();
    expect(screen.getByText('US$ 499')).toBeInTheDocument(); // Original price
    expect(screen.getByText('12% OFF')).toBeInTheDocument(); // Discount

    // Use a function matcher for the installments text with more precise matching
    expect(screen.getByText((content, element) => {
      const expectedText = `en ${mockProductData.price.installments.quantity}x de $${mockProductData.price.installments.amount.toFixed(2).replace('.',',')} sin interés`;
      return element.textContent.trim() === expectedText.trim();
    })).toBeInTheDocument();
  });

  test('renders seller information', () => {
    render(<ProductMiddleInfo data={mockProductData} />);
    expect(screen.getByText('Visita la Tienda oficial de Samsung')).toBeInTheDocument();
  });

  test('renders rating information', () => {
    render(<ProductMiddleInfo data={mockProductData} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(769)')).toBeInTheDocument();
  });

  test('renders key features', () => {
    render(<ProductMiddleInfo data={mockProductData} />);
    expect(screen.getByText('Lo que tienes que saber de este producto')).toBeInTheDocument();
    expect(screen.getByText('Memoria RAM: 8 GB')).toBeInTheDocument();
  });

  test('does not render original price or discount if not provided', () => {
    const productWithoutDiscount = { ...mockProductData, original_price: undefined, discount_percentage: undefined };
    render(<ProductMiddleInfo data={productWithoutDiscount} />);

    expect(screen.queryByText('US$ 499')).not.toBeInTheDocument();
    expect(screen.queryByText('12% OFF')).not.toBeInTheDocument();
  });
});
