import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarCard } from './CarCard';

describe('CarCard', () => {
	it('рендерится как article', () => {
		render(<CarCard />);
		expect(screen.getByRole('article')).toBeInTheDocument();
	});

	it('использует значения по умолчанию', () => {
		render(<CarCard />);
		expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
		expect(screen.getByText('2020 · 40 000 км · 2.5 л')).toBeInTheDocument();
		expect(screen.getByText('2 300 000 ₽')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Подробнее' })).toBeInTheDocument();
	});

	it('отображает переданный контент', () => {
		render(
			<CarCard
				title="BMW X5"
				subtitle="2022 · 15 000 км · 3.0 л"
				price="5 000 000 ₽"
				buttonLabel="Посмотреть"
			/>
		);
		expect(screen.getByText('BMW X5')).toBeInTheDocument();
		expect(screen.getByText('2022 · 15 000 км · 3.0 л')).toBeInTheDocument();
		expect(screen.getByText('5 000 000 ₽')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Посмотреть' })).toBeInTheDocument();
	});

	it('не отображает title, subtitle и price при пустой строке', () => {
		render(<CarCard title="" subtitle="" price="" />);
		expect(screen.queryByText('Toyota Camry')).not.toBeInTheDocument();
		expect(screen.queryByText('2020 · 40 000 км · 2.5 л')).not.toBeInTheDocument();
		expect(screen.queryByText('2 300 000 ₽')).not.toBeInTheDocument();
	});

	it('кнопка заблокирована когда buttonDisabled', () => {
		render(<CarCard buttonDisabled />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('вызывает onButtonClick при клике по кнопке', () => {
		const handleClick = jest.fn();
		render(<CarCard onButtonClick={handleClick} />);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('не вызывает onButtonClick когда кнопка disabled', () => {
		const handleClick = jest.fn();
		render(<CarCard buttonDisabled onButtonClick={handleClick} />);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('применяет buttonVariant ghost по умолчанию', () => {
		const { container } = render(<CarCard />);
		expect(container.querySelector('.variant-ghost')).toBeInTheDocument();
	});

	it('применяет переданный buttonVariant', () => {
		const { container } = render(<CarCard buttonVariant="secondary" />);
		expect(container.querySelector('.variant-secondary')).toBeInTheDocument();
	});

	it('отображает placeholder вместо изображения когда image не передан', () => {
		const { container } = render(<CarCard />);
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
		const placeholder = container.querySelector('[aria-hidden="true"]');
		expect(placeholder).toBeInTheDocument();
	});

	it('отображает изображение с alt', () => {
		render(<CarCard image="https://example.com/car.jpg" imageAlt="Красный BMW X5" />);
		const img = screen.getByAltText('Красный BMW X5');
		expect(img).toHaveAttribute('src', 'https://example.com/car.jpg');
	});

	it.each([
		['new', 'Новый', 'variant-success'],
		['used', 'С пробегом', 'variant-neutral'],
		['sale', 'Скидка', 'variant-warning'],
	] as const)('отображает бейдж %s с текстом и variant', (badge, label, variantClass) => {
		render(<CarCard badge={badge} />);
		const badgeEl = screen.getByRole('status');
		expect(badgeEl).toHaveTextContent(label);
		expect(badgeEl.className).toContain(variantClass);
	});

	it('не отображает бейдж когда не передан', () => {
		render(<CarCard />);
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});
});
