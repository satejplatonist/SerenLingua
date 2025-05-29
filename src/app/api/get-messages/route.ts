import { prisma } from "@/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { file_name } = body
    const decodedFileName = decodeURIComponent(file_name);

    const chat = await prisma.chat.findFirst({
      where: { pdfName: decodedFileName },
      select: { id: true },
    })

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    const messages = await prisma.message.findMany({
      where: { chat_id: chat.id },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ response: messages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

