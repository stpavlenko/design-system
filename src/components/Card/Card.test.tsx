import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('рендерится с заголовком', () => {
    render(<Card title="Заголовок" />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });

  it('рендерится с описанием', () => {
    render(<Card description="Описание карточки" />);
    expect(screen.getByText('Описание карточки')).toBeInTheDocument();
  });

  it('рендерится с изображением', () => {
    render(<Card image="https://example.com/img.jpg" imageAlt="Тестовое изображение" />);
    const img = screen.getByAltText('Тестовое изображение');
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
  });

  it('рендерится с children', () => {
    render(<Card><p>Произвольный контент</p></Card>);
    expect(screen.getByText('Произвольный контент')).toBeInTheDocument();
  });

  it('рендерится с actions', () => {
    render(<Card actions={<button>Действие</button>} />);
    expect(screen.getByRole('button', { name: 'Действие' })).toBeInTheDocument();
  });

  it('применяет variant', () => {
    const { container } = render(<Card variant="outlined" title="Тест" />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('variant-outlined');
  });

  it('использует семантический тег article', () => {
    render(<Card title="Тест" />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
