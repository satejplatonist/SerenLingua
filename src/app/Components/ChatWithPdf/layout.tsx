import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "./Chat";

export default function Layout({children}:{children:React.ReactNode})
{
  return(
    <SidebarProvider className="p-0 min-h-screen w-full">
      <Chat />
      <main className="w-full">
        <SidebarTrigger />
        <section className="w-full flex flex-row items-center justify-center">
        {children}
        </section>
      </main>
    </SidebarProvider>
  );
}