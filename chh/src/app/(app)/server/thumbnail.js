import { exec } from 'child_process';
import path from 'path';

export async function createThumbnail(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const command = `ffmpegthumbnailer -i ${inputPath} -o ${outputPath} -s 128`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(outputPath);
    });
  });
}

export async function generateThumbnail(inputFile) {
  const outputFilePath = path.join(process.cwd(), 'thumbnails', `${path.basename(inputFile, path.extname(inputFile))}.png`);
  return await createThumbnail(inputFile, outputFilePath);
}
