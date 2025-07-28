import { render, screen } from '@testing-library/react';
import { ProductCharacteristics } from './ProductCharacteristics';

describe('ProductCharacteristics', () => {
  const mockCharacteristics = [
    { icon: '<Smartphone/>', name: 'Tamaño de la pantalla', value: '6.6"' },
    { icon: '<HardDrive/>', name: 'Memoria interna', value: '256 GB' },
    { icon: '<Camera/>', name: 'Cámara trasera principal', value: '50 Mpx' },
  ];

  test('renders characteristics heading and list correctly', () => {
    render(<ProductCharacteristics characteristics={mockCharacteristics} />);

    // Check if the heading is rendered
    expect(screen.getByRole('heading', { level: 2, name: /Características del producto/i })).toBeInTheDocument();

    // Check if each characteristic is rendered
    mockCharacteristics.forEach(char => {
      expect(screen.getByText(`${char.name}:`)).toBeInTheDocument();
      expect(screen.getByText(char.value)).toBeInTheDocument();
    });

    // Check for the "Ver todas las características" link
    expect(screen.getByRole('link', { name: /Ver todas las características/i })).toBeInTheDocument();
  });

  test('renders empty characteristics gracefully', () => {
    render(<ProductCharacteristics characteristics={[]} />);

    // Heading and link should still be present
    expect(screen.getByRole('heading', { level: 2, name: /Características del producto/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver todas las características/i })).toBeInTheDocument();

    // No characteristic items should be rendered
    expect(screen.queryByText(/Tamaño de la pantalla/i)).not.toBeInTheDocument();
  });

});
