import React from 'react';
import { Input } from './Input';

export const renders: Record<string, () => React.ReactElement> = {
    // Figma: Default — серая рамка
    default: () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Input label="Email" placeholder="Введите email" />
        </div>
    ),
    // Figma: Error — красная рамка + текст ошибки
    'with error': () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Input
                label="Email"
                placeholder="Введите email"
                defaultValue="неверный"
                error="Ошибка ввода"
            />
        </div>
    ),
    // Figma: Disabled — светлая рамка
    disabled: () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Input
                label="Email"
                placeholder="Введите email"
                disabled
                defaultValue="user@example.com"
            />
        </div>
    ),
    // Дополнительно: все размеры
    sizes: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px', padding: '16px' }}>
            <Input size="sm" label="Small" placeholder="Маленькое поле" />
            <Input size="md" label="Medium" placeholder="Среднее поле" />
            <Input size="lg" label="Large" placeholder="Большое поле" />
        </div>
    ),
    // Со вспомогательным текстом
    'with helper text': () => (
        <div style={{ width: '300px', padding: '16px' }}>
            <Input
                label="Email"
                placeholder="user@example.com"
                helperText="Мы не будем передавать ваш email"
            />
        </div>
    ),
};

const RENDERS = 'src/components/Input/Input.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Input', () => {
        // ─── Figma состояния ───────────────────────────────────────
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('focus state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.execute(() => {
                (document.querySelector('input') as HTMLInputElement)?.focus();
            });
            await browser.assertView('focus state', '#root');
        });

        it('with error', async ({ browser }) => {
            await browser.render(RENDERS, 'with error');
            await browser.assertView('with error', '#root');
        });

        it('disabled state', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled');
            await browser.assertView('disabled state', '#root');
        });

        // ─── Дополнительные ────────────────────────────────────────
        it('all sizes', async ({ browser }) => {
            await browser.render(RENDERS, 'sizes');
            await browser.assertView('all sizes', '#root');
        });

        it('with helper text', async ({ browser }) => {
            await browser.render(RENDERS, 'with helper text');
            await browser.assertView('with helper text', '#root');
        });

        it('filled state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            const input = await browser.$('input');
            await input.setValue('user@example.com');
            await browser.assertView('filled state', '#root');
        });
    });
}
