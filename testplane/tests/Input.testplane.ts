describe('Input', () => {
    it('default state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--default&viewMode=story',
        );
        await browser.assertView('default', '#storybook-root');
    });

    it('with helper text', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--with-helper-text&viewMode=story',
        );
        await browser.assertView('with-helper-text', '#storybook-root');
    });

    it('with error', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--with-error&viewMode=story',
        );
        await browser.assertView('with-error', '#storybook-root');
    });

    it('all sizes', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--sizes&viewMode=story',
        );
        await browser.assertView('sizes', '#storybook-root');
    });

    it('disabled state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--disabled&viewMode=story',
        );
        await browser.assertView('disabled', '#storybook-root');
    });

    it('focus state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--default&viewMode=story',
        );
        const input = await browser.$('input');
        await input.click();
        await browser.pause(200);
        await browser.assertView('focus', '#storybook-root');
    });

    it('filled state', async ({ browser }) => {
        await browser.url(
            'iframe.html?id=components-input--default&viewMode=story',
        );
        const input = await browser.$('input');
        await input.setValue('Тестовое значение');
        await browser.assertView('filled', '#storybook-root');
    });
});
