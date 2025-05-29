import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key not found" }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer();

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: file.type });

    // Use PDFLoader to extract text from the PDF
    const loader = new PDFLoader(blob);
    const docs = await loader.load()

    // Extract text from all pages
    const pdfText = docs.map((doc) => doc.pageContent).join("\n")

    console.log("entering",pdfText);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      This is the content of a multilingual resume/CV:
      ${pdfText}

      Please analyze the content, detect the language(s) used, and extract all the information from it in a structured manner.
      Provide a summary of the key details including:
      1. Personal Information (Name, Contact Details, etc.)
      2. Education
      3. Work Experience
      4. Skills
      5. Languages
      6. Any other relevant sections

      For each section, please specify the detected language(s) if multiple languages are used.
      and represent info in seperate paras which will appear on next line and one line of gap between each para
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const output = await response.text()

    return NextResponse.json({ output: output })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while processing the file" }, { status: 500 })
  }
}

