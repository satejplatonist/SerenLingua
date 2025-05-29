"use client"
import PdfComp from "../PdfViewer";
import { Separator } from "@/components/ui/separator";
import { MessageSquareQuote, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatsComponent from "../ChatComponent";
import React, { useEffect, useState } from "react";
import { ReachabilityStatus } from "aws-sdk/clients/route53domains";
import toast from "react-hot-toast";
import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

type ChatProps = {
    params:{
        file_name:string
    }
}


export default function ChatWithPdf(props: ChatProps)
{
    const[input,SetInput] = useState<string>("");
    const[answer,setAnswer] = useState<any>();

    const handleSubmit = async (e:React.FormEvent) =>{
      console.log("handling input")
      e.preventDefault();
      if(input?.length>300)
      {
        toast.error("Question excedded 300 characters");
        return;
      }
      try 
      {
        const message_id_user = await fetch('/api/insert-chat-query',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            query: input, // Your first value
            file_name: props.params.file_name // Your second value
          })
        })

        const response = await fetch("/api/get-answer",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            query: input,
            file_name: props.params.file_name
          })
        }) 
        const data = await response.json();
        setAnswer(data)
        console.log("\n this is data ",answer);
        const message_id_system = await fetch('/api/insert-chat-answer',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            query: JSON.stringify(data), // Your first value
            file_name: props.params.file_name // Your second value
          })
        })
        
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
    useEffect(() => {
      if (answer) {
          setAnswer(answer)
          console.log("\n this is data after state update:", answer.answer);
          const insertAnswer = async() =>{
            const message_id_system = await fetch('/api/insert-chat-answer',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                query: answer.answer, // Your first value
                file_name: props.params.file_name // Your second value
              })
            })
          }
          
      }
    }, [answer]);
    return(
      <main className="grid grid-cols-12 h-screen gap-x-2 pb-4 px-2">
      <section className="col-span-6 h-full overflow-hidden border-2">
        <div className="h-full hover:overflow-y-auto scrollbar-thin scrollbar-track-zinc-400">
          <PdfComp fileName={props.params.file_name}/>
        </div>
      </section>
      <section className="h-[100vh] col-span-6 flex flex-col rounded-md border-2 pb-2">
        <div className="h-[8vh] p-4 flex flex-row items-center justify-center gap-x-4">
          <MessageSquareQuote className="bg-orange-200 p-0.5 size-7 rounded-lg text-red-700"/>
          <h1 className="text-lg text-center text-red-700">Chat with PDF</h1>
        </div>
        <Separator/>
        <div className="h-[84vh] overflow-y-hidden w-full px-2 flex flex-1 flex-col">
          <div className="flex-1 hover:overflow-y-auto h-full scrollbar-thin scrollbar-track-zinc-400 w-full">
            <ChatsComponent pdf_name={props.params.file_name}/>
          </div>
        </div>
        <Separator/>
        <div className="h-[8vh] p-1 flex flex-row items-center justify-center gap-x-4  mt-2">
          <form className="flex flex-row items-center justify-center gap-x-4" onSubmit={handleSubmit}>
            <Input className="selection:bg-red-800/75 selection:text-white" 
                  placeholder="Chat With Pdf ....."
                  maxLength={300} 
                  onChange={(e) => SetInput(e.target.value)}/>
            <Button className="w-32 bg-red-700 hover:bg-red-600 flex flex-row items-center justify-center 
            gap-x-2" type="submit"><Send/></Button>
          </form>
        </div>
      </section>
      </main>
    );
}