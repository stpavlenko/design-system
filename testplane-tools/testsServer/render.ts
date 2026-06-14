import type { ReactElement } from 'react';
import path from 'path';

const SERVER_URL = process.env.TESTS_SERVER_URL || 'http://localhost:3000';

export interface RenderOptions {
	viewport?: { width: number; height: number };
}

interface CurrentTest {
	title: string;
	file: string;
	fullTitle(): string;
}

function getCurrentTest(browser: WebdriverIO.Browser): CurrentTest {
	const ctx = (browser as WebdriverIO.Browser & {
		executionContext?: { ctx: { currentTest: CurrentTest } };
	}).executionContext;

	if (!ctx?.ctx?.currentTest) {
		throw new Error('render(): current test context is unavailable');
	}

	return ctx.ctx.currentTest;
}

export async function renderCommand(
	this: WebdriverIO.Browser,
	_element: ReactElement,
	options: RenderOptions = {},
): Promise<void> {
	const test = getCurrentTest(this);
	const testFile = path.relative(process.cwd(), path.resolve(process.cwd(), test.file));
	const params = new URLSearchParams({ testFile });
	const response = await fetch(`${SERVER_URL}/build/?${params}`);

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`testsServer responded ${response.status}: ${body}`);
	}

	const { url } = (await response.json()) as { url: string };
	const testUrl = `${url}?test=${encodeURIComponent(test.fullTitle())}`;

	if (options.viewport) {
		await this.setWindowSize(options.viewport.width, options.viewport.height);
	}

	await this.url(testUrl);

	await this.waitUntil(
		() => this.execute(() => !!(window as any).__testplane_ready__),
		{
			timeout: 15000,
			interval: 100,
			timeoutMsg: `Component did not signal ready in 15s (${test.fullTitle()})`,
		},
	);
}

export async function assertPageViewCommand(
	this: WebdriverIO.Browser,
	stateName?: string,
	selector = '#root',
): Promise<void> {
	const test = getCurrentTest(this);
	const state = stateName ?? test.title;
	await this.assertView(state, selector);
}
