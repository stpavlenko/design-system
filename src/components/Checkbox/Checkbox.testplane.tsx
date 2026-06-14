import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	it('default state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Checkbox label="Согласен с условиями" />
			</div>,
		);
		await this.browser.assertPageView('default state');
	});

	it('checked state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Checkbox label="Согласен с условиями" checked onChange={() => undefined} />
			</div>,
		);
		await this.browser.assertPageView('checked state');
	});

	it('indeterminate state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Checkbox label="Выбрать всё" indeterminate onChange={() => undefined} />
			</div>,
		);
		await this.browser.assertPageView('indeterminate state');
	});

	it('disabled state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Checkbox label="Заблокированный пункт" disabled />
			</div>,
		);
		await this.browser.assertPageView('disabled state');
	});

	it('all states', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<Checkbox label="Unchecked" />
				<Checkbox label="Checked" checked onChange={() => undefined} />
				<Checkbox label="Indeterminate" indeterminate onChange={() => undefined} />
				<Checkbox label="Disabled" disabled />
			</div>,
		);
		await this.browser.assertPageView('all states');
	});

	it('focus state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Checkbox label="Согласен с условиями" />
			</div>,
		);
		await this.browser.execute(() => {
			(document.querySelector('input[type="checkbox"]') as HTMLInputElement)?.focus();
		});
		await this.browser.assertPageView('focus state');
	});
});
