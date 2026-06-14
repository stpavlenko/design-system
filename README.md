# @vkr/design-system

Учебная дизайн-система для ВКР на тему автоматизации разработки, тестирования и поддержки компонентов.

## Состав

1. React-компоненты: Button, Input, Badge, CarCard, Checkbox, Select.
2. Документация компонентов в Storybook.
3. Модульные тесты на Jest и Testing Library.
4. Проверки доступности на axe-core и jest-axe.
5. Визуальные тесты на Testplane через удалённый Chrome в Selenoid.
6. Дизайн-токены: экспорт Figma Variables JSON преобразуется в CSS custom properties.

## Команды

```bash
npm install
npm run storybook
npm run build:storybook
npm run typecheck
npm run test:unit
npm run test:a11y
npm run test:visual
npm run test:visual:update
npm run tokens:sync
```

## Дизайн-токены

Файл `src/tokens/tokens.tokens.json` — экспорт Figma Variables в JSON.

Команда `npm run tokens:sync` читает этот файл и генерирует `src/tokens/tokens.css`.

## Визуальное тестирование

Визуальные тесты используют Testplane, локальный testsServer, MinIO и удалённый Chrome в Selenoid. Подробности описаны в `testplane-tools/VISUAL_TESTING.md`.

## CI

В проекте используются три workflow GitHub Actions:

1. `ci.yml` — ESLint, проверка типов (включая Testplane), модульные тесты, тесты доступности, сборка и публикация Storybook.
2. `visual-tests.yml` (workflow **Visual Tests**) — визуальные тесты через Testplane, Selenoid и MinIO; отчёт публикуется в MinIO и сохраняется как artifact GitHub Actions.
3. `ai-review.yml` — автоматическая проверка изменений в компонентах по правилам дизайн-системы.
