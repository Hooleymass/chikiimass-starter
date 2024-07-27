import { exec } from 'child_process';

// Function to generate a thumbnail using ffmpegthumbnailer
const generateThumbnail = async (inputFile: string, outputFile: string, size = 128, time = '10', quality = 8): Promise<void> => {
  return new Promise((resolve, reject) => {
    const outputFormat = outputFile.toLowerCase().endsWith('.jpg') || outputFile.toLowerCase().endsWith('.jpeg') ? 'jpeg' : 'png';
    const command = `ffmpegthumbnailer -i ${inputFile} -o ${outputFile} -s ${size} -t ${time} -q ${quality} -c ${outputFormat}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating thumbnail: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`ffmpegthumbnailer stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`Thumbnail generated successfully at: ${outputFile}`);
      resolve();
    });
  });
};

// Hook function for generating video thumbnail in Payload CMS
export const generateVideoThumbnail = async (data: any, originalDoc: any): Promise<any> => {
  if (data.video && data.video !== originalDoc.video) {
    const videoFilePath: string = data.video.path; // Assuming 'path' is where the video is stored
    const thumbnailFilePath: string = `./thumbnails/${data.video.filename}.jpg`; // Adjust path and filename as needed

    try {
      await generateThumbnail(videoFilePath, thumbnailFilePath, 256, '5', 8);
      return {
        ...data,
        thumbnail: thumbnailFilePath,
      };
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      throw error;
    }
  }
  return data;
};
