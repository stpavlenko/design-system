import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'Components/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['success', 'warning', 'error', 'info', 'neutral'],
			description: 'Визуальный вариант бейджа',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Размер бейджа',
		},
		dot: {
			control: 'boolean',
			description: 'Отображать как точку',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Figma состояния (используются в CarCard) ─────────────────────────────────

/** Новый — success (зелёный) */
export const New: Story = {
	args: {
		children: 'Новый',
		variant: 'success',
		size: 'sm',
	},
};

/** С пробегом — neutral (серый) */
export const Used: Story = {
	args: {
		children: 'С пробегом',
		variant: 'neutral',
		size: 'sm',
	},
};

/** Скидка — warning (оранжевый) */
export const Sale: Story = {
	args: {
		children: 'Скидка',
		variant: 'warning',
		size: 'sm',
	},
};

/** Все три Figma-состояния рядом */
export const FigmaStates: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
			<Badge variant="success" size="sm">Новый</Badge>
			<Badge variant="neutral" size="sm">С пробегом</Badge>
			<Badge variant="warning" size="sm">Скидка</Badge>
		</div>
	),
};

// ─── Дополнительные ───────────────────────────────────────────────────────────

/** Все варианты */
export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
			<Badge variant="success">Успех</Badge>
			<Badge variant="warning">Внимание</Badge>
			<Badge variant="error">Ошибка</Badge>
			<Badge variant="info">Инфо</Badge>
			<Badge variant="neutral">Нейтральный</Badge>
		</div>
	),
};

/** Все размеры */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
			<Badge size="sm" variant="success">Small</Badge>
			<Badge size="md" variant="success">Medium</Badge>
			<Badge size="lg" variant="success">Large</Badge>
		</div>
	),
};

/** Точечный вариант */
export const Dots: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
			<Badge dot variant="success" aria-label="Онлайн" />
			<Badge dot variant="warning" aria-label="Отсутствует" />
			<Badge dot variant="error" aria-label="Оффлайн" />
			<Badge dot variant="info" aria-label="Занят" />
			<Badge dot variant="neutral" aria-label="Неизвестно" />
		</div>
	),
};

/** Для Storybook controls */
export const Playground: Story = {
	args: {
		children: 'Бейдж',
		variant: 'success',
		size: 'md',
	},
};
