import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from './Badge';

expect.extend(toHaveNoViolations);

describe('Badge — accessibility', () => {
  it('не имеет нарушений a11y с текстом', async () => {
    const { container } = render(<Badge variant="info">Новый</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в dot-варианте с aria-label', async () => {
    const { container } = render(
      <Badge dot variant="success" aria-label="Статус: онлайн" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
