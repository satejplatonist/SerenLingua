import { SidebarProvider } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import React from 'react'
import { GithubChats } from './Chats';

type Props = {
    children: React.ReactNode
}

const SideBarLayout = ({children}: Props) => {
  return (
    <SidebarProvider>
       <GithubChats/>
       <main className='w-full m-2 h-full'>
            <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow 
            rounded-md p-2 px-2 h-full'>
            {/* <SearchBar/> */}
            {/* <div className='ml-auto '></div> */}
            {/* <UserButton/> */}
            {/* <div className="h-4"></div> */}
            {/* <MainContent/> */}
            {/* <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4'></div> */}
              {children}
            </div>
       </main>
    </SidebarProvider>
  )
}

export default SideBarLayout;