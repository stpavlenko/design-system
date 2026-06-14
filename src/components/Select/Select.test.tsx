import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
	{ value: 'bmw', label: 'BMW' },
	{ value: 'chery', label: 'Chery' },
	{ value: 'chevrolet', label: 'Chevrolet' },
];

const openSelect = () => {
	fireEvent.click(screen.getByRole('combobox'));
};

describe('Select', () => {
	it('рендерится с label', () => {
		render(<Select label="Марка" options={options} />);
		expect(screen.getByText('Марка')).toBeInTheDocument();
	});

	it('показывает placeholder по умолчанию', () => {
		render(<Select options={options} />);
		expect(screen.getByText('Выберите значение')).toBeInTheDocument();
	});

	it('показывает переданный placeholder', () => {
		render(<Select options={options} placeholder="Выберите марку" />);
		expect(screen.getByText('Выберите марку')).toBeInTheDocument();
	});

	it('показывает выбранное значение', () => {
		render(<Select options={options} value="bmw" />);
		expect(screen.getByText('BMW')).toBeInTheDocument();
	});

	it('открывает и закрывает dropdown при клике по combobox', () => {
		render(<Select options={options} />);
		const combobox = screen.getByRole('combobox');
		expect(combobox).toHaveAttribute('aria-expanded', 'false');

		openSelect();
		expect(combobox).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		expect(screen.getAllByRole('option')).toHaveLength(3);

		fireEvent.click(combobox);
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('вызывает onChange и закрывает dropdown после выбора опции', () => {
		const handleChange = jest.fn();
		render(<Select options={options} onChange={handleChange} />);
		openSelect();
		fireEvent.click(screen.getByText('BMW'));
		expect(handleChange).toHaveBeenCalledWith('bmw');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('отмечает выбранную опцию как aria-selected', () => {
		render(<Select options={options} value="bmw" />);
		openSelect();
		const bmwOption = screen.getAllByRole('option').find(el => el.textContent?.includes('BMW'));
		expect(bmwOption).toHaveAttribute('aria-selected', 'true');
	});

	it('галочка отображается только у выбранной опции', () => {
		render(<Select options={options} value="bmw" />);
		openSelect();
		const allOptions = screen.getAllByRole('option');
		const bmwOption = allOptions.find(el => el.textContent?.includes('BMW'))!;
		const cheryOption = allOptions.find(el => el.textContent?.includes('Chery'))!;
		expect(Array.from(bmwOption.children)[0].textContent).toBe('✓');
		expect(Array.from(cheryOption.children)[0].textContent).toBe('');
	});

	it('не открывается когда disabled', () => {
		render(<Select options={options} disabled />);
		fireEvent.click(screen.getByRole('combobox'));
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('имеет aria-disabled когда disabled', () => {
		render(<Select options={options} disabled />);
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
	});

	it.each(['Enter', ' '] as const)('открывается при нажатии %s', key => {
		render(<Select options={options} />);
		fireEvent.keyDown(screen.getByRole('combobox'), { key });
		expect(screen.getByRole('listbox')).toBeInTheDocument();
	});

	it('открывается при нажатии ArrowDown', () => {
		render(<Select options={options} />);
		fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
		expect(screen.getByRole('listbox')).toBeInTheDocument();
	});

	it('закрывается при нажатии Escape', () => {
		render(<Select options={options} />);
		openSelect();
		fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('закрывается при клике вне компонента', () => {
		render(
			<div>
				<Select options={options} />
				<button type="button">Снаружи</button>
			</div>
		);
		openSelect();
		fireEvent.mouseDown(screen.getByRole('button', { name: 'Снаружи' }));
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('состояние error: текст и aria-invalid', () => {
		render(<Select options={options} error="Обязательное поле" />);
		expect(screen.getByRole('alert')).toHaveTextContent('Обязательное поле');
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
	});

	it('показывает вспомогательный текст', () => {
		render(<Select options={options} helperText="Выберите из списка" />);
		expect(screen.getByText('Выберите из списка')).toBeInTheDocument();
	});

	it('не показывает helperText при наличии error', () => {
		render(<Select options={options} error="Ошибка" helperText="Подсказка" />);
		expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
	});
});
