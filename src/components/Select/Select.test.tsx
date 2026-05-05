import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: 'bmw', label: 'BMW' },
  { value: 'chery', label: 'Chery' },
  { value: 'chevrolet', label: 'Chevrolet' },
];

describe('Select', () => {
  it('рендерится с label', () => {
    render(<Select label="Марка" options={options} />);
    expect(screen.getByText('Марка')).toBeInTheDocument();
  });

  it('показывает placeholder когда значение не выбрано', () => {
    render(<Select options={options} placeholder="Выберите марку" />);
    expect(screen.getByText('Выберите марку')).toBeInTheDocument();
  });

  it('показывает выбранное значение', () => {
    render(<Select options={options} value="bmw" />);
    expect(screen.getByText('BMW')).toBeInTheDocument();
  });

  it('открывает dropdown при клике', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('показывает все опции при открытии', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('вызывает onChange при выборе опции', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('BMW'));
    expect(handleChange).toHaveBeenCalledWith('bmw');
  });

  it('закрывает dropdown после выбора опции', () => {
    render(<Select options={options} onChange={jest.fn()} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('BMW'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('не открывается когда disabled', () => {
    render(<Select options={options} disabled />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('имеет aria-expanded=false по умолчанию', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('имеет aria-expanded=true когда открыт', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('отмечает выбранную опцию как aria-selected', () => {
    render(<Select options={options} value="bmw" />);
    fireEvent.click(screen.getByRole('combobox'));
    const allOptions = screen.getAllByRole('option');
    const bmwOption = allOptions.find(el => el.textContent?.includes('BMW'));
    expect(bmwOption).toHaveAttribute('aria-selected', 'true');
  });

  it('показывает текст ошибки', () => {
    render(<Select options={options} error="Обязательное поле" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
  });

  it('показывает вспомогательный текст', () => {
    render(<Select options={options} helperText="Выберите из списка" />);
    expect(screen.getByText('Выберите из списка')).toBeInTheDocument();
  });

  it('открывается при нажатии Enter', () => {
    render(<Select options={options} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('открывается при нажатии Space', () => {
    render(<Select options={options} />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('закрывается при нажатии Escape', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('имеет aria-disabled когда disabled', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('имеет aria-invalid когда есть ошибка', () => {
    render(<Select options={options} error="Ошибка" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  // ─── Структура: галочка слева от текста опции ─────────────────────────────

  it('галочка отображается слева от текста выбранной опции', () => {
    render(<Select options={options} value="bmw" />);
    fireEvent.click(screen.getByRole('combobox'));
    const allOptions = screen.getAllByRole('option');
    const bmwOption = allOptions.find(el => el.textContent?.includes('BMW'))!;
    const children = Array.from(bmwOption.children);
    // первый span — checkmarkSlot, второй — текст опции
    expect(children[0].textContent).toBe('✓');
    expect(children[1].textContent).toBe('BMW');
  });

  it('нет галочки у невыбранных опций', () => {
    render(<Select options={options} value="bmw" />);
    fireEvent.click(screen.getByRole('combobox'));
    const allOptions = screen.getAllByRole('option');
    const cheryOption = allOptions.find(el => el.textContent?.includes('Chery'))!;
    const children = Array.from(cheryOption.children);
    expect(children[0].textContent).toBe('');
  });
});
