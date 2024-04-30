import { db } from "@/lib/db";
import { createDirectory } from "@/lib/files";
import { unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import * as z from "zod"

export async function GET(req: Request) {
    return NextResponse.json({ message: 'GET request' })
}
// define a schema for form validation
const MAX_FILE_SIZE = 300 * 1024
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]
const UploadSchema = z.object({
    image: z
        .custom<File>((val) => val instanceof File, "Required")
        .refine((file) => file.size <= MAX_FILE_SIZE,
            `File size should be less than 300 KB.`
        )
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only these types are allowed .jpg, .jpeg, .png and .webp"
        ),
})



export async function POST(req: Request) {
    const data = await req.formData();
    const email = data.get('email') as string;
    const file = data.get("image") as File;

    try {

        // check if email already exists in user table
        const existUserByEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (!existUserByEmail)
            return NextResponse.json({ user: null, message: 'User with this email not exists' }, { status: 409 })

        const relativeUploadDirectory = process.env.UPLOAD_DIRECTORY;
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.type.replace('image/', '')}`;
        const res: any = await createDirectory(relativeUploadDirectory!)
        if (res.statusText !== "OK") {
            return NextResponse.json({ message: 'Somethink went wrong!' }, { status: 500 })
        }
        const buffer = Buffer.from(await file.arrayBuffer());

        await writeFile(`${res.directory}/${fileName}`, buffer);
        const fileUrl = `${relativeUploadDirectory}/${fileName}`;

        const updatedUser = await db.user.update({
            where: { email: email },
            data: { image: fileUrl }
        })

        if (existUserByEmail.image)
            unlinkSync(`${res.directory}${existUserByEmail.image.replace(/^.*[\\/]/, '')}`)

        return NextResponse.json({ image: updatedUser.image, message: 'User created successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Somethink went wrong!' }, { status: 500 })
    }
}