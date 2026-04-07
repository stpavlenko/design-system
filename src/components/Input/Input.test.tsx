import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('рендерится с label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('рендерится с placeholder', () => {
    render(<Input placeholder="Введите текст" />);
    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument();
  });

  it('показывает текст ошибки', () => {
    render(<Input error="Обязательное поле" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
  });

  it('показывает вспомогательный текст', () => {
    render(<Input helperText="Подсказка" />);
    expect(screen.getByText('Подсказка')).toBeInTheDocument();
  });

  it('не показывает helperText при наличии error', () => {
    render(<Input error="Ошибка" helperText="Подсказка" />);
    expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
  });

  it('имеет aria-invalid при ошибке', () => {
    render(<Input label="Тест" error="Ошибка" />);
    expect(screen.getByLabelText('Тест')).toHaveAttribute('aria-invalid', 'true');
  });

  it('имеет aria-describedby связанный с ошибкой', () => {
    render(<Input label="Тест" error="Ошибка" />);
    const input = screen.getByLabelText('Тест');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toHaveTextContent('Ошибка');
  });

  it('disabled состояние', () => {
    render(<Input label="Тест" disabled />);
    expect(screen.getByLabelText('Тест')).toBeDisabled();
  });
});
