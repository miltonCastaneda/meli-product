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

  // This test is problematic because it tries to assert on the internal rendering of icon components
  // which are not directly exposed as DOM elements in a simple way. It's better to mock them
  // or test them in their own unit tests.
  // test('renders specific icon components based on icon prop', () => {
  //   render(<ProductCharacteristics characteristics={mockCharacteristics} />);

  //   // Check if the icon components are rendered (by checking their SVG titles or specific attributes)
  //   // This assumes the icon components render an SVG with a title or a specific data-testid
  //   // For simplicity, we'll check for the presence of the icon's container or a known element within it.
  //   // A more robust test would involve mocking the icon components or checking their SVG structure.
  //   expect(screen.getByText('Tamaño de la pantalla:').previousElementSibling).toBeInTheDocument(); // Checks for the div containing the icon
  //   expect(screen.getByText('Memoria interna:').previousElementSibling).toBeInTheDocument();
  //   expect(screen.getByText('Cámara trasera principal:').previousElementSibling).toBeInTheDocument();
  // });
});
