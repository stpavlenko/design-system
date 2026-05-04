/**
 * Конвертирует tokens.json → Figma Variables JSON формат.
 * Один файл на коллекцию → импортировать через Variables panel → Import.
 *
 * Использование: npm run tokens:figma
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const INPUT_PATH = path.resolve(__dirname, '../src/tokens/tokens.json');
const OUTPUT_DIR = path.resolve(__dirname, '../src/tokens/figma-json');

type FigmaColorValue = {
    colorSpace: 'srgb';
    components: [number, number, number];
    alpha: number;
    hex: string;
};

type FigmaLeaf = {
    $type: string;
    $value: FigmaColorValue | number | string;
    $extensions: { 'com.figma.scopes': string[] };
};

type FigmaNode = { [key: string]: FigmaNode | FigmaLeaf };

function hexToComponents(hex: string): [number, number, number] {
    return [
        parseInt(hex.slice(1, 3), 16) / 255,
        parseInt(hex.slice(3, 5), 16) / 255,
        parseInt(hex.slice(5, 7), 16) / 255,
    ];
}

function toFigmaValue(tokenPath: string, value: string): { $type: string; $value: FigmaColorValue | number | string } {
    const category = tokenPath.split('/')[0];
    const sub = tokenPath.split('/')[1] ?? '';

    if (category === 'color') {
        return {
            $type: 'color',
            $value: {
                colorSpace: 'srgb',
                components: hexToComponents(value),
                alpha: 1,
                hex: value,
            },
        };
    }

    if (category === 'typography') {
        if (sub === 'fontFamily') return { $type: 'string', $value: value };
        return { $type: 'number', $value: parseFloat(value) };
    }

    // spacing, borderRadius — число без единиц
    return { $type: 'number', $value: parseFloat(value) };
}

function buildFigmaNode(
    obj: Record<string, unknown>,
    prefix = '',
): FigmaNode {
    const result: FigmaNode = {};

    for (const [key, val] of Object.entries(obj)) {
        const tokenPath = prefix ? `${prefix}/${key}` : key;

        if (typeof val === 'string') {
            const { $type, $value } = toFigmaValue(tokenPath, val);
            result[key] = {
                $type,
                $value,
                $extensions: { 'com.figma.scopes': ['ALL_SCOPES'] },
            };
        } else if (typeof val === 'object' && val !== null) {
            result[key] = buildFigmaNode(val as Record<string, unknown>, tokenPath);
        }
    }

    return result;
}

function main(): void {
    const tokens = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf-8')) as Record<string, unknown>;
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const SKIP = new Set(['shadow', 'transition']);
    const filtered = Object.fromEntries(
        Object.entries(tokens).filter(([k]) => !SKIP.has(k)),
    );

    const node = buildFigmaNode(filtered);
    const output = {
        ...node,
        $extensions: { 'com.figma.modeName': 'Mode 1' },
    };

    const outPath = path.join(OUTPUT_DIR, 'tokens.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');

    const count = JSON.stringify(output).split('"$type"').length - 1;
    console.log(`✅ ${count} переменных → ${path.relative(process.cwd(), outPath)}`);
    console.log('\n💡 Импорт в Figma:');
    console.log('   Variables panel → создать коллекцию → Import → figma-json/tokens.json');
}

main();
