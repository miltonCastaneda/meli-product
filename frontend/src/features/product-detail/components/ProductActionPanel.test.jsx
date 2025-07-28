import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ProductActionPanel } from './ProductActionPanel';

// Mock de los íconos para no depender de su implementación real
vi.mock('../../../components/icons', () => ({
  Truck: () => <span data-testid="truck-icon" />,
  Undo2: () => <span data-testid="undo-icon" />,
  ShieldCheck: () => <span data-testid="shield-check-icon" />,
  ShieldQuestion: () => <span data-testid="shield-question-icon" />,
}));

const mockData = {
  stock: 15,
};

describe('ProductActionPanel', () => {
  test('should render all information and action buttons correctly', () => {
    render(<ProductActionPanel data={mockData} onAction={() => {}} />);

    // Verificar información de envío
    expect(screen.getByText(/Envío gratis a todo el país/i)).toBeInTheDocument();
    expect(screen.getByText(/Calcular cuándo llega/i)).toBeInTheDocument();

    // Verificar stock disponible
    expect(screen.getByText(/Stock disponible/i)).toBeInTheDocument();
    expect(screen.getByText(`(${mockData.stock} disponibles)`)).toBeInTheDocument();

    // Verificar botones de acción
    expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeInTheDocument();

    // Verificar información de compra protegida y garantía
    expect(screen.getByText(/Devolución gratis/i)).toBeInTheDocument();
    expect(screen.getByText(/Compra Protegida/i)).toBeInTheDocument();
    expect(screen.getByText(/1 años de garantía de fábrica/i)).toBeInTheDocument();
    
    // Verificar que los íconos se rendericen
    expect(screen.getByTestId('truck-icon')).toBeInTheDocument();
    expect(screen.getByTestId('undo-icon')).toBeInTheDocument();
    expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument();
    expect(screen.getByTestId('shield-question-icon')).toBeInTheDocument();
  });

  test('should call onAction when "Comprar ahora" button is clicked', () => {
    const handleAction = vi.fn();
    render(<ProductActionPanel data={mockData} onAction={handleAction} />);

    const buyButton = screen.getByRole('button', { name: /comprar ahora/i });
    fireEvent.click(buyButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  test('should call onAction when "Agregar al carrito" button is clicked', () => {
    const handleAction = vi.fn();
    render(<ProductActionPanel data={mockData} onAction={handleAction} />);

    const addToCartButton = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(addToCartButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
