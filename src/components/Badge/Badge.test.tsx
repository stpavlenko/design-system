import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('рендерится с текстом', () => {
    render(<Badge>Новый</Badge>);
    expect(screen.getByRole('status')).toHaveTextContent('Новый');
  });

  it('применяет variant', () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('variant-success');
  });

  it('применяет size', () => {
    const { container } = render(<Badge size="lg">Большой</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('size-lg');
  });

  it('рендерится как dot', () => {
    const { container } = render(<Badge dot variant="error" aria-label="Ошибка" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('dot');
    expect(badge).toHaveTextContent('');
  });

  it('dot имеет aria-label', () => {
    render(<Badge dot variant="success" aria-label="Онлайн" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Онлайн');
  });

  it('имеет role="status"', () => {
    render(<Badge>Тест</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
