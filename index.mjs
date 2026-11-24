import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  ...(process.env.AWS_ENDPOINT_URL ? { endpoint: process.env.AWS_ENDPOINT_URL, forcePathStyle: true } : {})
});

const DEST_BUCKET = process.env.DEST_BUCKET || "thumbnails-bucket";

export const handler = async (event) => {
    for (const record of event.Records ?? []) {
    const srcBucket = record.s3.bucket.name;

    const getRes = await s3.send(
      new GetObjectCommand({ Bucket: srcBucket, Key: srcKey })
    );
    const bodyBytes = await getRes.Body.transformToByteArray();

    const thumbKey = `thumb-${srcKey}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: DEST_BUCKET,
        Key: thumbKey,
        Body: bodyBytes,
        ContentType: getRes.ContentType || "application/octet-stream"
      })
    );

    console.log(`Processed ${srcBucket}/${srcKey} -> ${DEST_BUCKET}/${thumbKey}`);
  }

  return { statusCode: 200, body: "OK" };
};