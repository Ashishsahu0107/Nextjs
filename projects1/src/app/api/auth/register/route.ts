import connectDB from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// status code

// 200=300 -> successs
// create ->  201
// frontend error == 400-499
// backend error == 500 -> internal server error

export async function POST(request: NextRequest) {
    try {

        const { name, email, password } = await request.json();
        await connectDB();

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "user already exist" },
                { status: 400 }
            )
        }

        // passowrd check 6 characters(optional)
        if (password.length <= 6) {
            return NextResponse.json(
                { message: "password must be 6 character" },
                { status: 400 }
            )
        }
        // password hashing
        const hashPassword = await bcrypt.hash(password, 10); // 10 ka matlab salt

        const user = await User.create({
            name, email, password: hashPassword
        })

        return NextResponse.json(
            user,
            { status: 201 }
        )


    } catch (error) {
        return NextResponse.json(
            { message: `register error ${error}` },
            {status:500}
        )

    }
}