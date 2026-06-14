import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

it('unchecked', async () => {
	const { container } = render(<Checkbox label="Согласен с условиями" />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('checked', async () => {
	const { container } = render(
		<Checkbox label="Согласен с условиями" checked onChange={jest.fn()} />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('indeterminate', async () => {
	const { container } = render(
		<Checkbox label="Выбрать всё" indeterminate onChange={jest.fn()} />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('disabled', async () => {
	const { container } = render(<Checkbox label="Неактивный пункт" disabled />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с ошибкой', async () => {
	const { container } = render(
		<Checkbox label="Согласен с условиями" error="Необходимо принять условия" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
