import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CarCard } from './CarCard';

describe('CarCard', () => {
	it('рендерится как article', () => {
		render(<CarCard />);
		expect(screen.getByRole('article')).toBeInTheDocument();
	});

	it('отображает название автомобиля', () => {
		render(<CarCard title="BMW X5" />);
		expect(screen.getByText('BMW X5')).toBeInTheDocument();
	});

	it('отображает характеристики', () => {
		render(<CarCard subtitle="2022 · 15 000 км · 3.0 л" />);
		expect(screen.getByText('2022 · 15 000 км · 3.0 л')).toBeInTheDocument();
	});

	it('отображает цену', () => {
		render(<CarCard price="5 000 000 ₽" />);
		expect(screen.getByText('5 000 000 ₽')).toBeInTheDocument();
	});

	it('отображает кнопку с текстом', () => {
		render(<CarCard buttonLabel="Посмотреть" />);
		expect(screen.getByRole('button', { name: 'Посмотреть' })).toBeInTheDocument();
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

	it('отображает изображение с alt', () => {
		render(<CarCard image="https://example.com/car.jpg" imageAlt="Красный BMW X5" />);
		const img = screen.getByAltText('Красный BMW X5');
		expect(img).toHaveAttribute('src', 'https://example.com/car.jpg');
	});

	it('отображает бейдж New', () => {
		render(<CarCard badge="new" />);
		expect(screen.getByRole('status')).toHaveTextContent('Новый');
	});

	it('отображает бейдж Used', () => {
		render(<CarCard badge="used" />);
		expect(screen.getByRole('status')).toHaveTextContent('С пробегом');
	});

	it('отображает бейдж Sale', () => {
		render(<CarCard badge="sale" />);
		expect(screen.getByRole('status')).toHaveTextContent('Скидка');
	});

	it('не отображает бейдж когда не передан', () => {
		render(<CarCard />);
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('использует значения по умолчанию', () => {
		render(<CarCard />);
		expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
		expect(screen.getByText('2020 · 40 000 км · 2.5 л')).toBeInTheDocument();
		expect(screen.getByText('2 300 000 ₽')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Подробнее' })).toBeInTheDocument();
	});
});
