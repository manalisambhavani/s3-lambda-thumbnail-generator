# S3 Lambda Thumbnail Generator

An event-driven serverless image thumbnail generator built with **Node.js** and **AWS Lambda**, triggered automatically when images are uploaded to an **Amazon S3** bucket. Configured and deployed step-by-step using raw **AWS CLI** commands and custom **IAM** policies.

## Architecture

1. A source image is uploaded to the input S3 bucket.
2. S3 triggers the `thumbnail-generator` Lambda function (`nodejs24.x`).
3. Lambda assumes `thumbnail-lambda-role`, reads the image from S3, generates a thumbnail, and writes it to the destination bucket/prefix.
4. Execution logs are written to CloudWatch Logs (`/aws/lambda/thumbnail-generator`).

## Project Structure

```text
s3-lambda-thumbnail-generator/
├── index.mjs                  # Lambda handler logic
├── trust-policy.json          # IAM trust policy allowing Lambda to assume the role
├── thumbnail-s3-policy.json   # Inline IAM policy granting S3 read/write permissions
├── .gitignore                 # Excludes function.zip, node_modules, and local logs
└── README.md