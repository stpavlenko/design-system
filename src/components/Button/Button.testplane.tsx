import React from 'react';
import { Button } from './Button';

export const renders: Record<string, () => React.ReactElement> = {
    primary: () => <Button variant="primary">Кнопка</Button>,
    secondary: () => <Button variant="secondary">Кнопка</Button>,
    outline: () => <Button variant="outline">Кнопка</Button>,
    ghost: () => <Button variant="ghost">Кнопка</Button>,
    sizes: () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
        </div>
    ),
    'all variants': () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    ),
    loading: () => <Button variant="primary" loading>Загрузка</Button>,
    disabled: () => <Button variant="primary" disabled>Отключено</Button>,
};

const RENDERS = 'src/components/Button/Button.testplane.tsx';

// Guard: describe/it are testplane globals, undefined in browser bundle
if (typeof describe !== 'undefined') {
    describe('Button', () => {
        it('primary variant', async ({ browser }) => {
            await browser.render(RENDERS, 'primary');
            await browser.assertView('primary variant', '#root');
        });

        it('secondary variant', async ({ browser }) => {
            await browser.render(RENDERS, 'secondary');
            await browser.assertView('secondary variant', '#root');
        });

        it('outline variant', async ({ browser }) => {
            await browser.render(RENDERS, 'outline');
            await browser.assertView('outline variant', '#root');
        });

        it('ghost variant', async ({ browser }) => {
            await browser.render(RENDERS, 'ghost');
            await browser.assertView('ghost variant', '#root');
        });

        it('all sizes', async ({ browser }) => {
            await browser.render(RENDERS, 'sizes');
            await browser.assertView('all sizes', '#root');
        });

        it('all variants', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('loading state', async ({ browser }) => {
            await browser.render(RENDERS, 'loading');
            await browser.assertView('loading state', '#root');
        });

        it('disabled state', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled');
            await browser.assertView('disabled state', '#root');
        });

        it('focus state', async ({ browser }) => {
            await browser.render(RENDERS, 'primary');
            await browser.execute(() => {
                (document.querySelector('button') as HTMLButtonElement)?.focus();
            });
            await browser.assertView('focus state', '#root');
        });

        it('hover state', async ({ browser }) => {
            await browser.render(RENDERS, 'primary');
            const button = await browser.$('button');
            await button.moveTo();
            await browser.pause(200);
            await browser.assertView('hover state', '#root');
        });
    });
}
