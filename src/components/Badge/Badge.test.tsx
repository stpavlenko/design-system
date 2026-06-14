import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
	it('рендерится с текстом и role="status"', () => {
		render(<Badge>Новый</Badge>);
		expect(screen.getByRole('status')).toHaveTextContent('Новый');
	});

	it.each(['success', 'warning', 'error', 'info', 'neutral'] as const)(
		'применяет variant %s',
		variant => {
			const { container } = render(<Badge variant={variant}>Текст</Badge>);
			expect((container.firstChild as HTMLElement).className).toContain(`variant-${variant}`);
		}
	);

	it('применяет variant neutral по умолчанию', () => {
		const { container } = render(<Badge>Текст</Badge>);
		expect((container.firstChild as HTMLElement).className).toContain('variant-neutral');
	});

	it.each(['sm', 'md', 'lg'] as const)('применяет size %s', size => {
		const { container } = render(<Badge size={size}>Текст</Badge>);
		expect((container.firstChild as HTMLElement).className).toContain(`size-${size}`);
	});

	it('применяет size md по умолчанию', () => {
		const { container } = render(<Badge>Текст</Badge>);
		expect((container.firstChild as HTMLElement).className).toContain('size-md');
	});

	it('рендерится как dot без текста', () => {
		const { container } = render(<Badge dot variant="error" aria-label="Ошибка" />);
		const badge = container.firstChild as HTMLElement;
		expect(badge.className).toContain('dot');
		expect(badge).toHaveTextContent('');
	});

	it('dot использует aria-label из пропа', () => {
		render(<Badge dot variant="success" aria-label="Онлайн" />);
		expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Онлайн');
	});

	it('dot использует variant как aria-label по умолчанию', () => {
		render(<Badge dot variant="error" />);
		expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'error');
	});
});
