import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
	it('рендерится с текстом и type="button" по умолчанию', () => {
		render(<Button>Нажми</Button>);
		const button = screen.getByRole('button', { name: 'Нажми' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('type', 'button');
	});

	it.each(['primary', 'secondary', 'ghost', 'outline'] as const)(
		'применяет variant %s',
		variant => {
			const { container } = render(<Button variant={variant}>Тест</Button>);
			expect((container.firstChild as HTMLElement).className).toContain(`variant-${variant}`);
		}
	);

	it('применяет variant primary по умолчанию', () => {
		const { container } = render(<Button>Тест</Button>);
		expect((container.firstChild as HTMLElement).className).toContain('variant-primary');
	});

	it.each(['sm', 'md', 'lg'] as const)('применяет size %s', size => {
		const { container } = render(<Button size={size}>Тест</Button>);
		expect((container.firstChild as HTMLElement).className).toContain(`size-${size}`);
	});

	it('применяет size md по умолчанию', () => {
		const { container } = render(<Button>Тест</Button>);
		expect((container.firstChild as HTMLElement).className).toContain('size-md');
	});

	it('вызывает onClick при клике', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Клик</Button>);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('не вызывает onClick когда disabled', () => {
		const handleClick = jest.fn();
		render(
			<Button disabled onClick={handleClick}>
				Клик
			</Button>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('disabled состояние: атрибут, aria-disabled и класс', () => {
		const { container } = render(<Button disabled>Тест</Button>);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-disabled', 'true');
		expect((container.firstChild as HTMLElement).className).toContain('disabled');
	});

	it('loading состояние: aria-busy, disabled, класс и спиннер', () => {
		const { container } = render(<Button loading>Загрузка</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(button).toBeDisabled();
		expect((container.firstChild as HTMLElement).className).toContain('loading');
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('не вызывает onClick когда loading', () => {
		const handleClick = jest.fn();
		render(
			<Button loading onClick={handleClick}>
				Клик
			</Button>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('рендерит leftIcon и rightIcon', () => {
		render(
			<Button
				leftIcon={<span data-testid="icon-left" />}
				rightIcon={<span data-testid="icon-right" />}
			>
				Тест
			</Button>
		);
		expect(screen.getByTestId('icon-left')).toBeInTheDocument();
		expect(screen.getByTestId('icon-right')).toBeInTheDocument();
	});

	it('скрывает иконки при loading', () => {
		render(
			<Button
				loading
				leftIcon={<span data-testid="icon-left" />}
				rightIcon={<span data-testid="icon-right" />}
			>
				Тест
			</Button>
		);
		expect(screen.queryByTestId('icon-left')).not.toBeInTheDocument();
		expect(screen.queryByTestId('icon-right')).not.toBeInTheDocument();
	});
});
