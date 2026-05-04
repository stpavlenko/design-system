import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../../src/tokens/tokens.css';
// @ts-ignore
import { renders } from '__TEST_FILE__';

const params = new URLSearchParams(window.location.search);
const testName = params.get('test') ?? '';

function showError(msg: string) {
    document.body.innerHTML = `<pre style="color:red;font-family:monospace;font-size:13px;padding:16px;white-space:pre-wrap">${msg}</pre>`;
    (window as any).__testplane_ready__ = true;
}

window.addEventListener('error', e => showError(`JS Error: ${e.message}\n${e.filename}:${e.lineno}`));
window.addEventListener('unhandledrejection', e => showError(`Unhandled rejection: ${e.reason}`));

function waitForImages(): Promise<void> {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
    if (!imgs.length) return Promise.resolve();
    return Promise.all(
        imgs.map(img =>
            img.complete
                ? Promise.resolve()
                : new Promise<void>(resolve => {
                      img.addEventListener('load', () => resolve());
                      img.addEventListener('error', () => resolve());
                  }),
        ),
    ).then(() => undefined);
}

async function main() {
    try {
        const renderFn: (() => React.ReactElement) | undefined = renders[testName];

        if (!renderFn) {
            showError(
                `Unknown test: "${testName}"\nAvailable: ${Object.keys(renders).join(', ')}`,
            );
            return;
        }

        const container = document.getElementById('root')!;
        createRoot(container).render(renderFn());

        await document.fonts.ready;
        await waitForImages();
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

        (window as any).__testplane_ready__ = true;
    } catch (err) {
        showError(`Render error: ${err}`);
    }
}

main();
