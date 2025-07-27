import { render, screen } from '@testing-library/react';
import { ProductDescription } from './ProductDescription';

describe('ProductDescription', () => {
  test('renders description heading and text correctly', () => {
    const descriptionText = "This is a test description. With multiple lines.";
    render(<ProductDescription description={descriptionText} />);

    // Check if the heading is rendered
    expect(screen.getByRole('heading', { level: 2, name: /Descripción/i })).toBeInTheDocument();

    // Check if the description text is rendered
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  test('renders empty description gracefully', () => {
    render(<ProductDescription description="" />);

    // Check if the heading is still rendered
    expect(screen.getByRole('heading', { level: 2, name: /Descripción/i })).toBeInTheDocument();

    // Check that the description paragraph is present and has no text content
    const descriptionParagraph = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && element.textContent.trim() === '';
    });
    expect(descriptionParagraph).toBeInTheDocument();
  });
});
