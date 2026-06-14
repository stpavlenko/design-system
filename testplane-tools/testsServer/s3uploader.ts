import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

let client: S3Client | null = null;

function getClient(): S3Client {
	if (!client) {
		client = new S3Client({
			endpoint: process.env.S3_ENDPOINT,
			region: 'us-east-1',
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
			},
			// Обязательно для MinIO — иначе SDK пытается обращаться через virtual-hosted style
			forcePathStyle: true,
		});
	}
	return client;
}

async function putFile(bucket: string, key: string, body: string, contentType: string) {
	await getClient().send(
		new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }),
	);
}

// Загружает index.html + bundle.js в одну папку на S3.
// Возвращает публичный URL index.html.
export async function uploadBundle(html: string, js: string, prefix: string): Promise<string> {
	const bucket = process.env.S3_BUCKET!;
	const baseUrl = process.env.S3_BASE_URL!;

	await Promise.all([
		putFile(bucket, `${prefix}/index.html`, html, 'text/html; charset=utf-8'),
		putFile(bucket, `${prefix}/bundle.js`, js, 'application/javascript; charset=utf-8'),
	]);

	return `${baseUrl}/${prefix}/index.html`;
}
