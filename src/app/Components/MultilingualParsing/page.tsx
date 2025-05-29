"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PackageOpen } from "lucide-react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeSanitize from "rehype-sanitize";

export default function MultiLingualParsing()
{
    const [output, setOutput] = useState<string>("")

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large : more than 10-MB")
        return
      }

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-file", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      //  If successful, updates the output state with the output field from the response data
      if (response.ok) {
        setOutput(data.output)
      } else {
        setOutput(data.error)
      }
    },
  })
  const rehypePlugins = [rehypeSanitize];
  return (
    <main className="flex flex-col items-center justify-center gap-y-4 p-14">
      <div {...getRootProps({ className: "h-10 w-20" })}>
        <Input {...getInputProps({ className: "h-auto w-auto hidden" })} />
        <Button className="text-lg bg-gradient-to-r from-red-800/75 to-orange-600/75 gap-x-2">
          Upload <PackageOpen />
        </Button>
      </div>
      <p className="mt-10 rounded-lg">
        {
          output &&
          <MarkdownPreview source={output} rehypePlugins={rehypePlugins} style={{ padding: 16 }} className="rounded-xl py-4 px-8"/>
        }
        {
          !output && <h1 className="pl-8 text-xl text-zinc-700">Your Resume/CV will be translated here in English</h1>
        }
      </p>
    </main>
  )
}