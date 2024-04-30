import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod"

export async function GET(req: Request) {
    return NextResponse.json({ message: 'GET request' })
}
// define a schema for form validation
const UserSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must have 8 caracters at least'),
    // TODO: add regex validation
})



export async function POST(req: Request) {
    try {
        const body = await req.json();
        // validate the user schema
        const { username, email, password } = UserSchema.parse(body);

        // check if email already exists in user table
        const existUserByEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (existUserByEmail)
            return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 })
        // check if email already exists in user table
        const existUserByUsername = await db.user.findUnique({
            where: { username: username }
        })
        if (existUserByUsername)
            return NextResponse.json({ user: null, message: 'User with this username already exists' }, { status: 409 })

        const hashedPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        })

        const { password: newPassword, ...rest } = newUser
        return NextResponse.json({ user: rest, message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Somethink went wrong!' }, { status: 500 })
    }
}