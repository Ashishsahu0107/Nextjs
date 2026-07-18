import { NextRequest, NextResponse } from "next/server";

// NextRequest and NextResponse are available in the Edge Runtime.
export async function GET() {
    return NextResponse.json({
        name: "json",
        age: 89,
    });
}

export async function POST(request: NextRequest) {
    const { name, age } = await request.json();
    return NextResponse.json({
        name,
        age,
    });
}

