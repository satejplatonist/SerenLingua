// src/app/api/get-answer/route.ts
export const runtime = 'nodejs';
import { prisma } from "@/db";
import { getEmbeddings } from "@/pinecone/embeddings/embeddings";
import { getPineCloneClientIndex } from "@/pinecone/pinecone";
import { convertToAscii } from "@/utils/utils";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";


const hf = new HfInference(process.env.HF_TOKEN);


export async function POST(req: NextRequest)
{
   const user = await auth();
   if (!user) {
    console.log("auth failed");
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
   }
   const body = await req.json();
   const {query,file_name} = body;

   if (!query) {
    return NextResponse.json({ error: "Query is required." }, { status: 400 });
   }

   console.log("question is as follows : ",query)

   // 1) generate embeddings for query
   console.log("start");
   const queryEmbedding = await getEmbeddings(query);
   console.log("end");
   console.log(queryEmbedding);

   // 2) get file key from prisma
   const decodedFileName = decodeURIComponent(file_name);
   const file_key = await prisma.chat.findFirst({
      where:{
        pdfName:String(decodedFileName),
        userId:String(user.userId)
      },
      select:{
        fileKey:true
      }
   })

   if(!file_key)
   {
     return NextResponse.json({error: "filekey not found"},{status: 400});
   }

   // 3) query pinecone db
   const namespace = convertToAscii(file_key.fileKey);
   const index = await getPineCloneClientIndex();
   if(!index){return NextResponse.json({error: "pine cone index not found"},{status: 400});}

   const {matches} = await index.namespace(namespace).query({
      vector: queryEmbedding as number[],
      topK: 1,
      includeMetadata: true,
   });

   console.log("matches are : " , matches);

   const context = await matches.map(match => match.metadata?.text).join("\n");

   console.log("context is ", context);
   console.log("\n");

   if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "API key not found" }, { status: 400 })
   }
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

   const prompt = `
    **ROLE:** You're a technical document analyst. Use ONLY the provided context to answer. Never invent information.
    remove new line characters from final answer and put them directly on new line

    **QUERY ANALYSIS:**
    "${query}"
    - Identify key focus areas: ${query.split(' ').filter((w:any) => w.length > 3).join(', ')}
    - Determine required answer type: ${query.startsWith('What') ? 'definition' : query.startsWith('How') ? 'process' : 'fact'}

    **CONTEXT:** 
    ${context}

    **FORMATTING RULES:**
    1. Code Blocks ➔ \`\`\`{proper-language}
      {code}
      \`\`\`
    2. Measurements ➔ **bold** values (e.g., 700mA → **700mA**)
    3. Technical Terms ➔ _italicize_ on first mention
    4. Error Codes ➔ ||spoiler tags|| for sensitive info
    5. Tables ➔ Markdown format with alignment

    **RESPONSE GUIDELINES:**
    1. If answer requires combining multiple context sections:
      ## Comprehensive Answer
      {synthesized answer}

    2. For single-value responses:
      ➔ Direct format: "The ${query.split(' ')[0]} is: **{value}**"

    3. When context contains related but unclear info:
      ## Potential Clues
      - {list relevant excerpts}
      "This suggests... but isn't definitive"

    example is provided, whereever small answer is required give it
    **EXAMPLES:**
    Query: "What's the maximum current rating?"
    Context Excerpt: "page 12: max current 700mA (see safety section)"
    Response: "Maximum current: **700mA**"

    **CODE HANDLING:**
    1. For complete code examples:
      \`\`\`{detected-language}
      {full code block}
      \`\`\`
      - Include all relevant context
      - Preserve original formatting

    2. For code snippets:
      \`\`\`{detected-language}
      // Relevant section
      {code snippet}
      \`\`\`
      "Additional context: {explanation}"

    3. For multiple code examples:
      ## Code Implementation Options
      ### Option 1: {description}
      \`\`\`{language}
      {code}
      \`\`\`
      
      ### Option 2: {description}
      \`\`\`{language}
      {code}
      \`\`\`

    below is for error handling but you can give in any language. if specified in query do accordingly
    Query: "Show the error handling code example"
    Context Excerpt: "try {\n  // code\n} catch (err) {\n  logger.error(err);\n}"
    Response: \`\`\`javascript
    try {
      // main code logic
    } catch (error) {
      logger.error(||ERROR_CODE||);
    }
    \`\`\`

    **FINAL ANSWER FOR "${query}":**
    `;

    const result = await model.generateContent(prompt)
    const response = await result.response
    const output = await response.text()

    return NextResponse.json({ output: output });
}