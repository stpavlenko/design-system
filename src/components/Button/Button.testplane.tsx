import React from 'react';
import { Button } from './Button';

export const renders: Record<string, () => React.ReactElement> = {
    // Figma: Primary MD
    'primary md': () => <Button variant="primary" size="md">Primary</Button>,
    // Figma: Primary SM
    'primary sm': () => <Button variant="primary" size="sm">Primary</Button>,
    // Figma: Secondary MD
    'secondary md': () => <Button variant="secondary" size="md">Secondary</Button>,
    // Figma: Secondary SM
    'secondary sm': () => <Button variant="secondary" size="sm">Secondary</Button>,
    // Figma: Ghost MD
    'ghost md': () => <Button variant="ghost" size="md">Ghost</Button>,
    // Figma: Ghost SM
    'ghost sm': () => <Button variant="ghost" size="sm">Ghost</Button>,
    // Все варианты рядом
    'all variants': () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    ),
    // Все размеры
    'all sizes': () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Button variant="primary" size="sm">SM</Button>
            <Button variant="primary" size="md">MD</Button>
            <Button variant="primary" size="lg">LG</Button>
        </div>
    ),
    // Disabled — opacity 30% (Figma)
    'disabled primary': () => <Button variant="primary" size="md" disabled>Primary</Button>,
    'disabled secondary': () => <Button variant="secondary" size="md" disabled>Secondary</Button>,
    'disabled ghost': () => <Button variant="ghost" size="md" disabled>Ghost</Button>,
    // Loading
    loading: () => <Button variant="primary" loading>Загрузка</Button>,
};

const RENDERS = 'src/components/Button/Button.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Button', () => {
        // ─── Primary ───────────────────────────────────────────────
        it('primary variant MD', async ({ browser }) => {
            await browser.render(RENDERS, 'primary md');
            await browser.assertView('primary variant', '#root');
        });

        it('primary variant SM', async ({ browser }) => {
            await browser.render(RENDERS, 'primary sm');
            await browser.assertView('primary variant SM', '#root');
        });

        it('primary hover state', async ({ browser }) => {
            await browser.render(RENDERS, 'primary md');
            await (await browser.$('button')).moveTo();
            await browser.pause(150);
            await browser.assertView('hover state', '#root');
        });

        // ─── Secondary ─────────────────────────────────────────────
        it('secondary variant MD', async ({ browser }) => {
            await browser.render(RENDERS, 'secondary md');
            await browser.assertView('secondary variant', '#root');
        });

        it('secondary variant SM', async ({ browser }) => {
            await browser.render(RENDERS, 'secondary sm');
            await browser.assertView('secondary variant SM', '#root');
        });

        it('secondary hover state', async ({ browser }) => {
            await browser.render(RENDERS, 'secondary md');
            await (await browser.$('button')).moveTo();
            await browser.pause(150);
            await browser.assertView('secondary hover state', '#root');
        });

        // ─── Ghost ─────────────────────────────────────────────────
        it('ghost variant MD', async ({ browser }) => {
            await browser.render(RENDERS, 'ghost md');
            await browser.assertView('ghost variant', '#root');
        });

        it('ghost variant SM', async ({ browser }) => {
            await browser.render(RENDERS, 'ghost sm');
            await browser.assertView('ghost variant SM', '#root');
        });

        it('ghost hover state', async ({ browser }) => {
            await browser.render(RENDERS, 'ghost md');
            await (await browser.$('button')).moveTo();
            await browser.pause(150);
            await browser.assertView('ghost hover state', '#root');
        });

        // ─── Все варианты и размеры ────────────────────────────────
        it('all variants', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('all sizes', async ({ browser }) => {
            await browser.render(RENDERS, 'all sizes', '#root');
            await browser.assertView('all sizes', '#root');
        });

        // ─── Disabled ──────────────────────────────────────────────
        it('disabled primary', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled primary');
            await browser.assertView('disabled state', '#root');
        });

        it('disabled secondary', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled secondary');
            await browser.assertView('disabled secondary', '#root');
        });

        it('disabled ghost', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled ghost');
            await browser.assertView('disabled ghost', '#root');
        });

        // ─── Loading ───────────────────────────────────────────────
        it('loading state', async ({ browser }) => {
            await browser.render(RENDERS, 'loading');
            await browser.assertView('loading state', '#root');
        });

        // ─── Focus ─────────────────────────────────────────────────
        it('focus state', async ({ browser }) => {
            await browser.render(RENDERS, 'primary md');
            await browser.execute(() => {
                (document.querySelector('button') as HTMLButtonElement)?.focus();
            });
            await browser.assertView('focus state', '#root');
        });
    });
}
