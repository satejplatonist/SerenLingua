import { downloadFromS3 } from '@/s3/s3-server';
import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf';
import {Document, RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter';
import { getEmbeddings } from './embeddings/embeddings';
import md5 from 'md5';
import { Vector } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/db_data';
import { convertToAscii } from '@/utils/utils';

type PDFPage = {
   pageContent: string;
   metadata: {
      loc: {pageNumber: number}
   }
}

export const getPineCloneClientIndex = async () =>{
    try 
    {
        const pineconeApi = process.env.PINECONE_API_KEY!;
        if(!pineconeApi)
        {
           throw new Error('PINECONE_API_KEY is not defined in environment variables.');
        }
        const client = new Pinecone({
           apiKey: pineconeApi,
        });
        const index = await client.index('serenlingua');
        console.log("Pinecone initialized correctly ");
        return index;
    } catch (error) {
       console.error("Error initializing pinecone :: ",error); 
    }
}

export async function loadS3IntoPineCone(file_key: string,file_Name: string)
{
   // 1) obtain the pdf -> dowload from s3 and read from pdf
   console.log("Downloading s3 into file system ...");
   const file_name = await downloadFromS3(file_key,file_Name);
   // reading the pdf
   if(!file_name)
   {
      throw new Error("could not download from s3");
   }
   const loader = new PDFLoader(file_name);
   // getting pages within the pdf
   const pages = (await loader.load()) as PDFPage[];

   // 2) Split the pages into more smaller segments which will be ideal for segmentation
   const documents = await Promise.all(pages.map(SplitSmallerForVectorization));

   // 3) Vectorise and Embed indivisual documents
   const vectors = await Promise.all(documents.flat().map(VectoriseAndEmbedDocuments));

   // 4) Upload vectors to pinecone db
   const index = await getPineCloneClientIndex();
   if(!index)
   {
      throw new Error("Error initializing pinecone index");
   }

   console.log('Inserting vectors into pinecone');
   const namespace = convertToAscii(file_key);

   const recordChunks = chunks(vectors);
   for(const chunk of recordChunks)
   {
      await index.namespace(namespace).upsert(chunk);
   }
   console.log("upserting of vectors is done");
   return documents[0];
}

function chunks(array: PineconeRecord[], batchSize = 200) {
   const chunks = [];
   for (let i = 0; i < array.length; i += batchSize) {
      chunks.push(array.slice(i, i + batchSize));
   }
   return chunks;
}

export const truncateStringByBytes = (str: string, bytes: number) =>
{
   const encoder = new TextEncoder();
   return new TextDecoder('utf-8').decode(encoder.encode(str).slice(0,bytes));
}

async function SplitSmallerForVectorization(page: PDFPage)
{
   let {pageContent, metadata} = page; 

   // If the text is empty or very short, assume it's an image-based page.
   if (!pageContent || pageContent.trim().length < 10) {
      console.log(`Page ${metadata.loc.pageNumber} appears to be image based. Running OCR...`);
      pageContent = await runOCROnPage(page);
   }

   pageContent = pageContent.replace(/\n/g," ");
   // then we split the docs 
   const splitter = new RecursiveCharacterTextSplitter({chunkSize:4000, chunkOverlap:200});
   const Docs = await splitter.splitDocuments([
      new Document({
         pageContent,
         metadata:{
            pageNumber: metadata.loc.pageNumber,
            text: truncateStringByBytes(pageContent,12000)
         }
      })
   ])

   return Docs;
}

async function VectoriseAndEmbedDocuments(doc: Document) 
{
   try 
   {
      const embedding = await getEmbeddings(doc.pageContent);
      const hash = md5(doc.pageContent);
      return {
        id: hash,
        values: embedding,
        metadata: {
           text: doc.metadata.text,
           pageNumber: doc.metadata.pageNumber
        }
      } as PineconeRecord;
   } catch (error) {
     console.error("error while embedding document",error);
     throw error;
   }
}
function runOCROnPage(page: PDFPage): Promise<string> {
   throw new Error('Function not implemented.');
}

