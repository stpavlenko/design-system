/// <reference types="@testplane/webdriverio" />

import type { ReactElement } from 'react';
import type { TestFunctionCtx } from 'testplane';

interface RenderOptions {
	viewport?: { width: number; height: number };
}

declare global {
	namespace WebdriverIO {
		interface Browser {
			render(element: ReactElement, options?: RenderOptions): Promise<void>;
			assertPageView(stateName?: string, selector?: string): Promise<void>;
		}
	}

	function describe(name: string, fn: () => void): void;

	function it(
		name: string,
		fn: (this: TestFunctionCtx) => void | Promise<void>,
	): void;
}

export {};
