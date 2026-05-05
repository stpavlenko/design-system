import React from 'react';
import { Badge } from './Badge';

export const renders: Record<string, () => React.ReactElement> = {
    // Figma: Новый (в CarCard)
    'figma new': () => (
        <div style={{ padding: '16px' }}>
            <Badge variant="success" size="sm">Новый</Badge>
        </div>
    ),
    // Figma: С пробегом (в CarCard)
    'figma used': () => (
        <div style={{ padding: '16px' }}>
            <Badge variant="neutral" size="sm">С пробегом</Badge>
        </div>
    ),
    // Figma: Скидка (в CarCard)
    'figma sale': () => (
        <div style={{ padding: '16px' }}>
            <Badge variant="warning" size="sm">Скидка</Badge>
        </div>
    ),
    // Все три Figma-состояния рядом
    'figma states': () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Badge variant="success" size="sm">Новый</Badge>
            <Badge variant="neutral" size="sm">С пробегом</Badge>
            <Badge variant="warning" size="sm">Скидка</Badge>
        </div>
    ),
    // Все варианты
    'all variants': () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Badge variant="success">Успех</Badge>
            <Badge variant="warning">Внимание</Badge>
            <Badge variant="error">Ошибка</Badge>
            <Badge variant="info">Инфо</Badge>
            <Badge variant="neutral">Нейтральный</Badge>
        </div>
    ),
    // Все размеры
    sizes: () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Badge size="sm" variant="success">Small</Badge>
            <Badge size="md" variant="success">Medium</Badge>
            <Badge size="lg" variant="success">Large</Badge>
        </div>
    ),
    // Точки
    dots: () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Badge dot variant="success" aria-label="Онлайн" />
            <Badge dot variant="warning" aria-label="Отсутствует" />
            <Badge dot variant="error" aria-label="Оффлайн" />
            <Badge dot variant="neutral" aria-label="Неизвестно" />
        </div>
    ),
};

const RENDERS = 'src/components/Badge/Badge.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Badge', () => {
        // ─── Figma состояния ───────────────────────────────────────
        it('figma: Новый (success)', async ({ browser }) => {
            await browser.render(RENDERS, 'figma new');
            await browser.assertView('figma new', '#root');
        });

        it('figma: С пробегом (neutral)', async ({ browser }) => {
            await browser.render(RENDERS, 'figma used');
            await browser.assertView('figma used', '#root');
        });

        it('figma: Скидка (warning)', async ({ browser }) => {
            await browser.render(RENDERS, 'figma sale');
            await browser.assertView('figma sale', '#root');
        });

        it('все Figma состояния', async ({ browser }) => {
            await browser.render(RENDERS, 'figma states');
            await browser.assertView('figma states', '#root');
        });

        // ─── Дополнительные ────────────────────────────────────────
        it('все варианты', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('все размеры', async ({ browser }) => {
            await browser.render(RENDERS, 'sizes');
            await browser.assertView('all sizes', '#root');
        });

        it('точечный вариант', async ({ browser }) => {
            await browser.render(RENDERS, 'dots');
            await browser.assertView('dots', '#root');
        });
    });
}
