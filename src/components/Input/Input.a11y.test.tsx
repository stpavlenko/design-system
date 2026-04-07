import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input — accessibility', () => {
  it('не имеет нарушений a11y с label', async () => {
    const { container } = render(<Input label="Email" placeholder="user@example.com" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y с ошибкой', async () => {
    const { container } = render(
      <Input label="Пароль" error="Минимум 8 символов" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('не имеет нарушений a11y в disabled состоянии', async () => {
    const { container } = render(
      <Input label="Заблокировано" disabled defaultValue="Текст" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
