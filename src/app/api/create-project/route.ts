import { prisma } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    const user = await auth();
    if(!user)
    {
        return NextResponse.json({error: "User not found"},{status:400});
    }
    try 
    {
        const body = await req.json();
        const {name,githubUrl,githubToken} = body;
        console.log(name,githubUrl,githubToken);
        const project_id = await prisma.projects.create({
        data:{
            name: name,
            githubUrl: githubUrl,
            githubToken: githubToken,
            userId: String(user.userId)
        },
        select:{
            id:true
        }
        });

        return NextResponse.json({project_id},{status:200});
    } catch (error) {
        console.error("problem in creating project ", error);
    }
    
}