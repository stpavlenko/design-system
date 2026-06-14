import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { Button } from './Button';

describe('Button', () => {
	it('primary variant MD', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" size="md">Primary</Button>);
		await this.browser.assertPageView('primary variant');
	});

	it('primary variant SM', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" size="sm">Primary</Button>);
		await this.browser.assertPageView('primary variant SM');
	});

	it('primary hover state', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" size="md">Primary</Button>);
		await (await this.browser.$('button')).moveTo();
		await this.browser.pause(150);
		await this.browser.assertPageView('hover state');
	});

	it('secondary variant MD', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="secondary" size="md">Secondary</Button>);
		await this.browser.assertPageView('secondary variant');
	});

	it('secondary variant SM', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="secondary" size="sm">Secondary</Button>);
		await this.browser.assertPageView('secondary variant SM');
	});

	it('secondary hover state', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="secondary" size="md">Secondary</Button>);
		await (await this.browser.$('button')).moveTo();
		await this.browser.pause(150);
		await this.browser.assertPageView('secondary hover state');
	});

	it('ghost variant MD', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="ghost" size="md">Ghost</Button>);
		await this.browser.assertPageView('ghost variant');
	});

	it('ghost variant SM', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="ghost" size="sm">Ghost</Button>);
		await this.browser.assertPageView('ghost variant SM');
	});

	it('ghost hover state', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="ghost" size="md">Ghost</Button>);
		await (await this.browser.$('button')).moveTo();
		await this.browser.pause(150);
		await this.browser.assertPageView('ghost hover state');
	});

	it('all variants', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
			</div>,
		);
		await this.browser.assertPageView('all variants');
	});

	it('all sizes', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Button variant="primary" size="sm">SM</Button>
				<Button variant="primary" size="md">MD</Button>
				<Button variant="primary" size="lg">LG</Button>
			</div>,
		);
		await this.browser.assertPageView('all sizes');
	});

	it('disabled primary', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" size="md" disabled>Primary</Button>);
		await this.browser.assertPageView('disabled state');
	});

	it('disabled secondary', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="secondary" size="md" disabled>Secondary</Button>);
		await this.browser.assertPageView('disabled secondary');
	});

	it('disabled ghost', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="ghost" size="md" disabled>Ghost</Button>);
		await this.browser.assertPageView('disabled ghost');
	});

	it('loading state', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" loading>Загрузка</Button>);
		await this.browser.assertPageView('loading state');
	});

	it('focus state', async function(this: TestFunctionCtx) {
		await this.browser.render(<Button variant="primary" size="md">Primary</Button>);
		await this.browser.execute(() => {
			(document.querySelector('button') as HTMLButtonElement)?.focus();
		});
		await this.browser.assertPageView('focus state');
	});
});
