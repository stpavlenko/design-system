import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  // --- Рендер ---

  it('рендерится с текстом', () => {
    render(<Button>Нажми</Button>);
    expect(screen.getByRole('button', { name: 'Нажми' })).toBeInTheDocument();
  });

  it('имеет type="button" по умолчанию', () => {
    render(<Button>Тест</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  // --- Варианты (Figma: Primary, Secondary, Ghost) ---

  it('применяет variant primary по умолчанию', () => {
    const { container } = render(<Button>Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-primary');
  });

  it('применяет variant secondary', () => {
    const { container } = render(<Button variant="secondary">Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-secondary');
  });

  it('применяет variant ghost', () => {
    const { container } = render(<Button variant="ghost">Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-ghost');
  });

  it('применяет variant outline', () => {
    const { container } = render(<Button variant="outline">Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('variant-outline');
  });

  // --- Размеры (Figma: SM и MD) ---

  it('применяет size sm', () => {
    const { container } = render(<Button size="sm">Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('size-sm');
  });

  it('применяет size md по умолчанию', () => {
    const { container } = render(<Button>Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('size-md');
  });

  it('применяет size lg', () => {
    const { container } = render(<Button size="lg">Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('size-lg');
  });

  // --- Клик ---

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick когда disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Клик</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // --- Disabled (Figma: opacity 30%) ---

  it('применяет класс disabled', () => {
    const { container } = render(<Button disabled>Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('disabled');
  });

  it('имеет aria-disabled когда disabled', () => {
    render(<Button disabled>Тест</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('атрибут disabled присутствует на кнопке', () => {
    render(<Button disabled>Тест</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // --- Loading ---

  it('имеет aria-busy когда loading', () => {
    render(<Button loading>Загрузка</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('disabled когда loading', () => {
    render(<Button loading>Загрузка</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('показывает спиннер при loading', () => {
    const { container } = render(<Button loading>Загрузка</Button>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('применяет класс loading', () => {
    const { container } = render(<Button loading>Тест</Button>);
    expect((container.firstChild as HTMLElement).className).toContain('loading');
  });

  // --- Иконки ---

  it('рендерит leftIcon', () => {
    render(<Button leftIcon={<span data-testid="icon-left" />}>Тест</Button>);
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  });

  it('рендерит rightIcon', () => {
    render(<Button rightIcon={<span data-testid="icon-right" />}>Тест</Button>);
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('скрывает иконки при loading', () => {
    render(
      <Button loading leftIcon={<span data-testid="icon" />}>
        Тест
      </Button>
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });
});
