const SERVER_URL = process.env.TESTS_SERVER_URL || 'http://localhost:3000';

export async function renderCommand(
    this: WebdriverIO.Browser,
    rendersFile: string,
    testName: string,
): Promise<void> {
    const params = new URLSearchParams({ testFile: rendersFile });
    const response = await fetch(`${SERVER_URL}/gettest/?${params}`);

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`testsServer responded ${response.status}: ${body}`);
    }

    const { url } = (await response.json()) as { url: string };

    const fullUrl = `${url}?test=${encodeURIComponent(testName)}`;
    await this.url(fullUrl);

    await this.waitUntil(
        () => this.execute(() => !!(window as any).__testplane_ready__),
        { timeout: 15000, interval: 100, timeoutMsg: `Component "${testName}" did not signal ready in 15s` },
    );
}
