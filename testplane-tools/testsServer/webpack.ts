import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import os from 'os';
import fs from 'fs';

const ROOT = path.resolve(__dirname, '../../');
const GLOBALS = path.resolve(__dirname, 'webpack/globals.ts');
const BOOTSTRAP = path.resolve(__dirname, 'webpack/bootstrap.ts');
const TEMPLATE = path.resolve(__dirname, 'webpack/template.html');

export interface BuildResult {
	html: string;
	js: string;
}

function runWebpack(absTestPath: string): Promise<BuildResult> {
	const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'testplane-bundle-'));

	const config: webpack.Configuration = {
		mode: 'development',
		entry: [GLOBALS, absTestPath, BOOTSTRAP],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: {
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							compilerOptions: {
								jsx: 'react-jsx',
								module: 'CommonJS',
								moduleResolution: 'node',
								esModuleInterop: true,
							},
						},
					},
				},
				{
					test: /\.module\.css$/,
					use: [
						{ loader: 'style-loader', options: { esModule: false } },
						{
							loader: 'css-loader',
							options: {
								modules: { localIdentName: '[name]__[local]', exportLocalsConvention: 'asIs' },
								esModule: false,
							},
						},
					],
				},
				{
					test: /\.css$/,
					exclude: /\.module\.css$/,
					use: [
						{ loader: 'style-loader', options: { esModule: false } },
						{ loader: 'css-loader', options: { esModule: false } },
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({ template: TEMPLATE, inject: 'body', minify: false }),
		],
		output: {
			path: outDir,
			filename: 'bundle.js',
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.css'],
			modules: [path.join(ROOT, 'node_modules'), 'node_modules'],
		},
		resolveLoader: {
			modules: [path.join(ROOT, 'node_modules')],
		},
		performance: { hints: false },
		stats: 'errors-only',
	};

	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				fs.rmSync(outDir, { recursive: true, force: true });
				reject(err);
				return;
			}

			if (stats?.hasErrors()) {
				fs.rmSync(outDir, { recursive: true, force: true });
				reject(new Error(stats.toString({ colors: false, errors: true })));
				return;
			}

			const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
			const js = fs.readFileSync(path.join(outDir, 'bundle.js'), 'utf-8');
			fs.rmSync(outDir, { recursive: true, force: true });
			resolve({ html, js });
		});
	});
}

export function buildTestFile(absTestPath: string): Promise<BuildResult> {
	return runWebpack(absTestPath);
}
