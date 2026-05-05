import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст подписи',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние выбора',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Неопределённое состояние',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** Стандартный чекбокс */
export const Default: Story = {
  args: {
    label: 'Согласен с условиями',
  },
};

/** Отмеченный */
export const Checked: Story = {
  args: {
    label: 'Согласен с условиями',
    checked: true,
    onChange: () => {},
  },
};

/** Неопределённое состояние */
export const Indeterminate: Story = {
  args: {
    label: 'Выбрать всё',
    indeterminate: true,
  },
};

/** Неактивный */
export const Disabled: Story = {
  args: {
    label: 'Заблокированный пункт',
    disabled: true,
  },
};

/** Неактивный отмеченный */
export const DisabledChecked: Story = {
  args: {
    label: 'Заблокированный отмеченный',
    disabled: true,
    checked: true,
    onChange: () => {},
  },
};

/** С ошибкой */
export const WithError: Story = {
  args: {
    label: 'Согласен с условиями',
    error: 'Необходимо принять условия для продолжения',
  },
};

/** С вспомогательным текстом */
export const WithHelperText: Story = {
  args: {
    label: 'Подписаться на рассылку',
    helperText: 'Мы не будем отправлять спам',
  },
};

/** Все состояния */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
      <Checkbox label="Disabled" disabled />
    </div>
  ),
};

/** Управляемый */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={checked ? 'Отмечен' : 'Не отмечен'}
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
    );
  },
};
