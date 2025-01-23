import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

const region: string | undefined = process.env.AWS_REGION;
const accessKeyId: string | undefined = process.env.AWS_ACCESS_KEY;
const secretAccessKey: string | undefined = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error('Missing AWS S3 configuration');
}

const setup: S3ClientConfig = {
  region,
  credentials: { accessKeyId, secretAccessKey },
};

const AWSclient = new S3Client(setup);

export { AWSclient };
