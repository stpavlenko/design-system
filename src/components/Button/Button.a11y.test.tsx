import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button — accessibility', () => {
  it('не имеет нарушений a11y — variant primary', async () => {
    const { container } = render(<Button variant="primary">Подробнее</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y — variant secondary', async () => {
    const { container } = render(<Button variant="secondary">Подробнее</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y — variant ghost', async () => {
    const { container } = render(<Button variant="ghost">Подробнее</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в disabled состоянии', async () => {
    const { container } = render(<Button disabled>Неактивна</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в loading состоянии', async () => {
    const { container } = render(<Button loading>Загрузка</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y — size sm', async () => {
    const { container } = render(<Button size="sm">SM</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('не имеет нарушений a11y — size md', async () => {
    const { container } = render(<Button size="md">MD</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
