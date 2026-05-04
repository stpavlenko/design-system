import React from 'react';
import { Card } from './Card';
import { Button } from '../Button/Button';

export const renders: Record<string, () => React.ReactElement> = {
    default: () => (
        <Card
            variant="elevated"
            title="Компонент Button"
            description="Основной интерактивный элемент дизайн-системы с поддержкой 4 вариантов и 3 размеров."
        />
    ),
    'with image': () => (
        <Card
            variant="elevated"
            title="Дизайн-система"
            description="Набор переиспользуемых компонентов для создания консистентных интерфейсов."
            image="https://placehold.co/600x200/0066FF/FFFFFF?text=Design+System"
            imageAlt="Превью дизайн-системы"
        />
    ),
    'with actions': () => (
        <Card
            variant="outlined"
            title="Карточка с действиями"
            description="Пример карточки с кнопками в футере."
            actions={
                <>
                    <Button variant="primary" size="sm">Подробнее</Button>
                    <Button variant="ghost" size="sm">Отмена</Button>
                </>
            }
        />
    ),
    'all variants': () => (
        <div style={{ display: 'flex', gap: '16px', maxWidth: '900px' }}>
            <Card variant="elevated" title="Elevated" description="Карточка с тенью" />
            <Card variant="outlined" title="Outlined" description="Карточка с рамкой" />
            <Card variant="filled" title="Filled" description="Карточка с заливкой" />
        </div>
    ),
};

const RENDERS = 'src/components/Card/Card.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Card', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('with image', async ({ browser }) => {
            await browser.render(RENDERS, 'with image');
            await browser.assertView('with image', '#root');
        });

        it('with actions', async ({ browser }) => {
            await browser.render(RENDERS, 'with actions');
            await browser.assertView('with actions', '#root');
        });

        it('all variants', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('hover state on elevated', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            const card = await browser.$('article');
            await card.moveTo();
            await browser.pause(300);
            await browser.assertView('hover state on elevated', '#root');
        });
    });
}
