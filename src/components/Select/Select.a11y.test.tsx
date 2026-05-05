import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select } from './Select';

expect.extend(toHaveNoViolations);

const options = [
  { value: 'bmw', label: 'BMW' },
  { value: 'chery', label: 'Chery' },
  { value: 'chevrolet', label: 'Chevrolet' },
];

describe('Select — accessibility', () => {
  it('не имеет нарушений a11y в состоянии по умолчанию', async () => {
    const { container } = render(<Select label="Марка автомобиля" options={options} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с выбранным значением', async () => {
    const { container } = render(
      <Select label="Марка автомобиля" options={options} value="bmw" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в disabled состоянии', async () => {
    const { container } = render(
      <Select label="Марка автомобиля" options={options} disabled />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с ошибкой', async () => {
    const { container } = render(
      <Select label="Марка автомобиля" options={options} error="Выберите марку из списка" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
