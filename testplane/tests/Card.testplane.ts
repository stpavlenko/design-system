describe('Card', () => {
    it('default state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-card--default&viewMode=story',
        );
        await browser.assertView('default', '#storybook-root');
    });

    it('with image', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-card--with-image&viewMode=story',
        );
        // Ждём загрузки изображения
        const img = await browser.$('img');
        await img.waitForExist({ timeout: 10000 });
        await browser.pause(500);
        await browser.assertView('with-image', '#storybook-root');
    });

    it('with actions', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-card--with-actions&viewMode=story',
        );
        await browser.assertView('with-actions', '#storybook-root');
    });

    it('all variants', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-card--all-variants&viewMode=story',
        );
        await browser.assertView('all-variants', '#storybook-root');
    });

    it('hover state on elevated', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-card--default&viewMode=story',
        );
        const card = await browser.$('article');
        await card.moveTo();
        await browser.pause(300);
        await browser.assertView('hover', '#storybook-root');
    });
});
