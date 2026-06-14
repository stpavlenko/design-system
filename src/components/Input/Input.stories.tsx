import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Размер поля (Figma: md=40px)',
		},
		label: {
			control: 'text',
			description: 'Подпись поля (xs, neutral-700)',
		},
		error: {
			control: 'text',
			description: 'Текст ошибки (красная рамка + текст снизу)',
		},
		helperText: {
			control: 'text',
			description: 'Вспомогательный текст',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled (только светлая рамка neutral-100)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Figma состояния ──────────────────────────────────────────────────────────

/** Default — серая рамка neutral-300 */
export const Default: Story = {
	args: {
		label: 'Email',
		placeholder: 'Введите email',
	},
};

/** Focus — синяя рамка primary-500 */
export const Focus: Story = {
	render: () => (
		<div style={{ width: 300 }}>
			<Input label="Email" placeholder="Введите email" autoFocus />
		</div>
	),
};

/** Error — красная рамка error-500 + текст ошибки */
export const Error: Story = {
	args: {
		label: 'Email',
		placeholder: 'Введите email',
		defaultValue: 'неверный-email',
		error: 'Ошибка ввода',
	},
};

/** Disabled — светлая рамка neutral-100, курсор not-allowed */
export const Disabled: Story = {
	args: {
		label: 'Email',
		placeholder: 'Введите email',
		disabled: true,
		defaultValue: 'user@example.com',
	},
};

/** Все 4 Figma-состояния рядом */
export const FigmaStates: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
			<Input label="Default" placeholder="Введите email" />
			<Input label="Error" placeholder="Введите email" defaultValue="неверный" error="Ошибка ввода" />
			<Input label="Disabled" placeholder="Введите email" disabled />
		</div>
	),
};

// ─── Дополнительные ───────────────────────────────────────────────────────────

/** С вспомогательным текстом */
export const WithHelperText: Story = {
	args: {
		label: 'Email',
		placeholder: 'user@example.com',
		helperText: 'Мы не будем передавать ваш email третьим лицам',
	},
};

/** Все размеры */
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
			<Input size="sm" label="Small · 32px" placeholder="Маленькое поле" />
			<Input size="md" label="Medium · 40px" placeholder="Среднее поле" />
			<Input size="lg" label="Large · 48px" placeholder="Большое поле" />
		</div>
	),
};

/** Для Storybook controls */
export const Playground: Story = {
	args: {
		label: 'Поле ввода',
		placeholder: 'Введите текст...',
	},
};
