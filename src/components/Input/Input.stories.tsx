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
      description: 'Размер поля ввода',
    },
    label: {
      control: 'text',
      description: 'Подпись поля',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Стандартное поле ввода */
export const Default: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя...',
  },
};

/** С вспомогательным текстом */
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    helperText: 'Мы не будем передавать ваш email третьим лицам',
  },
};

/** С ошибкой */
export const WithError: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    error: 'Пароль должен содержать минимум 8 символов',
    defaultValue: '123',
  },
};

/** Все размеры */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input size="sm" label="Small" placeholder="Маленькое поле" />
      <Input size="md" label="Medium" placeholder="Среднее поле" />
      <Input size="lg" label="Large" placeholder="Большое поле" />
    </div>
  ),
};

/** Неактивное состояние */
export const Disabled: Story = {
  args: {
    label: 'Неактивное поле',
    placeholder: 'Нельзя редактировать',
    disabled: true,
    defaultValue: 'Заблокировано',
  },
};
