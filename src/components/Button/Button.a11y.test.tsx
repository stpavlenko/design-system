import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button — accessibility', () => {
  it('не имеет нарушений a11y в primary варианте', async () => {
    const { container } = render(<Button>Нажми меня</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в disabled состоянии', async () => {
    const { container } = render(<Button disabled>Неактивна</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в loading состоянии', async () => {
    const { container } = render(<Button loading>Загрузка</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y для outline варианта', async () => {
    const { container } = render(<Button variant="outline">Контурная</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y для ghost варианта', async () => {
    const { container } = render(<Button variant="ghost">Призрачная</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
