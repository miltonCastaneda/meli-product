import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery } from './ImageGallery';

describe('ImageGallery', () => {
  const mockImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
  ];
  const mockTitle = 'Test Product';

  test('renders the main image and thumbnails', () => {
    render(<ImageGallery images={mockImages} title={mockTitle} />);

    // Check if the main image is rendered
    const mainImage = screen.getByAltText(`${mockTitle}`);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0]);

    // Check if thumbnails are rendered
    mockImages.forEach((img, index) => {
      expect(screen.getByAltText(`${mockTitle} - vista ${index + 1}`)).toBeInTheDocument();
      expect(screen.getByAltText(`${mockTitle} - vista ${index + 1}`)).toHaveAttribute('src', img);
    });
  });

  test('changes main image on thumbnail hover (desktop)', () => {
    render(<ImageGallery images={mockImages} title={mockTitle} />);

    const thumbnail2 = screen.getByAltText(`${mockTitle} - vista 2`);
    fireEvent.mouseEnter(thumbnail2);

    const mainImage = screen.getByAltText(`${mockTitle}`);
    expect(mainImage).toHaveAttribute('src', mockImages[1]);
  });

  test('changes main image on mobile pagination click', () => {
    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<ImageGallery images={mockImages} title={mockTitle} />);

    const paginationButton2 = screen.getAllByRole('button')[1]; // Second pagination button
    fireEvent.click(paginationButton2);

    const mainImage = screen.getByAltText(`${mockTitle}`);
    expect(mainImage).toHaveAttribute('src', mockImages[1]);

    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
  });
});
