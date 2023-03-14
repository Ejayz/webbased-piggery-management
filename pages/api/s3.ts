import { S3 } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
dotenv.config();

const access: any = process.env.SPACES_KEY;
const secret: any = process.env.SPACES_SECRET;
const bucket: any = process.env.BUCKET_NAME;

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "sgp1",
  credentials: {
    accessKeyId: access,
    secretAccessKey: secret,
  },
});

const bucketParams = { Bucket: bucket };
export { s3Client, bucketParams, bucket };
