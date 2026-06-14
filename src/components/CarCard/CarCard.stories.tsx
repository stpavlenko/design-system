import type { Meta, StoryObj } from '@storybook/react';
import { CarCard } from './CarCard';

const meta: Meta<typeof CarCard> = {
	title: 'Components/CarCard',
	component: CarCard,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text', description: 'Название автомобиля' },
		subtitle: { control: 'text', description: 'Характеристики' },
		price: { control: 'text', description: 'Цена' },
		badge: {
			control: 'select',
			options: [undefined, 'new', 'used', 'sale'],
			description: 'Тип бейджа',
		},
		buttonVariant: {
			control: 'select',
			options: ['primary', 'secondary', 'ghost'],
			description: 'Вариант кнопки',
		},
		buttonDisabled: {
			control: 'boolean',
			description: 'Заблокировать кнопку',
		},
		buttonLabel: { control: 'text', description: 'Текст кнопки' },
		image: { control: 'text', description: 'URL изображения' },
		imageAlt: { control: 'text', description: 'Alt изображения' },
	},
};

export default meta;
type Story = StoryObj<typeof CarCard>;

/** Новый автомобиль с кнопкой ghost */
export const NewGhost: Story = {
	args: {
		title: 'Toyota Camry',
		subtitle: '2020 · 40 000 км · 2.5 л',
		price: '2 300 000 ₽',
		badge: 'new',
		buttonVariant: 'ghost',
		buttonLabel: 'Подробнее',
	},
};

/** С пробегом, кнопка primary заблокирована */
export const UsedPrimaryDisabled: Story = {
	args: {
		title: 'Toyota Camry',
		subtitle: '2020 · 40 000 км · 2.5 л',
		price: '2 300 000 ₽',
		badge: 'used',
		buttonVariant: 'primary',
		buttonDisabled: true,
		buttonLabel: 'Подробнее',
	},
};

/** Скидка, кнопка secondary заблокирована */
export const SaleSecondaryDisabled: Story = {
	args: {
		title: 'Toyota Camry',
		subtitle: '2020 · 40 000 км · 2.5 л',
		price: '2 300 000 ₽',
		badge: 'sale',
		buttonVariant: 'secondary',
		buttonDisabled: true,
		buttonLabel: 'Подробнее',
	},
};

/** Все варианты рядом */
export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			<CarCard
				badge="new"
				buttonVariant="ghost"
				title="Toyota Camry"
				subtitle="2020 · 40 000 км · 2.5 л"
				price="2 300 000 ₽"
				buttonLabel="Подробнее"
			/>
			<CarCard
				badge="used"
				buttonVariant="primary"
				buttonDisabled
				title="Toyota Camry"
				subtitle="2020 · 40 000 км · 2.5 л"
				price="2 300 000 ₽"
				buttonLabel="Подробнее"
			/>
			<CarCard
				badge="sale"
				buttonVariant="secondary"
				buttonDisabled
				title="Toyota Camry"
				subtitle="2020 · 40 000 км · 2.5 л"
				price="2 300 000 ₽"
				buttonLabel="Подробнее"
			/>
		</div>
	),
};

/** С изображением */
export const WithImage: Story = {
	args: {
		title: 'BMW X5',
		subtitle: '2022 · 15 000 км · 3.0 л',
		price: '7 500 000 ₽',
		badge: 'new',
		image: 'https://placehold.co/240x160/E9ECEF/495057?text=BMW+X5',
		imageAlt: 'BMW X5 серого цвета',
		buttonVariant: 'primary',
		buttonLabel: 'Подробнее',
	},
};
