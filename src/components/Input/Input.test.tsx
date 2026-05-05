import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  // --- Рендер ---

  it('рендерится с label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('рендерится с placeholder', () => {
    render(<Input placeholder="Введите email" />);
    expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument();
  });

  it('рендерит нативный input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // --- Размеры (Figma) ---

  it('применяет size sm', () => {
    const { container } = render(<Input size="sm" />);
    expect(container.querySelector('.size-sm')).toBeInTheDocument();
  });

  it('применяет size md по умолчанию', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('.size-md')).toBeInTheDocument();
  });

  it('применяет size lg', () => {
    const { container } = render(<Input size="lg" />);
    expect(container.querySelector('.size-lg')).toBeInTheDocument();
  });

  // --- Состояние Error (Figma: красная рамка + текст под полем) ---

  it('показывает текст ошибки', () => {
    render(<Input error="Обязательное поле" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
  });

  it('применяет класс error к обёртке', () => {
    const { container } = render(<Input error="Ошибка" />);
    expect(container.querySelector('.error')).toBeInTheDocument();
  });

  it('имеет aria-invalid при ошибке', () => {
    render(<Input label="Тест" error="Ошибка" />);
    expect(screen.getByLabelText('Тест')).toHaveAttribute('aria-invalid', 'true');
  });

  it('имеет aria-describedby связанный с ошибкой', () => {
    render(<Input label="Тест" error="Ошибка" />);
    const input = screen.getByLabelText('Тест');
    const errorEl = document.getElementById(input.getAttribute('aria-describedby')!);
    expect(errorEl).toHaveTextContent('Ошибка');
  });

  // --- Helper text ---

  it('показывает вспомогательный текст', () => {
    render(<Input helperText="Подсказка" />);
    expect(screen.getByText('Подсказка')).toBeInTheDocument();
  });

  it('не показывает helperText при наличии error', () => {
    render(<Input error="Ошибка" helperText="Подсказка" />);
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
  });

  // --- Состояние Focus (Figma: синяя рамка) ---

  it('принимает фокус', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    input.focus();
    expect(input).toHaveFocus();
  });

  // --- Состояние Disabled (Figma: только светлая рамка, без изменения фона) ---

  it('disabled состояние блокирует поле', () => {
    render(<Input label="Тест" disabled />);
    expect(screen.getByLabelText('Тест')).toBeDisabled();
  });

  it('применяет класс disabled к обёртке', () => {
    const { container } = render(<Input disabled />);
    expect(container.querySelector('.disabled')).toBeInTheDocument();
  });

  // --- Иконки ---

  it('рендерит leftIcon', () => {
    render(<Input leftIcon={<span data-testid="icon-l" />} />);
    expect(screen.getByTestId('icon-l')).toBeInTheDocument();
  });

  it('рендерит rightIcon', () => {
    render(<Input rightIcon={<span data-testid="icon-r" />} />);
    expect(screen.getByTestId('icon-r')).toBeInTheDocument();
  });

  // --- Взаимодействие ---

  it('обновляет значение при вводе', () => {
    render(<Input label="Email" defaultValue="" />);
    const input = screen.getByLabelText('Email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });
});
