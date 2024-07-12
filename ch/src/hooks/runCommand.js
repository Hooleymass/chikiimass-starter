'use server'
import { exec } from "child_process";
import { error } from "console";
import { resolve } from "path";

export async function runCommand() {
    return new Promise((resolve, reject) => {
        const commannd = `ffmpegthumbnailer -i ${inputPath} -o ${outPutPath} -s 128`;
        exec(commannd, (error, stdout, stderr) => {
            if(error) {
                reject(error);
            }
            resolve(outPutPath);
        });
    });
}