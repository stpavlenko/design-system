import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox — accessibility', () => {
  it('не имеет нарушений a11y в unchecked состоянии', async () => {
    const { container } = render(<Checkbox label="Согласен с условиями" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в checked состоянии', async () => {
    const { container } = render(
      <Checkbox label="Согласен с условиями" checked onChange={jest.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в indeterminate состоянии', async () => {
    const { container } = render(
      <Checkbox label="Выбрать всё" indeterminate onChange={jest.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в disabled состоянии', async () => {
    const { container } = render(<Checkbox label="Неактивный пункт" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с ошибкой', async () => {
    const { container } = render(
      <Checkbox label="Согласен с условиями" error="Необходимо принять условия" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
