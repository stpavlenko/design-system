import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { Input } from './Input';

describe('Input', () => {
	it('default state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input label="Email" placeholder="Введите email" />
			</div>,
		);
		await this.browser.assertPageView('default state');
	});

	it('focus state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input label="Email" placeholder="Введите email" />
			</div>,
		);
		await this.browser.execute(() => {
			(document.querySelector('input') as HTMLInputElement)?.focus();
		});
		await this.browser.assertPageView('focus state');
	});

	it('with error', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input
					label="Email"
					placeholder="Введите email"
					defaultValue="неверный"
					error="Ошибка ввода"
				/>
			</div>,
		);
		await this.browser.assertPageView('with error');
	});

	it('disabled state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input
					label="Email"
					placeholder="Введите email"
					disabled
					defaultValue="user@example.com"
				/>
			</div>,
		);
		await this.browser.assertPageView('disabled state');
	});

	it('all sizes', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px', padding: '16px' }}>
				<Input size="sm" label="Small" placeholder="Маленькое поле" />
				<Input size="md" label="Medium" placeholder="Среднее поле" />
				<Input size="lg" label="Large" placeholder="Большое поле" />
			</div>,
		);
		await this.browser.assertPageView('all sizes');
	});

	it('with helper text', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input
					label="Email"
					placeholder="user@example.com"
					helperText="Мы не будем передавать ваш email"
				/>
			</div>,
		);
		await this.browser.assertPageView('with helper text');
	});

	it('filled state', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ width: '300px', padding: '16px' }}>
				<Input label="Email" placeholder="Введите email" />
			</div>,
		);
		const input = await this.browser.$('input');
		await input.setValue('user@example.com');
		await this.browser.assertPageView('filled state');
	});
});
