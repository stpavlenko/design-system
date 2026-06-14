import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { Badge } from './Badge';

describe('Badge', () => {
	it('figma: Новый (success)', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Badge variant="success" size="sm">Новый</Badge>
			</div>,
		);
		await this.browser.assertPageView('figma new');
	});

	it('figma: С пробегом (neutral)', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Badge variant="neutral" size="sm">С пробегом</Badge>
			</div>,
		);
		await this.browser.assertPageView('figma used');
	});

	it('figma: Скидка (warning)', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ padding: '16px' }}>
				<Badge variant="warning" size="sm">Скидка</Badge>
			</div>,
		);
		await this.browser.assertPageView('figma sale');
	});

	it('все Figma состояния', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Badge variant="success" size="sm">Новый</Badge>
				<Badge variant="neutral" size="sm">С пробегом</Badge>
				<Badge variant="warning" size="sm">Скидка</Badge>
			</div>,
		);
		await this.browser.assertPageView('figma states');
	});

	it('все варианты', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Badge variant="success">Успех</Badge>
				<Badge variant="warning">Внимание</Badge>
				<Badge variant="error">Ошибка</Badge>
				<Badge variant="info">Инфо</Badge>
				<Badge variant="neutral">Нейтральный</Badge>
			</div>,
		);
		await this.browser.assertPageView('all variants');
	});

	it('все размеры', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Badge size="sm" variant="success">Small</Badge>
				<Badge size="md" variant="success">Medium</Badge>
				<Badge size="lg" variant="success">Large</Badge>
			</div>,
		);
		await this.browser.assertPageView('all sizes');
	});

	it('точечный вариант', async function(this: TestFunctionCtx) {
		await this.browser.render(
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}>
				<Badge dot variant="success" aria-label="Онлайн" />
				<Badge dot variant="warning" aria-label="Отсутствует" />
				<Badge dot variant="error" aria-label="Оффлайн" />
				<Badge dot variant="neutral" aria-label="Неизвестно" />
			</div>,
		);
		await this.browser.assertPageView('dots');
	});
});
