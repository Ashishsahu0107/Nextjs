import { NextRequest, NextResponse } from "next/server";

interface paramsType {
    params: {
        id: number
    }
}

export async function GET(request: NextRequest, { params }: paramsType) {
    const { id } = params
    return NextResponse.json({
        postId: id
    });
}