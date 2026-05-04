import React from 'react';
import { Input } from './Input';

export const renders: Record<string, () => React.ReactElement> = {
    default: () => <Input label="Имя пользователя" placeholder="Введите имя..." />,
    'with helper text': () => (
        <Input
            label="Email"
            placeholder="user@example.com"
            helperText="Мы не будем передавать ваш email третьим лицам"
        />
    ),
    'with error': () => (
        <Input
            label="Пароль"
            type="password"
            error="Пароль должен содержать минимум 8 символов"
            defaultValue="123"
        />
    ),
    sizes: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
            <Input size="sm" label="Small" placeholder="Маленькое поле" />
            <Input size="md" label="Medium" placeholder="Среднее поле" />
            <Input size="lg" label="Large" placeholder="Большое поле" />
        </div>
    ),
    disabled: () => (
        <Input
            label="Неактивное поле"
            placeholder="Нельзя редактировать"
            disabled
            defaultValue="Заблокировано"
        />
    ),
};

const RENDERS = 'src/components/Input/Input.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Input', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('with helper text', async ({ browser }) => {
            await browser.render(RENDERS, 'with helper text');
            await browser.assertView('with helper text', '#root');
        });

        it('with error', async ({ browser }) => {
            await browser.render(RENDERS, 'with error');
            await browser.assertView('with error', '#root');
        });

        it('all sizes', async ({ browser }) => {
            await browser.render(RENDERS, 'sizes');
            await browser.assertView('all sizes', '#root');
        });

        it('disabled state', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled');
            await browser.assertView('disabled state', '#root');
        });

        it('focus state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.execute(() => {
                (document.querySelector('input') as HTMLInputElement)?.focus();
            });
            await browser.assertView('focus state', '#root');
        });

        it('filled state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            const input = await browser.$('input');
            await input.setValue('Тестовое значение');
            await browser.assertView('filled state', '#root');
        });
    });
}
