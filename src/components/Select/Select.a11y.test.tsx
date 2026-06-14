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

it('по умолчанию', async () => {
	const { container } = render(<Select label="Марка автомобиля" options={options} />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с выбранным значением', async () => {
	const { container } = render(
		<Select label="Марка автомобиля" options={options} value="bmw" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('disabled', async () => {
	const { container } = render(
		<Select label="Марка автомобиля" options={options} disabled />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с ошибкой', async () => {
	const { container } = render(
		<Select label="Марка автомобиля" options={options} error="Выберите марку из списка" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
