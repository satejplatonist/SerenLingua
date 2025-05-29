"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { uploadToS3 } from "@/s3/s3";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PackageOpen } from "lucide-react";
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pdfjs } from 'react-pdf';
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


type chatsObj = {
    id: number,
    pdfName: string,
    pdfUrl: string,
    fileKey: string,
}

const Chat = () =>{

    const [uploading,setUploading] = useState(false);
    const router = useRouter();
    const [chats,setChats] = useState<chatsObj[]>([]) 
    
    const {mutate,isPending} = useMutation({
        mutationFn: async ({file_key, file_name} : {file_key:string,file_name:string})=>{
            const response = await axios.post('/api/create-chat',{
                file_key,file_name
            });
            return response.data;
        }
    });
    
    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        maxFiles:1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            if(file.size > 10 * 1024 * 1024)
            {
                toast.error("File too large : more than 10-MB")
                return;
            }
            try
            {
              setUploading(true);
              const data = await uploadToS3(file);
              if(!data?.file_key || !data.file_name)
              {
                toast.error("Someting went wrong ");
                return;
              }
              mutate(data,{
                onSuccess: ({chat_id}) =>{                    
                   toast.success("Chat Has been created");
                   router.push(`/Components/ChatWithPdf`);
                },
                onError: (err) => {
                   toast.error("Error creating chat");
                }
              });
              console.log('data ', data);
            }catch(error){
                console.log(error);
            }finally{
                setUploading(false);
            }
        }
    });

    useEffect(()=>{
        
        const fetchChats = async () => {
            console.log("use effect called");
            try {
              console.log("start");
              const response = await fetch('/api/get-chats', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
    
              const data = await response.json();
              if (response.ok) {
                console.log("got user data for chat",data);
                setChats(data);
                console.log(chats);
              } else {
                console.error('Error fetching chats:', data);
              }
            } catch (error) {
              console.error('Failed to fetch chats:', error);
            }
          };
    
          fetchChats();
        
    },[]);

    const showPdf = (pdf_name:string) =>{
        
    }
    
    return(
        <Sidebar className="">
            <SidebarHeader {...getRootProps({className:"h-auto-w-auto"})} className="mt-14">
                <Input {...getInputProps({className:"h-auto w-auto hidden"})}/>
                {(isPending || uploading) ? 
                    (<div className="flex flex-row items-center justify-center gap-x-2">
                      <Loader2 className="h-10 w-10 text-red-600/75 animate-spin"/> Uploading ...
                    </div>)
                    :
                    (<Button  className="text-lg bg-gradient-to-r from-red-800/75 to-orange-600/75 gap-x-2">
                    Upload <PackageOpen/></Button>)
                 }
            </SidebarHeader>
            <SidebarContent className="scrollbar-thin scrollbar-track-slate-400">
                <SidebarGroup className="gap-1 items-center">
                  <SidebarMenu className="gap-1 items-center">
                    {
                      chats.length === 0 ? (
                        <p>No chats available</p>
                      ):
                      chats.map((item) =>(
                        <SidebarMenuItem key={item.id} className="w-60 text-center">
                           <SidebarMenuButton className="bg-zinc-100/75" asChild>
                            <Link href={`/Components/ChatWithPdf/${item.pdfName}`}>
                              <span className="text-md truncate text-center">{item.pdfName}</span>
                            </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    }
                  </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
}


export default Chat;
