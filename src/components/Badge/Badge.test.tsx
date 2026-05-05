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

  // ─── Figma состояния (CarCard) ────────────────────────────────────────────

  it('success variant — Figma: Новый', () => {
    const { container } = render(<Badge variant="success">Новый</Badge>);
    expect(container.firstChild as HTMLElement).toHaveTextContent('Новый');
    expect((container.firstChild as HTMLElement).className).toContain('variant-success');
  });

  it('neutral variant — Figma: С пробегом', () => {
    const { container } = render(<Badge variant="neutral">С пробегом</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-neutral');
  });

  it('warning variant — Figma: Скидка', () => {
    const { container } = render(<Badge variant="warning">Скидка</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-warning');
  });

  it('size sm применяется (используется в CarCard)', () => {
    const { container } = render(<Badge variant="success" size="sm">Новый</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('size-sm');
  });

  it('применяет size md по умолчанию', () => {
    const { container } = render(<Badge>Текст</Badge>);
    expect((container.firstChild as HTMLElement).className).toContain('size-md');
  });
});
