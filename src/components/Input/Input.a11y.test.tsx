import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

it('с label', async () => {
	const { container } = render(<Input label="Email" placeholder="user@example.com" />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с ошибкой', async () => {
	const { container } = render(
		<Input label="Пароль" error="Минимум 8 символов" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('disabled', async () => {
	const { container } = render(
		<Input label="Заблокировано" disabled defaultValue="Текст" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
