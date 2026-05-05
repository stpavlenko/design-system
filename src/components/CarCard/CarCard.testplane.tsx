import React from 'react';
import { CarCard } from './CarCard';

export const renders: Record<string, () => React.ReactElement> = {
    'default state': () => (
        <div style={{ padding: '16px' }}>
            <CarCard
                badge="new"
                buttonVariant="ghost"
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
        </div>
    ),
    'primary disabled used': () => (
        <div style={{ padding: '16px' }}>
            <CarCard
                badge="used"
                buttonVariant="primary"
                buttonDisabled
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
        </div>
    ),
    'secondary disabled sale': () => (
        <div style={{ padding: '16px' }}>
            <CarCard
                badge="sale"
                buttonVariant="secondary"
                buttonDisabled
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
        </div>
    ),
    'all variants': () => (
        <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
            <CarCard
                badge="new"
                buttonVariant="ghost"
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
            <CarCard
                badge="used"
                buttonVariant="primary"
                buttonDisabled
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
            <CarCard
                badge="sale"
                buttonVariant="secondary"
                buttonDisabled
                title="Toyota Camry"
                subtitle="2020 · 40 000 км · 2.5 л"
                price="2 300 000 ₽"
                buttonLabel="Подробнее"
            />
        </div>
    ),
    'with image': () => (
        <div style={{ padding: '16px' }}>
            <CarCard
                badge="new"
                buttonVariant="primary"
                title="BMW X5"
                subtitle="2022 · 15 000 км · 3.0 л"
                price="7 500 000 ₽"
                image="https://placehold.co/240x160/E9ECEF/495057?text=BMW+X5"
                imageAlt="BMW X5"
                buttonLabel="Подробнее"
            />
        </div>
    ),
};

const RENDERS = 'src/components/CarCard/CarCard.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('CarCard', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default state');
            await browser.assertView('default state', '#root');
        });

        it('primary disabled used', async ({ browser }) => {
            await browser.render(RENDERS, 'primary disabled used');
            await browser.assertView('primary disabled used', '#root');
        });

        it('secondary disabled sale', async ({ browser }) => {
            await browser.render(RENDERS, 'secondary disabled sale');
            await browser.assertView('secondary disabled sale', '#root');
        });

        it('all variants', async ({ browser }) => {
            await browser.render(RENDERS, 'all variants');
            await browser.assertView('all variants', '#root');
        });

        it('with image', async ({ browser }) => {
            await browser.render(RENDERS, 'with image');
            await browser.assertView('with image', '#root');
        });
    });
}
