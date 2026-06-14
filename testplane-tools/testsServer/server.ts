import '../visualTestEnv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { buildTestFile } from './webpack';
import { uploadBundle } from './s3uploader';

const app = express();

const PORT = process.env.TESTS_SERVER_PORT || 3000;
const ROOT = process.cwd() + path.sep;

interface CacheEntry {
	url: string;
	mtime: number;
}

const cache = new Map<string, CacheEntry>();
const pending = new Map<string, Promise<string>>();

app.get('/build/', async (req, res) => {
	const testFile = req.query.testFile as string;

	if (!testFile) {
		res.status(400).json({ error: 'testFile query param is required' });
		return;
	}

	const absPath = path.resolve(process.cwd(), testFile);

	if (!absPath.startsWith(ROOT)) {
		res.status(400).json({ error: 'testFile must be within project root' });
		return;
	}

	if (!fs.existsSync(absPath)) {
		res.status(404).json({ error: `File not found: ${absPath}` });
		return;
	}

	const mtime = fs.statSync(absPath).mtimeMs;
	const cached = cache.get(testFile);

	if (cached && cached.mtime === mtime) {
		res.json({ url: cached.url });
		return;
	}

	if (pending.has(testFile)) {
		try {
			const url = await pending.get(testFile)!;
			res.json({ url });
		} catch (err) {
			res.status(500).json({ error: String(err) });
		}
		return;
	}

	const buildPromise = (async () => {
		console.log(`[testsServer] building ${testFile}...`);
		const { html, js } = await buildTestFile(absPath);
		const hash = crypto.createHash('md5').update(js).digest('hex').slice(0, 8);
		const prefix = `${testFile.replace(/[^a-z0-9./_-]/gi, '_')}-${hash}`;
		const url = await uploadBundle(html, js, prefix);
		console.log(`[testsServer] uploaded → ${url}`);
		cache.set(testFile, { url, mtime });
		return url;
	})();

	pending.set(testFile, buildPromise);

	try {
		const url = await buildPromise;
		res.json({ url });
	} catch (err) {
		console.error(`[testsServer] error building ${testFile}:`, err);
		res.status(500).json({ error: String(err) });
	} finally {
		pending.delete(testFile);
	}
});

app.get('/clearcache/', (_req, res) => {
	cache.clear();
	res.json({ status: 'ok' });
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
	console.log(`[testsServer] ready on http://localhost:${PORT}`);
});
