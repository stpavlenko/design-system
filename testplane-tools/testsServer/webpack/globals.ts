import type { ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import '../../../src/tokens/tokens.css';

declare global {
	interface Window {
		__path: string[];
		__tests: Record<string, { fn: () => void | Promise<void> }>;
		__testplane_ready__?: boolean;
		browser: WebdriverIO.Browser;
		describe: (name: string, fn: () => void) => void;
		it: (name: string, fn: () => void | Promise<void>) => void;
	}
}

function createShrugger(): unknown {
	const handler: ProxyHandler<object> = {
		get(_target, prop) {
			if (prop === 'then') return undefined;
			const fn = () => Promise.resolve(createShrugger());
			return new Proxy(fn, handler);
		},
		apply() {
			return Promise.resolve(createShrugger());
		},
	};
	return new Proxy(() => Promise.resolve(createShrugger()), handler);
}

async function waitForImages(): Promise<void> {
	const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
	if (!imgs.length) return;
	await Promise.all(
		imgs.map(img =>
			img.complete
				? Promise.resolve()
				: new Promise<void>(resolve => {
					img.addEventListener('load', () => resolve());
					img.addEventListener('error', () => resolve());
				}),
		),
	);
}

let rootInstance: Root | null = null;

const noopAsync = async () => undefined;

const realBrowser: Partial<WebdriverIO.Browser> = {
	render: async (jsx: ReactElement, _options?: unknown) => {
		const container = document.getElementById('root')!;
		if (!rootInstance) {
			rootInstance = createRoot(container);
		}
		rootInstance.render(jsx);
		await document.fonts.ready;
		await waitForImages();
		await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
	},
	assertPageView: noopAsync,
	assertView: noopAsync,
	pause: noopAsync,
	setWindowSize: noopAsync,
	url: noopAsync,
	execute: noopAsync,
	waitUntil: noopAsync,
	$: (() => Promise.resolve(createShrugger())) as WebdriverIO.Browser['$'],
};

window.browser = new Proxy(realBrowser as WebdriverIO.Browser, {
	get(target, prop, receiver) {
		if (prop in target) {
			return Reflect.get(target, prop, receiver);
		}
		return createShrugger();
	},
}) as WebdriverIO.Browser;

window.__tests = {};
window.__path = [];

window.describe = (name: string, fn: () => void) => {
	window.__path.push(name);
	try {
		fn();
	} finally {
		window.__path.pop();
	}
};

window.it = (name: string, fn: () => void | Promise<void>) => {
	window.__path.push(name);
	const testName = window.__path.join(' ').replace(/ +/g, ' ');
	window.__tests[testName] = { fn };
	window.__path.pop();
};

export {};
