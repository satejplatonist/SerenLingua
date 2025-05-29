"use client"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BadgePlus, CirclePlus, LayoutDashboard, MessageCircleCode, Plus, SquarePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateProject from "./Create";

const items = [
  {
    title: "DashBoard",
    url: "./dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Q&A",
    url: "./qa",
    icon: MessageCircleCode
  }
]

const projects = [
  {name:"project 1"},
  {name:"project 2"},
  {name:"project 3"},
  {name:"project 4"},
]

export function GithubChats()
{
  const pathname = usePathname();
  const {open} = useSidebar();

   return (
     <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader className="h-10">

        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
             <SidebarMenu>
             {
              items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="active:bg-orange-600/95 active:text-white text-md">
                     <Link href={item.url} className={cn(
                      {'!bg-primary !text-white' : pathname === item.url},'list-none'
                     )}>
                      <item.icon/>
                      <span>{item.title}</span>
                     </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
             }
             </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {
            open && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={"ghost"} className="mx-4 bg-red-600/95 text-white text-md flex flex-row items-center justify-center gap-x-2">
                <span><Plus/></span>
                <span>Create Project</span>
                </Button>
              </AlertDialogTrigger>
              <CreateProject/>
            </AlertDialog>

          )}
          

          <SidebarGroup>
            <SidebarGroupLabel>
              Your Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {
                  projects.map((project) => {
                    return <SidebarMenuItem key={project.name}>
                      <SidebarMenuButton asChild>
                      <div>
                        <div className={cn('rounded-sm border size-7 flex flex-row items-center justify-center text-sm bg-white text-primary pb-1',
                          {
                            'bg-primary text-white': true
                          }
                        )}>
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
     </Sidebar>
   );
}