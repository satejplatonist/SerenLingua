import { prisma } from "@/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    const body = await req.json();
    const {query,file_name} = body;
    const data = JSON.stringify(query);
    const insertingData = data.substring(15,data.length-7)
    console.log("\n",insertingData, " ");
    try 
    {
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
          return NextResponse.json({error:"chat not found"},{status:400});
        }
        const message_id_system = await prisma.message.create({
            data:{
                content:insertingData,
                chat_id:chat_id.id,
                role:Role.SYSTEM
            },
            select:{
                chat_id:true
            }
        });
        return NextResponse.json({message_id_system},{status:200});
    } catch (error) {
        console.error("error in inserting system answer in db ", query," ", file_name, " ", error);
    }
}