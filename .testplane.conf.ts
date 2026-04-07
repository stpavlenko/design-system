/**
 * Конфигурация Testplane для визуального регрессионного тестирования.
 *
 * Плагин @testplane/storybook автоматически генерирует скриншотные тесты
 * из Storybook stories, а также позволяет писать кастомные тесты.
 *
 * Скриншоты хранятся рядом с компонентами в папке screens/.
 *
 * Документация: https://testplane.io/ru/docs/v8/plugins/testplane-storybook/
 */

module.exports = {
    sets: {
        desktop: {
            files: ['testplane/tests/**/*.testplane.ts'],
            browsers: ['chrome'],
        },
    },

    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: {
                width: 1280,
                height: 800,
            },
            screenshotDelay: 100,
        },
    },

    screenshotsDir: (test: any) => {
        // test — Mocha Test объект с parent-цепочкой:
        //   test.parent.title = "Default" (имя story)
        //   test.parent.parent.title = "Badge" (имя компонента)
        //   test.fullTitle() = "Components Badge Default Autoscreenshot"

        const componentName = test.parent?.parent?.title || '';
        const storyName = test.parent?.title || '';

        if (componentName && storyName) {
            // Результат: src/components/Badge/screens/Default/plain.png
            return `src/components/${componentName}/screens/${storyName}`;
        }

        // Fallback через fullTitle
        if (typeof test.fullTitle === 'function') {
            const full = test.fullTitle();
            // "Components Badge Default Autoscreenshot" → ["Components", "Badge", "Default", "Autoscreenshot"]
            const parts = full.split(' ').filter((p: string) => p && p !== 'Autoscreenshot');
            if (parts.length >= 3) {
                // parts[0] = "Components", parts[1] = "Badge", parts[2..] = "Default" / "All Variants"
                const comp = parts[1];
                const story = parts.slice(2).join('-');
                return `src/components/${comp}/screens/${story}`;
            }
        }

        return `testplane/screens/${test.id || 'unknown'}`;
    },

    plugins: {
        '@testplane/storybook': {
            enabled: true,
            localport: 6006,
            remoteStorybookUrl: process.env.STORYBOOK_URL || '',
            autoScreenshots: true,
            storybookConfigDir: '.storybook',
        },
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
