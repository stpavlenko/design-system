import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('рендерится с текстом', () => {
    render(<Button>Нажми</Button>);
    expect(screen.getByRole('button', { name: 'Нажми' })).toBeInTheDocument();
  });

  it('применяет variant primary по умолчанию', () => {
    const { container } = render(<Button>Тест</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('variant-primary');
  });

  it('применяет переданный variant', () => {
    const { container } = render(<Button variant="outline">Тест</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('variant-outline');
  });

  it('применяет переданный size', () => {
    const { container } = render(<Button size="lg">Тест</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('size-lg');
  });

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

  it('имеет aria-disabled когда disabled', () => {
    render(<Button disabled>Тест</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

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
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  it('имеет type="button" по умолчанию', () => {
    render(<Button>Тест</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
