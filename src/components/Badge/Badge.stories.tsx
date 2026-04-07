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

/** Стандартный бейдж */
export const Default: Story = {
  args: {
    children: 'Новый',
    variant: 'info',
  },
};

/** Все варианты */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm" variant="info">Small</Badge>
      <Badge size="md" variant="info">Medium</Badge>
      <Badge size="lg" variant="info">Large</Badge>
    </div>
  ),
};

/** Точечный вариант */
export const Dots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge dot variant="success" aria-label="Онлайн" />
      <Badge dot variant="warning" aria-label="Отсутствует" />
      <Badge dot variant="error" aria-label="Оффлайн" />
      <Badge dot variant="info" aria-label="Занят" />
      <Badge dot variant="neutral" aria-label="Неизвестно" />
    </div>
  ),
};
