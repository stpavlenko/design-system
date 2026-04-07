import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from './Card';

expect.extend(toHaveNoViolations);

describe('Card — accessibility', () => {
  it('не имеет нарушений a11y с заголовком и описанием', async () => {
    const { container } = render(
      <Card title="Заголовок" description="Описание карточки" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с изображением', async () => {
    const { container } = render(
      <Card
        title="С картинкой"
        image="https://example.com/img.jpg"
        imageAlt="Описание изображения"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с действиями', async () => {
    const { container } = render(
      <Card
        title="С действиями"
        actions={<button>Подробнее</button>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
