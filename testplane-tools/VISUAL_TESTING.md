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
       ├─ browser.render(<JSX>)
       │       └─ GET /build/?testFile=...  →  url
       │          browser.url(url?test=<fullTitle>)
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
VPS_HOST=94.183.151.232

S3_BUCKET=testplane-bundles
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=admin
AWS_SECRET_ACCESS_KEY=<secret>
TESTS_SERVER_PORT=3000
TESTS_SERVER_URL=http://localhost:3000
```

Адреса Selenoid и MinIO вычисляются из `VPS_HOST` в `testplane-tools/visualTestEnv.ts`. При необходимости их можно переопределить через `SELENOID_URL`, `S3_ENDPOINT` и `S3_BASE_URL`.

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
│   ├── server.ts              ← Express: /build/, /health, /clearcache/
│   ├── webpack.ts             ← сборка бандла (globals + test + bootstrap)
│   ├── s3uploader.ts          ← загрузка в MinIO
│   ├── render.ts              ← browser.render / assertPageView
│   └── webpack/
│       ├── globals.ts         ← polyfill it/describe + browser.render
│       ├── bootstrap.ts       ← запуск кейса по ?test=
│       └── template.html
└── VISUAL_TESTING.md

testplane/
└── reports/                   ← HTML-отчёт (генерируется, не коммитится)
```

Тестовый файл лежит **рядом с компонентом** — изменения в компоненте и его скриншотах попадают в один PR.

## Формат тестового файла

Каждый компонент имеет один файл `Component.testplane.tsx` с inline JSX:

```tsx
import type { TestFunctionCtx } from 'testplane';
import React from 'react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
    it('default state', async function(this: TestFunctionCtx) {
        await this.browser.render(
            <div style={{ padding: '16px' }}>
                <MyComponent />
            </div>,
            { viewport: { width: 400, height: 200 } }, // опционально
        );
        await this.browser.assertPageView('default state');
    });
});
```

`assertPageView(name?)` делает скриншот `#root`. Имя эталона — аргумент или заголовок `it()`.

## Добавление теста для нового компонента

1. Создать `src/components/MyComponent/MyComponent.testplane.tsx` по шаблону выше.
2. Записать эталонные скриншоты:
   ```bash
   npm run test:visual:update
   ```
   Скриншоты появятся в `src/components/MyComponent/screens/`.
3. Закоммитить `MyComponent.testplane.tsx` и папку `screens/`.

## Как работает testsServer

Dual-context: один `*.testplane.tsx` исполняется в Node (testplane) и в Chrome (webpack-бандл).

1. Testplane вызывает `browser.render(<JSX>)` в Node — JSX в Node **не используется** для сборки.
2. `render.ts` запрашивает `GET /build/?testFile=...` — один бандл на файл теста (кэш по `mtime`).
3. Webpack собирает цепочку `globals.ts → Component.testplane.tsx → bootstrap.ts`.
4. `globals.ts` регистрирует `it`/`describe` в `window.__tests`; `browser.render` монтирует React; остальное — noop.
5. Selenoid открывает `url?test=<fullTitle>` (например `Button hover state`).
6. `bootstrap.ts` вызывает `__tests[fullTitle]()`, ждёт mount, выставляет `__testplane_ready__`.
7. В Node выполняются интеракции (`moveTo`, `focus`) и `assertPageView()` — реальный скриншот.

После правки тестового файла без рестарта server возможен stale-кэш — перезапусти testsServer или `GET /clearcache/`.

## Эталонные скриншоты в git

Скриншоты (`screens/**/*.png`) коммитятся в репозиторий. При обновлении дизайна:

1. Внести изменения в компонент / токены.
2. Запустить `npm run test:visual:update` — скриншоты обновятся на месте.
3. Просмотреть diff изображений в PR.
4. Закоммитить новые `*.png` вместе с кодом.
