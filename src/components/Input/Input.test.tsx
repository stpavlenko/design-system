import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
	it('рендерит нативный input с placeholder', () => {
		render(<Input placeholder="Введите email" />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument();
	});

	it('связывает label и input', () => {
		render(<Input label="Email" />);
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
	});

	it('не отображает label когда не передан', () => {
		const { container } = render(<Input />);
		expect(container.querySelector('label')).not.toBeInTheDocument();
	});

	it.each(['sm', 'md', 'lg'] as const)('применяет size %s', size => {
		const { container } = render(<Input size={size} />);
		expect(container.querySelector(`.size-${size}`)).toBeInTheDocument();
	});

	it('применяет size md по умолчанию', () => {
		const { container } = render(<Input />);
		expect(container.querySelector('.size-md')).toBeInTheDocument();
	});

	it('состояние error: текст, класс, aria-invalid и aria-describedby', () => {
		const { container } = render(<Input label="Тест" error="Ошибка" />);
		const input = screen.getByLabelText('Тест');
		expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
		expect(container.querySelector('.error')).toBeInTheDocument();
		expect(input).toHaveAttribute('aria-invalid', 'true');
		const errorEl = document.getElementById(input.getAttribute('aria-describedby')!);
		expect(errorEl).toHaveTextContent('Ошибка');
	});

	it('не имеет aria-invalid без ошибки', () => {
		render(<Input label="Тест" />);
		expect(screen.getByLabelText('Тест')).not.toHaveAttribute('aria-invalid');
	});

	it('показывает вспомогательный текст и связывает через aria-describedby', () => {
		render(<Input label="Тест" helperText="Подсказка" />);
		const input = screen.getByLabelText('Тест');
		expect(screen.getByText('Подсказка')).toBeInTheDocument();
		const helperEl = document.getElementById(input.getAttribute('aria-describedby')!);
		expect(helperEl).toHaveTextContent('Подсказка');
	});

	it('не показывает helperText при наличии error', () => {
		render(<Input error="Ошибка" helperText="Подсказка" />);
		expect(screen.queryByText('Подсказка')).not.toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveTextContent('Ошибка');
	});

	it('disabled состояние блокирует поле и применяет класс', () => {
		const { container } = render(<Input label="Тест" disabled />);
		expect(screen.getByLabelText('Тест')).toBeDisabled();
		expect(container.querySelector('.disabled')).toBeInTheDocument();
	});

	it('рендерит leftIcon и rightIcon', () => {
		render(
			<Input
				leftIcon={<span data-testid="icon-l" />}
				rightIcon={<span data-testid="icon-r" />}
			/>
		);
		expect(screen.getByTestId('icon-l')).toBeInTheDocument();
		expect(screen.getByTestId('icon-r')).toBeInTheDocument();
	});

	it('обновляет значение при вводе', () => {
		render(<Input label="Email" defaultValue="" />);
		const input = screen.getByLabelText('Email') as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'test@example.com' } });
		expect(input.value).toBe('test@example.com');
	});
});
