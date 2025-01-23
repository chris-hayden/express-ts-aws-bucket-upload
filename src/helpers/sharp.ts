import sharp from 'sharp';

// Image manipulation and output should be configured here
const optimisedImage = async (image: Buffer) => {
  try {
    const resized = await sharp(image)
      .resize({
        width: 800,
      })
      .jpeg({
        quality: 80,
      })
      .toFormat('jpeg')
      .toBuffer();
    return resized;
  } catch (error) {
    return String(error);
  }
};

const processedFile = async (id: string) => {
  // Modify the filen ame as required below
  const newFileName: string = `${id}-optimised.jpeg`;
  return {
    location: process.env.AWS_LOCATION,
    fileName: newFileName,
  };
};

export { optimisedImage, processedFile };
