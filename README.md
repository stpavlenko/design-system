# @vkr/design-system

Дизайн-система с автоматизацией процессов тестирования и разработки компонентов.

> **ВКР** — Павленко Степан Евгеньевич, группа 221-321  
> Направление: 09.03.01 Информатика и вычислительная техника, профиль «Веб-технологии»

## Стек технологий

| Категория | Инструмент | Версия |
|-----------|-----------|--------|
| Фреймворк | React | 18.x |
| Язык | TypeScript | 5.x |
| Документация | Storybook | ^8.3.5 |
| Визуальные тесты | Testplane (ex-Hermione) | 8.35.2 |
| A11y тесты | axe-core + jest-axe | latest |
| Unit-тесты | Jest + @testing-library/react | latest |
| Стилизация | CSS Modules + CSS custom properties | — |
| CI/CD | GitHub Actions | — |
| Дизайн-токены | Figma Variables API → JSON → CSS | — |

## Компоненты

- **Button** — кнопка с 4 вариантами (primary, secondary, outline, ghost) и 3 размерами
- **Input** — поле ввода с label, error, helperText и иконками
- **Badge** — бейдж/метка с 5 вариантами и dot-режимом
- **Card** — карточка с 3 вариантами (elevated, outlined, filled)

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск Storybook (dev-сервер)
npm run dev

# Сборка Storybook
npm run build:storybook
```

## Тестирование

```bash
# Все тесты (unit + a11y)
npm test

# Только unit-тесты
npm run test:unit

# Только a11y-тесты (axe-core)
npm run test:a11y

# Визуальные тесты (Testplane + Storybook)
# Требуется запущенный Storybook на порту 6006
npm run test:visual

# Обновить эталонные скриншоты
npm run test:visual:update
```

## Дизайн-токены

```bash
# Синхронизация токенов из Figma
FIGMA_TOKEN=<token> FIGMA_FILE_KEY=<key> npm run tokens:sync

# Генерация CSS custom properties из tokens.json
npm run tokens:build

# Полный цикл: sync + build
FIGMA_TOKEN=<token> FIGMA_FILE_KEY=<key> npm run tokens:update
```

## Структура проекта

```
design-system/
├── .storybook/           # Конфигурация Storybook
├── .github/workflows/    # CI/CD пайплайны
├── scripts/              # Скрипты автоматизации
│   ├── sync-figma-tokens.ts
│   └── transform-tokens-to-css.ts
├── src/
│   ├── tokens/           # Дизайн-токены (JSON + CSS)
│   └── components/       # React-компоненты
│       ├── Button/
│       ├── Input/
│       ├── Badge/
│       └── Card/
├── testplane/            # Визуальные тесты
│   ├── tests/
│   └── screens/          # Эталонные скриншоты
├── package.json
├── tsconfig.json
└── jest.config.ts
```

## CI/CD

Проект использует три GitHub Actions workflow:

1. **CI** (`ci.yml`) — lint, typecheck, unit-тесты, a11y-тесты, сборка Storybook
2. **Visual Tests** (`visual-tests.yml`) — визуальное регрессионное тестирование через Testplane
3. **Tokens Sync** (`tokens-sync.yml`) — автоматическая синхронизация токенов из Figma (по расписанию + ручной запуск)

## Лицензия

MIT
