/**
 * Figma Variables JSON Export → tokens.css
 *
 * Использование:
 *   npm run tokens:sync [путь_к_файлу]
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const DEFAULT_INPUT = path.resolve(__dirname, '../src/tokens/tokens.tokens.json');
const TOKENS_CSS = path.resolve(__dirname, '../src/tokens/tokens.css');

// ─── Типы Figma Variables JSON ────────────────────────────────────────────────

type FigmaColorValue = {
    colorSpace: 'srgb';
    components: [number, number, number];
    alpha: number;
    hex: string;
};

type FigmaLeaf = {
    $type: 'color' | 'number' | 'string';
    $value: FigmaColorValue | number | string;
};

type FigmaNode = { [key: string]: FigmaNode | FigmaLeaf };

// ─── Парсинг ──────────────────────────────────────────────────────────────────

function isLeaf(node: FigmaNode | FigmaLeaf): node is FigmaLeaf {
    return '$type' in node;
}

function getUnit(varName: string): string {
    if (varName.startsWith('spacing-') || varName.startsWith('borderRadius-')) return 'px';
    if (varName.startsWith('typography-fontSize-')) return 'px';
    return '';
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b]
        .map(v => Math.round(v * 255).toString(16).padStart(2, '0').toUpperCase())
        .join('');
}

function convertValue(leaf: FigmaLeaf, prefix: string): string {
    if (leaf.$type === 'color') {
        const val = leaf.$value as FigmaColorValue;
        return rgbToHex(val.components[0], val.components[1], val.components[2]);
    }
    if (leaf.$type === 'number') {
        const num = leaf.$value as number;
        const unit = getUnit(prefix);
        return unit ? `${num}${unit}` : String(num);
    }
    return String(leaf.$value);
}

type FlatTokens = Map<string, string>;

function parseNode(
    node: FigmaNode | FigmaLeaf,
    prefix: string,
    result: FlatTokens,
): void {
    if (isLeaf(node)) {
        result.set(`--${prefix}`, convertValue(node, prefix));
        return;
    }
    for (const [key, child] of Object.entries(node)) {
        if (key === '$extensions') continue;
        parseNode(
            child as FigmaNode | FigmaLeaf,
            prefix ? `${prefix}-${key}` : key,
            result,
        );
    }
}

// ─── CSS-генерация ────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
    color: 'Colors',
    spacing: 'Spacing',
    typography: 'Typography',
    borderRadius: 'Border Radius',
};

function generateCSS(tokens: FlatTokens): string {
    const groups = new Map<string, Map<string, string>>();

    for (const [name, value] of tokens) {
        const category = name.replace('--', '').split('-')[0];
        if (!groups.has(category)) groups.set(category, new Map());
        groups.get(category)!.set(name, value);
    }

    const date = new Date().toISOString();
    let css = `/*\n * Дизайн-токены — автоматически сгенерировано из Figma Variables JSON\n * Не редактируйте вручную! Источник: src/tokens/tokens.tokens.json\n * Сгенерировано: ${date}\n */\n\n:root {\n`;

    for (const [category, vars] of groups) {
        const label = CATEGORY_LABELS[category] ?? category;
        css += `\n  /* ${label} */\n`;
        for (const [name, value] of vars) {
            css += `  ${name}: ${value};\n`;
        }
    }

    css += '}\n';
    return css;
}

// ─── Точка входа ──────────────────────────────────────────────────────────────

function main(): void {
    const inputPath = process.argv[2] ?? DEFAULT_INPUT;

    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Файл не найден: ${inputPath}`);
        console.error('   Экспортируйте Variables из Figma: File → Export Variables → JSON');
        process.exit(1);
    }

    console.log(`📥 Читаем Figma Variables JSON: ${inputPath}`);
    const raw: FigmaNode = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    const tokens: FlatTokens = new Map();
    for (const [category, node] of Object.entries(raw)) {
        if (category === '$extensions') continue;
        parseNode(node as FigmaNode | FigmaLeaf, category, tokens);
    }

    const css = generateCSS(tokens);
    fs.writeFileSync(TOKENS_CSS, css, 'utf-8');

    console.log(`✅ Сгенерировано ${tokens.size} токенов → tokens.css`);
}

main();
