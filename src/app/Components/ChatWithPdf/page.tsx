import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import Chat from "./Chat";
import { auth } from "@clerk/nextjs/server";

export default function ChatWithPdf()
{
    return(
        <main className="min-h-screen w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl text-red-400/50">Choose chat from the ChatBar</h1>
        </main>
    );
}