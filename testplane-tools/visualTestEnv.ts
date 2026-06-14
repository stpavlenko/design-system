import 'dotenv/config';

/** Адрес VPS с Selenoid и MinIO — единственное место, где задаётся IP инфраструктуры. */
const VPS_HOST = process.env.VPS_HOST ?? '94.183.151.232';
const S3_BUCKET = process.env.S3_BUCKET ?? 'testplane-bundles';

export const visualTestEnv = {
	vpsHost: VPS_HOST,
	selenoidUrl: process.env.SELENOID_URL ?? `http://${VPS_HOST}:4444/wd/hub`,
	s3Endpoint: process.env.S3_ENDPOINT ?? `http://${VPS_HOST}:9000`,
	s3Bucket: S3_BUCKET,
	s3Region: process.env.S3_REGION ?? 'us-east-1',
	s3BaseUrl: process.env.S3_BASE_URL ?? `http://${VPS_HOST}:9000/${S3_BUCKET}`,
};

/** Прокидывает вычисленные URL в process.env для существующего кода. */
export function applyVisualTestEnv(): typeof visualTestEnv {
	process.env.SELENOID_URL = visualTestEnv.selenoidUrl;
	process.env.S3_ENDPOINT = visualTestEnv.s3Endpoint;
	process.env.S3_BUCKET = visualTestEnv.s3Bucket;
	process.env.S3_REGION = visualTestEnv.s3Region;
	process.env.S3_BASE_URL = visualTestEnv.s3BaseUrl;
	return visualTestEnv;
}

applyVisualTestEnv();
