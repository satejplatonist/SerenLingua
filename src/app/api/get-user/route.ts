import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const user = await auth();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ userId: user.userId });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
