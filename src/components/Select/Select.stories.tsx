import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const carOptions = [
  { value: 'bmw', label: 'BMW' },
  { value: 'chery', label: 'Chery' },
  { value: 'chevrolet', label: 'Chevrolet' },
  { value: 'toyota', label: 'Toyota' },
  { value: 'honda', label: 'Honda' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Подпись поля',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
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
      description: 'Неактивное состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ─── Figma состояния ──────────────────────────────────────────────────────────

/** Default — закрытый без значения */
export const Default: Story = {
  args: {
    label: 'Марка автомобиля',
    placeholder: 'Выберите марку из списка',
    options: carOptions,
  },
};

/** С выбранным значением (галочка слева) */
export const WithValue: Story = {
  args: {
    label: 'Марка автомобиля',
    options: carOptions,
    value: 'bmw',
  },
};

/** Disabled — неактивное состояние */
export const Disabled: Story = {
  args: {
    label: 'Марка автомобиля',
    placeholder: 'Выберите марку из списка',
    options: carOptions,
    disabled: true,
  },
};

/** Error — красная рамка + текст ошибки */
export const WithError: Story = {
  args: {
    label: 'Марка автомобиля',
    placeholder: 'Выберите марку из списка',
    options: carOptions,
    error: 'Выберите марку из списка',
  },
};

/** Открытый список с выделенной опцией (галочка слева) */
export const OpenWithSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('bmw');
    return (
      <div style={{ width: '300px', padding: '16px', paddingBottom: '200px' }}>
        <Select
          label="Марка автомобиля"
          options={carOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// ─── Дополнительные ───────────────────────────────────────────────────────────

/** С вспомогательным текстом */
export const WithHelperText: Story = {
  args: {
    label: 'Марка автомобиля',
    placeholder: 'Выберите марку из списка',
    options: carOptions,
    helperText: 'Начните вводить для поиска',
  },
};

/** Управляемый компонент */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={{ width: '300px', padding: '16px' }}>
        <Select
          label="Марка автомобиля"
          options={carOptions}
          value={value}
          onChange={setValue}
          placeholder="Выберите марку из списка"
        />
        {value && (
          <p style={{ marginTop: '8px', fontSize: '14px' }}>
            Выбрано: {carOptions.find(o => o.value === value)?.label}
          </p>
        )}
      </div>
    );
  },
};

/** Для Storybook controls */
export const Playground: Story = {
  args: {
    label: 'Марка автомобиля',
    placeholder: 'Выберите марку из списка',
    options: carOptions,
  },
};
