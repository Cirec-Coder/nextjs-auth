import { promises } from "dns";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function createDirectory(path: string) {

    const uploadDir = join(process.cwd(), "public", path, "\\");

    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            // This is for checking the directory is exist (ENOENT : Error No Entry)
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(
                "Error while trying to create directory when uploading a file\n",
                e
            );
            return {
                error: "Something went wrong.",
                status: 500, statusText: "Internal Server Error"
            }
        }
    }

    return {
        directory: uploadDir,
        status: 200,
        statusText: "OK"
    };
}