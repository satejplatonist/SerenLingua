import { prisma } from "@/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    const body = await req.json();
    const {query,file_name} = body;
    console.log("entered in query insert");
    try 
    {
        console.log("file name ", file_name);
        const decodedFileName = decodeURIComponent(file_name);
        const chat_id = await prisma.chat.findFirst({
            where:{
                pdfName:decodedFileName
            },
            select:{
                id:true
            }
        })
        if(!chat_id)
        {
          return NextResponse.json({error:"chat not found"},{status:402});
        }
        console.log("chat id ",chat_id);
        const message_id_user = await prisma.message.create({
            data:{
                content:query,
                chat_id:chat_id.id,
                role:Role.USER
            },
            select:{
                chat_id:true
            }
        });
        console.log("message id ",message_id_user);
        return NextResponse.json({message_id_user},{status:200});
    } catch (error) {
        console.error("error in inserting user query in db ", query," ", file_name, " ", error);
    }
}