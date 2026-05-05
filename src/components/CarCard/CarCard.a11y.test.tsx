import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CarCard } from './CarCard';

expect.extend(toHaveNoViolations);

describe('CarCard — accessibility', () => {
  it('не имеет нарушений a11y по умолчанию', async () => {
    const { container } = render(<CarCard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с изображением', async () => {
    const { container } = render(
      <CarCard
        image="https://example.com/car.jpg"
        imageAlt="Toyota Camry красного цвета"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с бейджем new', async () => {
    const { container } = render(<CarCard badge="new" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с заблокированной кнопкой', async () => {
    const { container } = render(<CarCard buttonDisabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с вариантом secondary', async () => {
    const { container } = render(
      <CarCard badge="used" buttonVariant="secondary" buttonLabel="Подробнее" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
