import React from 'react';
import { Badge } from './Badge';

export const renders: Record<string, () => React.ReactElement> = {
    default: () => <Badge variant="info">Новый</Badge>,
    'all variants': () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Badge variant="success">Успех</Badge>
            <Badge variant="warning">Внимание</Badge>
            <Badge variant="error">Ошибка</Badge>
            <Badge variant="info">Инфо</Badge>
            <Badge variant="neutral">Нейтральный</Badge>
        </div>
    ),
    sizes: () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Badge size="sm" variant="info">Small</Badge>
            <Badge size="md" variant="info">Medium</Badge>
            <Badge size="lg" variant="info">Large</Badge>
        </div>
    ),
    dots: () => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
            <Badge dot variant="success" aria-label="Онлайн" />
            <Badge dot variant="warning" aria-label="Отсутствует" />
            <Badge dot variant="error" aria-label="Оффлайн" />
            <Badge dot variant="info" aria-label="Занят" />
            <Badge dot variant="neutral" aria-label="Неизвестно" />
        </div>
    ),
};

const RENDERS = 'src/components/Badge/Badge.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Badge', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('all variants', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('all sizes', async ({ browser }) => {
            await browser.render(RENDERS, 'sizes');
            await browser.assertView('all sizes', '#root');
        });

        it('dot variants', async ({ browser }) => {
            await browser.render(RENDERS, 'dots');
            await browser.assertView('dot variants', '#root');
        });
    });
}
