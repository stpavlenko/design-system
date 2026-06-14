import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CarCard } from './CarCard';

expect.extend(toHaveNoViolations);

it('по умолчанию', async () => {
	const { container } = render(<CarCard />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с изображением', async () => {
	const { container } = render(
		<CarCard
			image="https://example.com/car.jpg"
			imageAlt="Toyota Camry красного цвета"
		/>
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с бейджем new', async () => {
	const { container } = render(<CarCard badge="new" />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('с заблокированной кнопкой', async () => {
	const { container } = render(<CarCard buttonDisabled />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

it('variant secondary', async () => {
	const { container } = render(
		<CarCard badge="used" buttonVariant="secondary" buttonLabel="Подробнее" />
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
