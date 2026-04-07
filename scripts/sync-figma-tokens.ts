/**
 * Скрипт синхронизации дизайн-токенов из Figma Variables API.
 *
 * Использование:
 *   FIGMA_TOKEN=<personal-access-token> FIGMA_FILE_KEY=<file-key> tsx scripts/sync-figma-tokens.ts
 *
 * Figma Variables API (REST v1) возвращает коллекции переменных и их значения
 * для каждого mode. Скрипт трансформирует их в формат tokens.json,
 * совместимый с transform-tokens-to-css.ts.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

/* ---------- Типы Figma Variables API ---------- */

interface FigmaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface FigmaVariable {
    id: string;
    name: string;
    key: string;
    resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
    valuesByMode: Record<string, FigmaColor | number | string | boolean>;
    description: string;
    hiddenFromPublishing: boolean;
    scopes: string[];
    codeSyntax: Record<string, string>;
}

interface FigmaVariableCollection {
    id: string;
    name: string;
    key: string;
    modes: Array<{ modeId: string; name: string }>;
    defaultModeId: string;
    remote: boolean;
    hiddenFromPublishing: boolean;
    variableIds: string[];
}

interface FigmaVariablesResponse {
    status: number;
    error: boolean;
    meta: {
        variableCollections: Record<string, FigmaVariableCollection>;
        variables: Record<string, FigmaVariable>;
    };
}

/* ---------- Конфигурация ---------- */

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUTPUT_PATH = path.resolve(__dirname, '../src/tokens/tokens.json');

if (!FIGMA_TOKEN) {
    console.error('❌ Переменная окружения FIGMA_TOKEN не задана.');
    console.error('   Получите Personal Access Token: https://www.figma.com/developers/api#access-tokens');
    process.exit(1);
}

if (!FIGMA_FILE_KEY) {
    console.error('❌ Переменная окружения FIGMA_FILE_KEY не задана.');
    console.error('   Скопируйте ключ файла из URL: https://www.figma.com/design/<FILE_KEY>/...');
    process.exit(1);
}

/* ---------- Утилиты ---------- */

/** Конвертирует Figma RGBA (0–1) в HEX-строку */
function figmaColorToHex(color: FigmaColor): string {
    const toHex = (value: number): string => {
        const hex = Math.round(value * 255)
            .toString(16)
            .padStart(2, '0');
        return hex;
    };

    const r = toHex(color.r);
    const g = toHex(color.g);
    const b = toHex(color.b);

    if (color.a < 1) {
        const a = toHex(color.a);
        return `#${r}${g}${b}${a}`.toUpperCase();
    }

    return `#${r}${g}${b}`.toUpperCase();
}

/** Конвертирует число в строку с единицей измерения */
function figmaFloatToValue(value: number, name: string): string {
    const lowerName = name.toLowerCase();

    // Определяем единицу измерения по имени переменной
    if (lowerName.includes('opacity') || lowerName.includes('alpha')) {
        return String(value);
    }
    if (lowerName.includes('weight')) {
        return String(Math.round(value));
    }
    if (lowerName.includes('line-height') && value <= 3) {
        return String(value);
    }
    if (lowerName.includes('duration') || lowerName.includes('delay')) {
        return `${value}ms`;
    }

    // По умолчанию — пиксели
    return `${value}px`;
}

/**
 * Устанавливает значение по вложенному пути в объекте.
 * Путь определяется по имени переменной Figma (разделитель — `/`).
 * Например: "color/primary/500" → { color: { primary: { "500": value } } }
 */
function setNestedValue(
    obj: Record<string, unknown>,
    pathParts: string[],
    value: unknown,
): void {
    let current = obj;

    for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key] as Record<string, unknown>;
    }

    const lastKey = pathParts[pathParts.length - 1];
    current[lastKey] = value;
}

/* ---------- Основная логика ---------- */

async function fetchFigmaVariables(): Promise<FigmaVariablesResponse> {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;

    console.log(`📡 Запрос к Figma API: ${url}`);

    const response = await fetch(url, {
        headers: {
            'X-Figma-Token': FIGMA_TOKEN!,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(
            `Figma API вернул ошибку ${response.status}: ${text}`,
        );
    }

    return response.json() as Promise<FigmaVariablesResponse>;
}

function transformVariablesToTokens(
    data: FigmaVariablesResponse,
): Record<string, unknown> {
    const { variableCollections, variables } = data.meta;
    const tokens: Record<string, unknown> = {};

    // Обрабатываем каждую коллекцию
    for (const collection of Object.values(variableCollections)) {
        // Пропускаем скрытые коллекции
        if (collection.hiddenFromPublishing) {
            console.log(`  ⏭️  Пропуск скрытой коллекции: ${collection.name}`);
            continue;
        }

        console.log(`  📦 Коллекция: ${collection.name}`);
        const defaultModeId = collection.defaultModeId;

        for (const variableId of collection.variableIds) {
            const variable = variables[variableId];

            if (!variable || variable.hiddenFromPublishing) {
                continue;
            }

            // Берём значение из default mode
            const rawValue = variable.valuesByMode[defaultModeId];

            if (rawValue === undefined) {
                continue;
            }

            // Имя переменной в Figma: "color/primary/500"
            const nameParts = variable.name.split('/').map((part) => part.trim());

            let resolvedValue: unknown;

            switch (variable.resolvedType) {
                case 'COLOR':
                    resolvedValue = figmaColorToHex(rawValue as FigmaColor);
                    break;
                case 'FLOAT':
                    resolvedValue = figmaFloatToValue(
                        rawValue as number,
                        variable.name,
                    );
                    break;
                case 'STRING':
                    resolvedValue = rawValue as string;
                    break;
                case 'BOOLEAN':
                    resolvedValue = rawValue as boolean;
                    break;
                default:
                    resolvedValue = String(rawValue);
            }

            setNestedValue(tokens, nameParts, resolvedValue);
            console.log(`    ✅ ${variable.name} = ${String(resolvedValue)}`);
        }
    }

    return tokens;
}

async function main(): Promise<void> {
    console.log('🎨 Синхронизация дизайн-токенов из Figma...\n');

    try {
        // 1. Получаем переменные из Figma
        const data = await fetchFigmaVariables();

        // 2. Трансформируем в формат tokens.json
        const tokens = transformVariablesToTokens(data);

        // Проверяем, что получили хоть что-то
        const tokenCount = JSON.stringify(tokens).split(':').length - 1;
        if (tokenCount === 0) {
            console.warn(
                '\n⚠️  Не найдено ни одной переменной. Проверьте, что в файле Figma есть опубликованные Variables.',
            );
            process.exit(1);
        }

        // 3. Сохраняем в файл
        const outputDir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(tokens, null, 4) + '\n', 'utf-8');

        console.log(`\n✅ Токены сохранены в ${path.relative(process.cwd(), OUTPUT_PATH)}`);
        console.log(`   Всего значений: ~${tokenCount}`);
        console.log('\n💡 Запустите `npm run tokens:build` для генерации CSS custom properties.');
    } catch (error) {
        console.error('\n❌ Ошибка синхронизации:', (error as Error).message);
        process.exit(1);
    }
}

main();
