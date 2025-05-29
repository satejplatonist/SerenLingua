import { prisma } from "@/db";
import { loadS3IntoPineCone } from "@/pinecone/pinecone";
import { getS3Url } from "@/s3/s3";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,res: Response)
{
    const {userId} = await auth();
    if(!userId)
    {
        return NextResponse.json({error: "unauthorized"},{status: 401});
    }
    try 
    {
        const body = await req.json();
        const {file_key,file_name} = body;
        await loadS3IntoPineCone(file_key,file_name);
        const chat_id = await prisma.chat.create({
            data:{
               fileKey: file_key,
               pdfName: file_name,
               pdfUrl: getS3Url(file_key),
               userId: userId,
            },
            select:{
                id: true,
            }
        });
        return NextResponse.json({chat_id},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error:"Internal Server Error"},
            {status:500}
        );
    }
}