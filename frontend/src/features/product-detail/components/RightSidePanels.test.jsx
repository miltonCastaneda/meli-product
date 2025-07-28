import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { RightSidePanels } from './RightSidePanels';

// Mock de los íconos
vi.mock('../../../components/icons', () => ({
  MessageSquare: () => <span data-testid="message-icon" />,
  CheckCircle2: () => <span data-testid="check-icon" />,
}));

const mockSeller = {
  name: 'Samsung Store',
  products_count: 123,
  sales: '54321',
};

describe('RightSidePanels', () => {
  test('should render seller information correctly', () => {
    render(<RightSidePanels seller={mockSeller} onAction={() => {}} />);

    // Verificar inicial del vendedor
    expect(screen.getByText('S')).toBeInTheDocument();
    // Verificar nombre del vendedor
    expect(screen.getByText('Samsung Store')).toBeInTheDocument();
    // Verificar cantidad de productos
    expect(screen.getByText(/123 productos/i)).toBeInTheDocument();
    // Verificar número de ventas
    expect(screen.getByText('54321')).toBeInTheDocument();
  });

  test('should render all panels and static information', () => {
    render(<RightSidePanels seller={mockSeller} onAction={() => {}} />);

    // Verificar paneles
    expect(screen.getByText('Tienda Oficial')).toBeInTheDocument();
    expect(screen.getByText('Otras opciones de compra')).toBeInTheDocument();
    expect(screen.getByText('Medios de pago')).toBeInTheDocument();

    // Verificar información de atención
    expect(screen.getByText(/Brinda buena atención/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrega sus productos a tiempo/i)).toBeInTheDocument();
    
    // Verificar íconos mockeados
    expect(screen.getByTestId('message-icon')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  test('should call onAction when "Ir a la Tienda oficial" button is clicked', () => {
    const handleAction = vi.fn();
    render(<RightSidePanels seller={mockSeller} onAction={handleAction} />);

    const storeButton = screen.getByRole('button', { name: /ir a la tienda oficial/i });
    fireEvent.click(storeButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
