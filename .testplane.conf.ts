import 'dotenv/config';
import { renderCommand } from './testplane-tools/testsServer/render';

// CSS imports are no-ops in Node.js context (actual styles are handled by webpack)
require.extensions['.css'] = function(mod: any) {
    mod.exports = new Proxy({}, { get: () => '' });
};

module.exports = {
    sets: {
        desktop: {
            files: ['src/components/**/*.testplane.tsx'],
            browsers: ['chrome'],
        },
    },

    browsers: {
        chrome: {
            automationProtocol: 'webdriver',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            gridUrl: process.env.SELENOID_URL!,
            windowSize: {
                width: 1280,
                height: 800,
            },
            screenshotDelay: 100,
            sessionsPerBrowser: 2,
            assertViewOpts: {
                tolerance: 2.3,
            },
        },
    },

    screenshotsDir: (test: any) => {
        // test.file: "src/components/Button/Button.testplane.tsx"
        const fileMatch = (test.file as string | undefined)?.match(/src\/components\/([\w-]+)\//);
        const componentName = fileMatch?.[1] ?? '';
        if (componentName) {
            return `src/components/${componentName}/screens`;
        }
        return `testplane/screens/${test.id ?? 'unknown'}`;
    },

    prepareBrowser: async (browser: WebdriverIO.Browser) => {
        browser.addCommand('render', renderCommand);
    },

    plugins: {
        'html-reporter/testplane': {
            enabled: true,
            path: 'testplane/reports',
            defaultView: 'all',
            diffMode: '3-up',
        },
    },

    retry: 2,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
};
