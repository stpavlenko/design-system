import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Визуальный вариант карточки',
    },
    title: {
      control: 'text',
      description: 'Заголовок',
    },
    description: {
      control: 'text',
      description: 'Описание',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/** Стандартная карточка */
export const Default: Story = {
  args: {
    title: 'Компонент Button',
    description: 'Основной интерактивный элемент дизайн-системы с поддержкой 4 вариантов и 3 размеров.',
    variant: 'elevated',
  },
};

/** С изображением */
export const WithImage: Story = {
  args: {
    title: 'Дизайн-система',
    description: 'Набор переиспользуемых компонентов для создания консистентных интерфейсов.',
    image: 'https://placehold.co/600x200/0066FF/FFFFFF?text=Design+System',
    imageAlt: 'Превью дизайн-системы',
    variant: 'elevated',
  },
};

/** С действиями */
export const WithActions: Story = {
  args: {
    title: 'Карточка с действиями',
    description: 'Пример карточки с кнопками в футере.',
    variant: 'outlined',
    actions: (
      <>
        <Button variant="primary" size="sm">Подробнее</Button>
        <Button variant="ghost" size="sm">Отмена</Button>
      </>
    ),
  },
};

/** Все варианты */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '900px' }}>
      <Card
        variant="elevated"
        title="Elevated"
        description="Карточка с тенью"
      />
      <Card
        variant="outlined"
        title="Outlined"
        description="Карточка с рамкой"
      />
      <Card
        variant="filled"
        title="Filled"
        description="Карточка с заливкой"
      />
    </div>
  ),
};
