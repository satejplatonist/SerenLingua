"use client"

import { useEffect, useState } from "react"
import { Role } from "@prisma/client"
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeSanitize from "rehype-sanitize";

type Message = {
  chat_id: number
  id: number
  content: string
  createdAt: Date
  role: Role
}

type MessagesProps = {
  pdf_name: string
}

function ChatsComponent({ pdf_name }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/get-messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_name: pdf_name }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }

        const data = await response.json()
        setMessages(data.response)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [pdf_name])

  if (isLoading) {
    return <div>Loading messages...</div>
  }
  const rehypePlugins = [rehypeSanitize];
  return (
    <div className="h-full w-full space-y-4 my-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.role === Role.USER ? "bg-red-100 text-red-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          <p className="font-semibold">{message.role === Role.USER ? "You" : "AI"}</p>
          {
             message.role == Role.USER ? <p>{message.content}</p> : <MarkdownPreview source={message.content} rehypePlugins={rehypePlugins} style={{ padding: 16,backgroundColor:"#FFFBEB",color:"#991B1B",fontSize:16 }} className="rounded-xl py-4 px-8"/>
          }
        </div>
      ))}
    </div>
  )
}

export default ChatsComponent

