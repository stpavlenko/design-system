describe('Badge', () => {
    it('default state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-badge--default&viewMode=story',
        );
        await browser.assertView('default', '#storybook-root');
    });

    it('all variants', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-badge--all-variants&viewMode=story',
        );
        await browser.assertView('all-variants', '#storybook-root');
    });

    it('all sizes', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-badge--sizes&viewMode=story',
        );
        await browser.assertView('sizes', '#storybook-root');
    });

    it('dot variants', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-badge--dots&viewMode=story',
        );
        await browser.assertView('dots', '#storybook-root');
    });
});
