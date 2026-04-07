/**
 * Скрипт трансформации дизайн-токенов из JSON в CSS custom properties.
 * 
 * Входные данные: src/tokens/tokens.json
 * Выходные данные: src/tokens/tokens.css
 * 
 * Запуск: npm run tokens:build
 */

import * as fs from 'fs';
import * as path from 'path';

const TOKENS_JSON_PATH = path.resolve(__dirname, '../src/tokens/tokens.json');
const TOKENS_CSS_PATH = path.resolve(__dirname, '../src/tokens/tokens.css');

interface TokenValue {
  [key: string]: string | TokenValue;
}

/**
 * Рекурсивно обходит объект токенов и генерирует CSS custom properties.
 * Путь токена преобразуется в имя переменной:
 *   color.primary.500 → --color-primary-500
 */
function flattenTokens(
  obj: TokenValue,
  prefix: string = '',
  result: Map<string, string> = new Map()
): Map<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const cssName = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'string') {
      result.set(`--${cssName}`, value);
    } else if (typeof value === 'object' && value !== null) {
      flattenTokens(value, cssName, result);
    }
  }

  return result;
}

/**
 * Группирует CSS-переменные по категориям для читаемости.
 */
function groupVariables(variables: Map<string, string>): Map<string, Map<string, string>> {
  const groups = new Map<string, Map<string, string>>();

  for (const [name, value] of variables) {
    // Извлекаем категорию из имени: --color-primary-500 → color
    const category = name.replace('--', '').split('-')[0];
    
    if (!groups.has(category)) {
      groups.set(category, new Map());
    }
    groups.get(category)!.set(name, value);
  }

  return groups;
}

/**
 * Генерирует CSS-файл с custom properties из сгруппированных переменных.
 */
function generateCSS(groups: Map<string, Map<string, string>>): string {
  const categoryLabels: Record<string, string> = {
    color: 'Colors',
    spacing: 'Spacing',
    typography: 'Typography',
    font: 'Typography',
    line: 'Typography',
    borderRadius: 'Border Radius',
    radius: 'Border Radius',
    shadow: 'Shadows',
    transition: 'Transitions',
  };

  let css = `/* \n * Дизайн-токены — автоматически сгенерировано из tokens.json\n * Не редактируйте вручную! Используйте: npm run tokens:build\n * Сгенерировано: ${new Date().toISOString()}\n */\n\n:root {\n`;

  for (const [category, variables] of groups) {
    const label = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
    css += `\n  /* ${label} */\n`;

    for (const [name, value] of variables) {
      css += `  ${name}: ${value};\n`;
    }
  }

  css += '}\n';
  return css;
}

function main(): void {
  console.log('📦 Чтение токенов из', TOKENS_JSON_PATH);

  if (!fs.existsSync(TOKENS_JSON_PATH)) {
    console.error('❌ Файл tokens.json не найден:', TOKENS_JSON_PATH);
    process.exit(1);
  }

  const tokensRaw = fs.readFileSync(TOKENS_JSON_PATH, 'utf-8');
  const tokens: TokenValue = JSON.parse(tokensRaw);

  console.log('🔄 Трансформация токенов в CSS custom properties...');
  const flatTokens = flattenTokens(tokens);
  const grouped = groupVariables(flatTokens);

  const css = generateCSS(grouped);

  fs.writeFileSync(TOKENS_CSS_PATH, css, 'utf-8');
  console.log(`✅ CSS-файл сгенерирован: ${TOKENS_CSS_PATH}`);
  console.log(`   Всего переменных: ${flatTokens.size}`);
}

main();
