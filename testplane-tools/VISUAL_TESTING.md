# Визуальное регрессионное тестирование

Скриншотные тесты запускаются через [Testplane](https://github.com/gemini-testing/testplane) и используют удалённый Chrome в [Selenoid](https://aerokube.com/selenoid/) — одинаковый браузер на всех машинах, никакого локального Chrome.

## Архитектура

```
npm run test:visual
       │
       ├─ testsServer (localhost:3000)
       │       │
       │       ├─ webpack: Component.testplane.tsx → index.html + bundle.js
       │       └─ MinIO S3: загружает оба файла → возвращает URL
       │
       └─ Testplane
               │
               ├─ browser.render(file, testName)
               │       └─ GET /gettest/?testFile=...  →  url
               │          browser.url(url?test=testName)
               │          waitUntil window.__testplane_ready__
               │
               └─ browser.assertView('state name', '#root')
                       └─ Selenoid (VPS 94.183.151.232:4444)
                          Chrome 128 → открывает URL из MinIO → скриншот
```

Ключевой принцип: Selenoid открывает страницу **напрямую из MinIO**, поэтому не нужен публичный доступ к локальной машине разработчика.

## Инфраструктура

| Сервис | Адрес | Описание |
|--------|-------|----------|
| Selenoid | `94.183.151.232:4444` | WebDriver-grid, Chrome 128 в Docker |
| MinIO | `94.183.151.232:9000` | S3-совместимое хранилище для бандлов |
| testsServer | `localhost:3000` | Локальный сервер сборки (запускается автоматически) |

Оба сервиса запущены на VPS в Docker и не требуют ручного запуска перед тестами.

## Переменные окружения

Файл `.env` в корне проекта (не коммитится):

```dotenv
SELENOID_URL=http://94.183.151.232:4444/wd/hub
S3_ENDPOINT=http://94.183.151.232:9000
S3_BUCKET=testplane-bundles
S3_REGION=us-east-1
S3_BASE_URL=http://94.183.151.232:9000/testplane-bundles
AWS_ACCESS_KEY_ID=admin
AWS_SECRET_ACCESS_KEY=<secret>
TESTS_SERVER_PORT=3000
TESTS_SERVER_URL=http://localhost:3000
```

## Запуск тестов

```bash
# Сравнение с эталонными скриншотами
npm run test:visual

# Обновить эталонные скриншоты (после намеренных изменений в UI)
npm run test:visual:update

# Открыть GUI с diff-просмотром
npm run test:visual:gui
```

Все три команды автоматически запускают testsServer и ждут его готовности через `wait-on`.

## Структура файлов

```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.testplane.tsx   ← сцены + тест-сьют в одном файле
│   └── screens/               ← эталонные скриншоты (коммитятся)
│       ├── primary variant/
│       │   └── plain.png
│       └── ...
├── Badge/
│   ├── Badge.testplane.tsx
│   └── screens/
└── ...

testplane-tools/
├── testsServer/
│   ├── server.ts              ← Express-сервер /gettest/
│   ├── webpack.ts             ← сборка бандла
│   ├── s3uploader.ts          ← загрузка в MinIO
│   ├── render.ts              ← команда browser.render()
│   └── webpack/
│       ├── entry.tsx          ← точка входа бандла
│       └── template.html      ← HTML-шаблон
└── VISUAL_TESTING.md

testplane/
└── reports/                   ← HTML-отчёт (генерируется, не коммитится)
```

Тестовый файл лежит **рядом с компонентом** — изменения в компоненте и его скриншотах попадают в один PR.

## Формат тестового файла

Каждый компонент имеет один файл `Component.testplane.tsx`, который совмещает сцены для рендера и тест-сьют:

```tsx
// src/components/MyComponent/MyComponent.testplane.tsx
import React from 'react';
import { MyComponent } from './MyComponent';

// ── Сцены ──────────────────────────────────────────────────────────────────
export const renders: Record<string, () => React.ReactElement> = {
    default: () => <MyComponent />,
    'variant A': () => <MyComponent variant="a" />,
    'hover state': () => <MyComponent />,
};

const RENDERS = 'src/components/MyComponent/MyComponent.testplane.tsx';

// ── Тесты ──────────────────────────────────────────────────────────────────
// Guard: describe/it — глобалы Testplane, undefined в браузерном бандле
if (typeof describe !== 'undefined') {
    describe('MyComponent', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('variant A', async ({ browser }) => {
            await browser.render(RENDERS, 'variant A');
            await browser.assertView('variant A', '#root');
        });

        it('hover state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            const el = await browser.$('[data-testid="my-component"]');
            await el.moveTo();
            await browser.pause(200);
            await browser.assertView('hover state', '#root');
        });
    });
}
```

**Важно:** константа `RENDERS` содержит путь от корня проекта — именно его получает testsServer при сборке бандла. Guard `if (typeof describe !== 'undefined')` необходим, потому что webpack включает этот же файл в браузерный бандл через алиас `__TEST_FILE__`, где `describe` не существует.

## Добавление теста для нового компонента

1. Создать `src/components/MyComponent/MyComponent.testplane.tsx` по шаблону выше.
2. Записать эталонные скриншоты:
   ```bash
   npm run test:visual:update
   ```
   Скриншоты появятся в `src/components/MyComponent/screens/`.
3. Закоммитить `MyComponent.testplane.tsx` и папку `screens/`.

## Как работает testsServer

1. Testplane вызывает `browser.render('src/components/Badge/Badge.testplane.tsx', 'dots')`.
2. `render.ts` делает `GET localhost:3000/gettest/?testFile=src/components/Badge/Badge.testplane.tsx`.
3. Сервер проверяет кэш по `mtime` файла. При попадании сразу возвращает URL.
4. При промахе: webpack компилирует `entry.tsx` с алиасом `__TEST_FILE__ → Badge.testplane.tsx`.
5. Результат — `index.html` и `bundle.js` — загружается в MinIO под ключом `src/components/Badge/Badge.testplane.tsx-<md5hash>/`.
6. Возвращается URL `http://…/testplane-bundles/…/index.html`.
7. `render.ts` открывает `<url>?test=dots` в Selenoid Chrome.
8. `entry.tsx` читает `?test=dots`, вызывает `renders['dots']()`, монтирует компонент, ждёт шрифты и изображения, выставляет `window.__testplane_ready__ = true`.
9. `render.ts` дожидается флага (таймаут 15 с) и возвращает управление тесту.
10. `browser.assertView('dot variants', '#root')` делает скриншот элемента.

### Кэширование

testsServer кэширует `(testFile → url)` в памяти процесса, инвалидируя по `mtime`. Повторный запуск одного теста (retry или второй прогон) не перекомпилирует бандл, если файл не изменился.

### CSS в двух контекстах

Один и тот же `Component.testplane.tsx` загружается в двух местах:

| Контекст | Как обрабатывается CSS |
|----------|----------------------|
| Node.js (Testplane читает тесты) | `require.extensions['.css']` в `.testplane.conf.ts` возвращает Proxy, все обращения к классам дают `''` |
| Браузер (webpack-бандл) | `style-loader` + `css-loader` с модулями — полноценные стили |

## Поведение при ошибках рендера

Если компонент выбрасывает ошибку на этапе рендера, `entry.tsx` перехватывает её через `window.onerror` и `try/catch`, показывает текст ошибки в `<body>` и всё равно выставляет `__testplane_ready__ = true`. В итоге `assertView('#root')` падает с `element is not found` вместо таймаута — это ускоряет диагностику.

## Эталонные скриншоты в git

Скриншоты (`screens/**/*.png`) коммитятся в репозиторий. При обновлении дизайна:

1. Внести изменения в компонент / токены.
2. Запустить `npm run test:visual:update` — скриншоты обновятся на месте.
3. Просмотреть diff изображений в PR.
4. Закоммитить новые `*.png` вместе с кодом.
