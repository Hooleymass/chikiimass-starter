'use server'
import path from "path";
import { runCommand } from './runCommand'

export async function generateThumnail(inputFile){
    const outputFilePath = path.join(process.cwd(), 'public', 'thumbnails', `${path.basename(inputFile, path.extname(inputFile))}.png`);
    return await runCommand(inputFile, outputFilePath);
}