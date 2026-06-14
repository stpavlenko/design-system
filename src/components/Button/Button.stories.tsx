import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost', 'outline'],
			description: 'Визуальный вариант (Figma: primary, secondary, ghost)',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Размер (Figma: sm=32px, md=40px)',
		},
		loading: {
			control: 'boolean',
			description: 'Состояние загрузки',
		},
		disabled: {
			control: 'boolean',
			description: 'Неактивное состояние (opacity 30%)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Основные варианты по Figma ───────────────────────────────────────────────

/** Primary — синяя заливка. Default, Hover, Disabled */
export const Primary: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: MD</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="primary" size="md">Primary</Button>
					<Button variant="primary" size="md" disabled>Primary</Button>
				</div>
			</div>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: SM</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="primary" size="sm">Primary</Button>
					<Button variant="primary" size="sm" disabled>Primary</Button>
				</div>
			</div>
		</div>
	),
};

/** Secondary — белый фон + синяя рамка. Default, Hover, Disabled */
export const Secondary: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: MD</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="secondary" size="md">Secondary</Button>
					<Button variant="secondary" size="md" disabled>Secondary</Button>
				</div>
			</div>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: SM</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="secondary" size="sm">Secondary</Button>
					<Button variant="secondary" size="sm" disabled>Secondary</Button>
				</div>
			</div>
		</div>
	),
};

/** Ghost — без фона и рамки. Default, Hover, Disabled */
export const Ghost: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: MD</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="ghost" size="md">Ghost</Button>
					<Button variant="ghost" size="md" disabled>Ghost</Button>
				</div>
			</div>
			<div>
				<p style={{ fontSize: 12, color: '#868e96', marginBottom: 8 }}>size: SM</p>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<Button variant="ghost" size="sm">Ghost</Button>
					<Button variant="ghost" size="sm" disabled>Ghost</Button>
				</div>
			</div>
		</div>
	),
};

// ─── Все варианты и размеры ────────────────────────────────────────────────────

/** Все три Figma-варианта рядом */
export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	),
};

/** Размеры SM и MD (Figma) */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
				<Button variant="primary" size="md">MD · 40px</Button>
				<Button variant="secondary" size="md">MD · 40px</Button>
				<Button variant="ghost" size="md">MD · 40px</Button>
			</div>
			<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
				<Button variant="primary" size="sm">SM · 32px</Button>
				<Button variant="secondary" size="sm">SM · 32px</Button>
				<Button variant="ghost" size="sm">SM · 32px</Button>
			</div>
		</div>
	),
};

/** Disabled — opacity 30% для всех вариантов */
export const DisabledAll: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
			<Button variant="primary" disabled>Primary</Button>
			<Button variant="secondary" disabled>Secondary</Button>
			<Button variant="ghost" disabled>Ghost</Button>
		</div>
	),
};

// ─── Прочие состояния ─────────────────────────────────────────────────────────

/** Состояние загрузки */
export const Loading: Story = {
	args: {
		variant: 'primary',
		loading: true,
		children: 'Загрузка...',
	},
};

/** Одиночный вариант для Storybook controls */
export const Playground: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		children: 'Кнопка',
	},
};
