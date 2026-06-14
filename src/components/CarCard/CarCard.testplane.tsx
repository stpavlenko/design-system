import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { CarCard } from './CarCard';

describe('CarCard', () => {
	it('default state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<CarCard
					badge="new"
					buttonVariant="ghost"
					title="Toyota Camry"
					subtitle="2020 · 40 000 км · 2.5 л"
					price="2 300 000 ₽"
					buttonLabel="Подробнее"
				/>
			</div>,
		);
		await this.browser.assertPageView('default state');
	});

	it('primary disabled used', async function(this: TestFunctionCtx) {
		await this.browser.render(
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
			</div>,
		);
		await this.browser.assertPageView('primary disabled used');
	});

	it('secondary disabled sale', async function(this: TestFunctionCtx) {
		await this.browser.render(
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
			</div>,
		);
		await this.browser.assertPageView('secondary disabled sale');
	});

	it('all variants', async function(this: TestFunctionCtx) {
		await this.browser.render(
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
			</div>,
		);
		await this.browser.assertPageView('all variants');
	});

	it('with image', async function(this: TestFunctionCtx) {
		await this.browser.render(
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
			</div>,
		);
		await this.browser.assertPageView('with image');
	});
});
