import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { Select } from './Select';

const carOptions = [
	{ value: 'bmw', label: 'BMW' },
	{ value: 'chery', label: 'Chery' },
	{ value: 'chevrolet', label: 'Chevrolet' },
];

describe('Select', () => {
	it('default state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Select
					label="Марка автомобиля"
					options={carOptions}
					placeholder="Выберите марку из списка"
				/>
			</div>,
		);
		await this.browser.assertPageView('default state');
	});

	it('with value', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Select label="Марка автомобиля" options={carOptions} value="bmw" />
			</div>,
		);
		await this.browser.assertPageView('with value');
	});

	it('disabled state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Select
					label="Марка автомобиля"
					options={carOptions}
					placeholder="Выберите марку из списка"
					disabled
				/>
			</div>,
		);
		await this.browser.assertPageView('disabled state');
	});

	it('with error', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Select
					label="Марка автомобиля"
					options={carOptions}
					error="Выберите марку из списка"
				/>
			</div>,
		);
		await this.browser.assertPageView('with error');
	});

	it('open state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px', paddingBottom: '200px' }}>
				<Select
					label="Марка автомобиля"
					options={carOptions}
					placeholder="Выберите марку из списка"
				/>
			</div>,
		);
		await this.browser.execute(() => {
			(document.querySelector('[role="combobox"]') as HTMLElement)?.click();
		});
		await this.browser.assertPageView('open state');
	});

	it('open with selection — checkmark on left', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px', paddingBottom: '200px' }}>
				<Select label="Марка автомобиля" options={carOptions} value="bmw" />
			</div>,
		);
		await this.browser.execute(() => {
			(document.querySelector('[role="combobox"]') as HTMLElement)?.click();
		});
		await this.browser.assertPageView('open with selection');
	});
});
