import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Визуальный вариант кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Основной вариант кнопки */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Кнопка',
  },
};

/** Вторичный вариант */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Кнопка',
  },
};

/** Контурный вариант */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Кнопка',
  },
};

/** Призрачный вариант */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Кнопка',
  },
};

/** Все размеры */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** Все варианты */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/** Состояние загрузки */
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Загрузка...',
  },
};

/** Неактивное состояние */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Неактивна',
  },
};
