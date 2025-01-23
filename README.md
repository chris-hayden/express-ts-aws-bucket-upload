# AWS S3 Bucket Image Upload Tool

A simple Express server which has a single endpoint (aside from `/`). Images in a form request body sent as POST requests to `/api/images/upload` are processed using [Multer](https://www.npmjs.com/package/multer) and optimised using [Sharp](https://www.npmjs.com/package/sharp) before being uploaded to an S3 bucket.

I made this for use in a personal project. There was additional functionality to add a record to a DynamoDB table using a description taken from the form, as well as functionality to delete images from the bucket and its record from the DB table. I have kept this as simple as possible for now as my use case was fairly specific, but may incorporate the functionality in this repo in the future.

---

## .env variables

Your .env file requires the following entries.

**AWS_REGION** = *eu-east-2*  
The region of your S3 Bucket  
**AWS_ACCESS_KEY**: *abc1234*  
Your AWS Access Key  
**AWS_SECRET_ACCESS_KEY**: *def5678*  
Your AWS Secret Access Key  
**AWS_BUCKET**: *my-image-upload-bucket*  
The name of your S3 Bucket  
**AWS_LOCATION**: *https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com*/**gallery**/  
A concatination of bucket and region with any additional paths you may need. This example project uses *gallery* as part of the path.

## Image optimisations

All manipulation, filters and output formats for images and changes to the file name can be adjusted in the `sharp.ts` file. 

The example in this repository simply resizes the image to 800px wide (maintaining aspect ratio), sets its quality to 80 and outputs the result as .jpeg. The output filename is given a nanoid() and appends *-optimised.jpeg*.

Sharp has extensive documentation for the available image manipulation options.

## CORS

Important: By default, access is allowed from anywhere. CORS can be configured in the `app.ts` file.