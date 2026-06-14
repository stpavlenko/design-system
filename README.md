# @vkr/design-system

Шаблон React/TypeScript дизайн-системы с автоматизацией разработки, тестирования и документирования компонентов. Проект создан в рамках ВКР и предназначен для **форка другими командами** — скопируйте репозиторий и настройте под свою ДС.

Проект не публикуется в npm (`"private": true`), компоненты импортируются относительными путями внутри репозитория. Лицензия: [MIT](LICENSE).

**Стек:** React 18.3, TypeScript 5.7, Storybook 8.3, Vite 6, Jest 29, axe-core/jest-axe, Testplane 8.35. Требуется **Node 22** (как в CI).

**Компоненты:** Button, Input, Badge, CarCard, Checkbox, Select.

## Быстрый старт

```bash
git clone <url-репозитория>
cd design-system
npm install
npm run storybook          # http://localhost:6006
npm run test:unit
npm run test:a11y
```

Для визуальных тестов нужна инфраструктура на VPS — см. раздел «Настройка под свою команду».

## Настройка под свою команду

Чеклист после форка:

1. **Токены** — экспортировать Variables из Figma (File → Export Variables → JSON), положить в `src/tokens/tokens.tokens.json`, выполнить `npm run tokens:sync`. Результат — `src/tokens/tokens.css` (CSS custom properties). Файл `tokens.css` не редактируют вручную. Если в Figma другая структура имён — см. раздел «Дизайн-токены».
2. **Инфраструктура визуальных тестов** — на VPS с Docker:
   ```bash
   cd infrastructure
   cp .env.example .env    # MINIO_ROOT_USER, MINIO_ROOT_PASSWORD
   docker compose up -d
   ```
   Открыть порты: `4444` (Selenoid), `9000`/`9001` (MinIO). В консоли MinIO создать bucket `testplane-bundles` (или свой — указать в `.env` проекта).
3. **Переменные окружения** — скопировать `.env.example` → `.env`, указать IP своего VPS:
   ```dotenv
   VPS_HOST=<IP_вашего_VPS>
   S3_BUCKET=testplane-bundles
   AWS_ACCESS_KEY_ID=admin
   AWS_SECRET_ACCESS_KEY=<пароль MinIO>
   ```
4. **Проверка** — `npm run test:visual:update`, закоммитить эталонные скриншоты в `src/components/*/screens/`.
5. **CI (опционально)** — в репозитории есть примеры GitHub Actions (`.github/workflows/`). Для визуальных тестов задайте repository variables `VPS_HOST` (обязательно) и `S3_BUCKET` (опционально, по умолчанию `testplane-bundles`), secrets `AWS_ACCESS_KEY_ID` и `AWS_SECRET_ACCESS_KEY`; для AI Review — `OPENROUTER_API_KEY`. Storybook можно развернуть на своей инфраструктуре (`npm run build:storybook` → каталог `storybook-static/`).

Подробности визуальных тестов: [testplane-tools/VISUAL_TESTING.md](testplane-tools/VISUAL_TESTING.md).

## Структура компонента

Эталон — [src/components/Button/](src/components/Button/):

```
src/components/MyComponent/
├── MyComponent.tsx              # реализация, named export
├── MyComponent.module.css       # CSS Modules, значения через var(--token)
├── MyComponent.stories.tsx      # Storybook, title: 'Components/MyComponent'
├── MyComponent.test.tsx         # модульные тесты (Jest + Testing Library)
├── MyComponent.a11y.test.tsx    # тестирование доступности (jest-axe)
├── MyComponent.testplane.tsx    # визуальные сцены (Testplane)
└── screens/                     # эталонные PNG (коммитятся в git)
```

При добавлении компонента создайте все файлы по образцу Button, затем обновите эталоны: `npm run test:visual:update`.

## Дизайн-токены

| Файл | Назначение |
|------|------------|
| `src/tokens/tokens.tokens.json` | экспорт Figma Variables JSON |
| `src/tokens/tokens.css` | сгенерированные CSS custom properties |
| `scripts/sync-tokens.ts` | локальный скрипт синхронизации |

```bash
npm run tokens:sync                    # из tokens.tokens.json
npm run tokens:sync path/to/export.json  # из другого файла
```

### Структура Variables в Figma

Скрипт `sync-tokens.ts` не привязан к конкретным именам коллекций — он обходит **любую вложенность** JSON и строит CSS-имена из пути:

```
color.primary.500   →  --color-primary-500
spacing.4           →  --spacing-4
typography.fontSize.lg  →  --typography-fontSize-lg
```

В шаблоне используются четыре корневые группы: `color`, `spacing`, `typography`, `borderRadius`. У вашей команды могут быть другие названия (`palette`, `space`, `radius` и т.д.) — экспорт всё равно сгенерирует CSS custom properties, но **имена переменных изменятся**.

Что учесть при своём нейминге:

- **Компоненты** в шаблоне ссылаются на конкретные токены в `*.module.css`, например `var(--color-primary-500)`, `var(--spacing-4)`. После импорта своего JSON обновите CSS компонентов под новые имена — или выровняйте структуру Variables в Figma под шаблон.
- **Единицы измерения** — скрипт автоматически добавляет `px` только для имён с префиксами `spacing-`, `borderRadius-`, `typography-fontSize-`. При других префиксах (например, `space-md`) правило нужно расширить в функции `getUnit()` в `scripts/sync-tokens.ts`.
- **Типы** — поддерживаются `$type: color`, `number`, `string` (формат экспорта Figma Variables JSON).

В CSS Modules используйте сгенерированные имена: `color: var(--color-primary-500);`.

## Команды

| Команда | Описание |
|---------|----------|
| `npm run storybook` | Storybook в dev-режиме (порт 6006) |
| `npm run build:storybook` | статическая сборка документации |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run typecheck` | проверка типов (включая Testplane) |
| `npm run test:unit` | модульные тесты |
| `npm run test:a11y` | тестирование доступности |
| `npm run test:visual` | визуальные тесты (нужен VPS + `.env`) |
| `npm run test:visual:update` | обновить эталонные скриншоты |
| `npm run test:visual:gui` | GUI Testplane с diff |
| `npm run tokens:sync` | генерация `tokens.css` из JSON |

## CI/CD

В `.github/workflows/` — **примеры** для GitHub Actions (можно адаптировать под GitLab CI, Jenkins и т.д. или отключить):

| Workflow | Что делает |
|----------|------------|
| `ci.yml` | ESLint, typecheck, unit, a11y; на `main` — сборка Storybook (в workflow — развёртывание на GitHub Pages, необязательно для других команд) |
| `visual-tests.yml` | визуальные тесты (Testplane + Selenoid + MinIO), artifact и отчёт в MinIO |
| `ai-review.yml` | автоматическое ревью изменений в `src/components/**` (OpenRouter, опционально) |

Синхронизация токенов в CI не настроена — обновление выполняется локально через `npm run tokens:sync`. Документацию Storybook (`npm run build:storybook`) обычно разворачивают на инфраструктуре команды, а не только через GitHub Pages.
