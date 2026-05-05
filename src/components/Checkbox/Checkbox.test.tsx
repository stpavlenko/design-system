import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('рендерится с label', () => {
    render(<Checkbox label="Согласен с условиями" />);
    expect(screen.getByLabelText('Согласен с условиями')).toBeInTheDocument();
  });

  it('рендерится без label', () => {
    render(<Checkbox aria-label="Чекбокс" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('начинает в unchecked состоянии', () => {
    render(<Checkbox label="Тест" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('отображает checked состояние', () => {
    render(<Checkbox label="Тест" checked onChange={jest.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('вызывает onChange при клике', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Тест" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('input недоступен для взаимодействия когда disabled', () => {
    render(<Checkbox label="Тест" disabled onChange={jest.fn()} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('применяет disabled атрибут', () => {
    render(<Checkbox label="Тест" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('имеет aria-checked="mixed" в indeterminate состоянии', () => {
    render(<Checkbox label="Тест" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('показывает текст ошибки', () => {
    render(<Checkbox label="Тест" error="Обязательное поле" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
  });

  it('показывает вспомогательный текст', () => {
    render(<Checkbox label="Тест" helperText="Прочитайте условия" />);
    expect(screen.getByText('Прочитайте условия')).toBeInTheDocument();
  });

  it('имеет aria-invalid когда есть ошибка', () => {
    render(<Checkbox label="Тест" error="Ошибка" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('применяет boxChecked класс когда checked', () => {
    const { container } = render(
      <Checkbox label="Тест" checked onChange={jest.fn()} />
    );
    const box = container.querySelector('[aria-hidden="true"]');
    expect(box?.className).toContain('boxChecked');
  });

  it('применяет boxIndeterminate класс когда indeterminate', () => {
    const { container } = render(<Checkbox label="Тест" indeterminate />);
    const box = container.querySelector('[aria-hidden="true"]');
    expect(box?.className).toContain('boxIndeterminate');
  });

  it('показывает SVG-галочку когда checked', () => {
    const { container } = render(
      <Checkbox label="Тест" checked onChange={jest.fn()} />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('показывает SVG-тире когда indeterminate', () => {
    const { container } = render(<Checkbox label="Тест" indeterminate />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
