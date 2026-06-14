function showError(msg: string) {
	document.body.innerHTML = `<pre style="color:red;font-family:monospace;font-size:13px;padding:16px;white-space:pre-wrap">${msg}</pre>`;
	window.__testplane_ready__ = true;
}

window.addEventListener('error', e => showError(`JS Error: ${e.message}`));
window.addEventListener('unhandledrejection', e => showError(`Unhandled rejection: ${e.reason}`));

async function main() {
	const testName = new URLSearchParams(window.location.search).get('test') ?? '';
	const component = window.__tests[testName];

	if (!component) {
		showError(
			`Unknown test: "${testName}"\nAvailable: ${Object.keys(window.__tests).join(', ')}`,
		);
		return;
	}

	try {
		const ctx = { browser: window.browser, currentTest: { title: testName } };
		await component.fn.call(ctx, ctx);
		window.__testplane_ready__ = true;
	} catch (err) {
		showError(`Render error: ${err}`);
	}
}

main();
