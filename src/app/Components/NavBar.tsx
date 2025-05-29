"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeCheck, Bolt, Box, CircleUserRound, Database, Handshake, House, Info, Key, Link2, LogOut, MapPinCheck, Sparkle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
  

export default function Navbar()
{
    return(
        <div className="bg-slate-50 sticky z-[100] inset-x-0 top-0">
            <nav className="h-14 inset-x-0 top-0 bg-white/75 ml-1.5 sm:ml-10 mr-1.5
            sm:mr-10 w-90 rounded-xl border-b border-l-2 border-r border-gray-200 backdrop-blur-xl 
            transition-all flex flex-row items-center justify-between px-2 lg:px-8 py-1">


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <div className="flex flex-row items-center justify-center gap-y-1 select-none">
                  <img src="/Images/orca2.png" className="h-16 w-16 object-contain"/>
                  <h1 className="text-slate-800 text-base lg:text-xl tracking-wide font-bold">SerenLingua</h1>
                </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-8xl w-48">
                    <DropdownMenuLabel className="flex gap-x-2 items-center"><BadgeCheck className="text-amber-400 fill-orange-600"/> My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <Link href={"/"}><DropdownMenuItem className="flex gap-x-2 items-center"><MapPinCheck className="text-cyan-700"/> Home</DropdownMenuItem></Link>
                    <DropdownMenuItem className="flex gap-x-2 items-center"><CircleUserRound className="text-red-700"/> Profile</DropdownMenuItem>
                    <Link href={"/Components/Auth/Login"}><DropdownMenuItem className="flex gap-x-2 items-center bg-slate-100"><Key className="bg-red-700 rounded-md text-white p-0.5"/>Log In</DropdownMenuItem></Link>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <DropdownMenuItem className="flex gap-x-2 items-center bg-slate-700 text-slate-50 font-semibold"><Sparkles className="bg-cyan-300 rounded-md fill-sky-700 text-sky-700 p-0.5"/>Plans</DropdownMenuItem>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <Link href={"#Quick_Links_Section"}><DropdownMenuItem className="flex gap-x-2 items-center bg-slate-100 text-red-800 font-semibold"><img src="/Images/happy.gif" className="h-1 w-1 sm:h-7 sm:w-7 rounded-xl object-contain" alt="" />Services</DropdownMenuItem></Link>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <DropdownMenuItem className="flex gap-x-2 items-center"><Bolt className="text-slate-700"/>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <DropdownMenuItem className="flex gap-x-2 items-center"><Database className="fill-sky-700 text-white"/> Storage</DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-x-2 items-center"><Link2 className="text-slate-500"/> Support</DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-x-2 items-center bg-slate-100"><Info className="text-red-900"/>Tutorial</DropdownMenuItem>
                    <DropdownMenuSeparator className="text-gray-500"/>
                    <DropdownMenuItem className="flex gap-x-2 items-center bg-red-700 text-slate-100"><LogOut/> Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            
            <div className="flex flex-row items-center justify-center gap-x-4">
              <SignedOut>
                 <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            </nav>
        </div>
    );
}