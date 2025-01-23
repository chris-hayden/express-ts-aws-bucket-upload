import { Request, Response, Router } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AWSclient } from '../bucket/bucket';
import { nanoid } from 'nanoid';
import { imageUpload } from '../helpers/multer';
import { optimisedImage, processedFile } from '../helpers/sharp';
import { responseJsonStructure } from '../types';

const router = Router();

const handleUpload = async (req: Request, res: Response) => {
  let responseJson: responseJsonStructure = {
    id: nanoid(),
    message: '',
    url: '',
  };
  try {
    // Process and rename file, construct response object
    const newFile = await processedFile(responseJson.id);
    const resizedImageFile = await optimisedImage(req.file!.buffer);
    responseJson.message = 'Image resized successfully';
    responseJson.url = `${newFile.location}${newFile.fileName}`;
    // Upload function for created file
    await uploadImage(newFile, resizedImageFile);
    await res.status(200).json(responseJson);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const uploadImage = async (newFile: any, resizedImageFile: any) => {
  const bucket = process.env.AWS_BUCKET;
  try {
    const params = {
      Bucket: bucket,
      Key: 'gallery/' + newFile.fileName,
      Body: resizedImageFile,
    };
    await AWSclient.send(new PutObjectCommand(params));
    return 'File uploaded successfully';
  } catch (error) {
    console.error(error);
    return error;
  }
};

router.post(
  '/api/images/upload',
  imageUpload.single('galleryImage'),
  handleUpload
);

export default router;
