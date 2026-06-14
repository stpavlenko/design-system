import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	it('рендерится с label', () => {
		render(<Checkbox label="Согласен с условиями" />);
		expect(screen.getByLabelText('Согласен с условиями')).toBeInTheDocument();
	});

	it('рендерится без label', () => {
		render(<Checkbox aria-label="Чекбокс" />);
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('начинает в unchecked состоянии', () => {
		render(<Checkbox label="Тест" />);
		expect(screen.getByRole('checkbox')).not.toBeChecked();
	});

	it('отображает checked состояние', () => {
		render(<Checkbox label="Тест" checked onChange={jest.fn()} />);
		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('вызывает onChange при клике', () => {
		const handleChange = jest.fn();
		render(<Checkbox label="Тест" onChange={handleChange} />);
		fireEvent.click(screen.getByRole('checkbox'));
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it('disabled состояние блокирует input', () => {
		render(<Checkbox label="Тест" disabled />);
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('indeterminate состояние: aria-checked, класс и иконка', () => {
		const { container } = render(<Checkbox label="Тест" indeterminate />);
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
		const box = container.querySelector('[aria-hidden="true"]');
		expect(box?.className).toContain('boxIndeterminate');
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('checked состояние: класс и иконка галочки', () => {
		const { container } = render(
			<Checkbox label="Тест" checked onChange={jest.fn()} />
		);
		const box = container.querySelector('[aria-hidden="true"]');
		expect(box?.className).toContain('boxChecked');
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('при indeterminate не применяет boxChecked даже если checked', () => {
		const { container } = render(
			<Checkbox label="Тест" checked indeterminate onChange={jest.fn()} />
		);
		const box = container.querySelector('[aria-hidden="true"]');
		expect(box?.className).toContain('boxIndeterminate');
		expect(box?.className).not.toContain('boxChecked');
	});

	it('состояние error: текст, aria-invalid', () => {
		render(<Checkbox label="Тест" error="Обязательное поле" />);
		expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
		expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
	});

	it('показывает вспомогательный текст', () => {
		render(<Checkbox label="Тест" helperText="Прочитайте условия" />);
		expect(screen.getByText('Прочитайте условия')).toBeInTheDocument();
	});

	it('не показывает helperText при наличии error', () => {
		render(<Checkbox label="Тест" error="Ошибка" helperText="Подсказка" />);
		expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
	});
});
