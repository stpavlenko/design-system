describe('Button', () => {
    it('primary variant', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--primary&viewMode=story',
        );
        await browser.assertView('primary', '#storybook-root');
    });

    it('secondary variant', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--secondary&viewMode=story',
        );
        await browser.assertView('secondary', '#storybook-root');
    });

    it('outline variant', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--outline&viewMode=story',
        );
        await browser.assertView('outline', '#storybook-root');
    });

    it('ghost variant', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--ghost&viewMode=story',
        );
        await browser.assertView('ghost', '#storybook-root');
    });

    it('all sizes', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--sizes&viewMode=story',
        );
        await browser.assertView('sizes', '#storybook-root');
    });

    it('all variants', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--all-variants&viewMode=story',
        );
        await browser.assertView('all-variants', '#storybook-root');
    });

    it('loading state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--loading&viewMode=story',
        );
        await browser.assertView('loading', '#storybook-root');
    });

    it('disabled state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--disabled&viewMode=story',
        );
        await browser.assertView('disabled', '#storybook-root');
    });

    it('focus state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--primary&viewMode=story',
        );
        const button = await browser.$('button');
        await button.click();
        await browser.assertView('focus', '#storybook-root');
    });

    it('hover state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-button--primary&viewMode=story',
        );
        const button = await browser.$('button');
        await button.moveTo();
        await browser.pause(200);
        await browser.assertView('hover', '#storybook-root');
    });
});
