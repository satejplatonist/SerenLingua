import { prisma } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    console.log("user id is : ", user.userId);

    if (!user) {
      console.log("auth failed");
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Query the database to get the chats of the current user
    const chats = await prisma.chat.findMany({
      where: { userId: String(user.userId) },
      select: {
        id: true,
        pdfName: true,
        pdfUrl: true,
        fileKey: true,
      },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
  }
}
