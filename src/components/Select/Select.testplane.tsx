import React from 'react';
import { Select } from './Select';

const carOptions = [
  { value: 'bmw', label: 'BMW' },
  { value: 'chery', label: 'Chery' },
  { value: 'chevrolet', label: 'Chevrolet' },
];

export const renders: Record<string, () => React.ReactElement> = {
    // Figma: Default — закрытый без значения
    default: () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                placeholder="Выберите марку из списка"
            />
        </div>
    ),
    // Figma: With value — с выбранным значением
    'with value': () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                value="bmw"
            />
        </div>
    ),
    // Figma: Disabled — неактивное состояние
    disabled: () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                placeholder="Выберите марку из списка"
                disabled
            />
        </div>
    ),
    // Figma: Error — красная рамка
    'with error': () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                error="Выберите марку из списка"
            />
        </div>
    ),
    // Открытый список (для скриншота нужен extra padding снизу)
    'open state': () => (
        <div style={{ width: '300px', padding: '16px', paddingBottom: '200px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                placeholder="Выберите марку из списка"
            />
        </div>
    ),
    // Открытый список с выбранной опцией — галочка слева
    'open with selection': () => (
        <div style={{ width: '300px', padding: '16px', paddingBottom: '200px' }}>
            <Select
                label="Марка автомобиля"
                options={carOptions}
                value="bmw"
            />
        </div>
    ),
};

const RENDERS = 'src/components/Select/Select.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Select', () => {
        // ─── Figma состояния ───────────────────────────────────────
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('with value', async ({ browser }) => {
            await browser.render(RENDERS, 'with value');
            await browser.assertView('with value', '#root');
        });

        it('disabled state', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled');
            await browser.assertView('disabled state', '#root');
        });

        it('with error', async ({ browser }) => {
            await browser.render(RENDERS, 'with error');
            await browser.assertView('with error', '#root');
        });

        it('open state', async ({ browser }) => {
            await browser.render(RENDERS, 'open state');
            await browser.execute(() => {
                const combobox = document.querySelector('[role="combobox"]') as HTMLElement;
                combobox?.click();
            });
            await browser.assertView('open state', '#root');
        });

        // ─── Галочка слева ─────────────────────────────────────────
        it('open with selection — checkmark on left', async ({ browser }) => {
            await browser.render(RENDERS, 'open with selection');
            await browser.execute(() => {
                const combobox = document.querySelector('[role="combobox"]') as HTMLElement;
                combobox?.click();
            });
            await browser.assertView('open with selection', '#root');
        });
    });
}
