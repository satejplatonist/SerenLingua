import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Earth } from "lucide";
import { Circle, CircleChevronRight, Dice6, EarthIcon, FlameKindling, LinkIcon, Sparkle, Sparkles, SquareArrowOutUpRight, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 pb-8">
      <BackgroundBeamsWithCollision className="h-auto bg-zinc-50 ">
        <section className="flex flex-col items-center justify-center px-32 lg:px-36  md:pb-0 pb-8 pt-16 lg:pt-0 gap-y-20">
          <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-zinc-800
          via-teal-700/75 via-50% to-80% to-zinc-800 text-4xl lg:text-7xl font-bold text-center">Interactive MultiLingual 
          CV & Document Analysis Using SerenLingua</h1>
          <div className="flex flex-col gap-y-5 lg:flex-row items-center justify-center lg:gap-x-8">
            <Link href={"#Quick_Links_Section"}><Button className="text-2xl p-6 bg-zinc-100 text-slate-700 gap-x-2 hover:bg-zinc-100 
            hover:gap-x-3">Quick Links <LinkIcon className="text-red-700"/></Button></Link>
            <Link href={"./Components/ChatWithPdf"}>
              <Button className="text-2xl p-6 gap-x-2 hover:gap-x-3">Get Started <CircleChevronRight/></Button>
            </Link>
          </div>
        </section> 
      </BackgroundBeamsWithCollision> 

      {/* <section className="flex flex-col items-center justify-center mt-4 gap-y-8">

         <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-4 lg:gap-x-4 gap-y-4 px-4">
            <div className="lg:col-span-1 flex flex-col items-center justify-center">
               <Card className="flex flex-col items-center justify-center pointer-events-none select-none">
                 <CardHeader></CardHeader>
                 <CardContent>
                    <img src="Images/bridge.jpg" className="size-80 rounded-xl"/>
                 </CardContent>
                 <CardFooter><h1 className="text-xl text-center">Bridging Gaps All Over The World</h1></CardFooter>
               </Card>
            </div>
            <div className="lg:col-span-3 flex flex-col">
               <Card className="flex lg:flex-row flex-col items-center justify-center bg-gray-900 pointer-events-none select-none">
                 <CardHeader></CardHeader>
                 <CardContent className="flex items-center flex-col">
                    <img src="Images/focus.gif" className="size-96 rounded-full"/>
                 </CardContent>
                 <CardFooter><h1 className="text-slate-200 text-4xl font-serif font-semibold">
                  Makes 🫵 Productive and Focused</h1></CardFooter>
               </Card>
            </div>
         </div>

         <div className="flex flex-col items-center justify-center gap-y-4 lg:grid lg:grid-cols-3 lg:gap-x-4 px-4 py-4">
            <Card className="col-span-2 bg-slate-900 flex-col flex lg:flex-row items-center justify-center gap-y-4 lg:gap-x-4 py-4">
                <CardContent className="flex-col flex lg:flex-row items-center justify-center gap-y-4 lg:gap-x-4 px-8">
                  <h1 className="text-slate-200 text-4xl lg:text-6xl font-serif">MultiLingual CV and Resume Parsing</h1>
                  <img src="Images/globe3.png"/>
                </CardContent>
            </Card>
            <Card>
                
            </Card>
         </div>

         <div className="flex flex-col items-center justify-center gap-y-4 lg:grid lg:grid-cols-3 lg:gap-x-4 px-4">
            <Card>
              <CardContent className="object-fit bg-slate-50/75 pointer-events-none select-none">
                 <img src="Images/download2.gif"/>
                 <div className="flex flex-row items-center justify-center gap-x-4">
                 <Zap className="text-amber-500 fill-amber-500"/>
                 <h1 className="text-center text-2xl font-mono font-medium bg-clip-text text-transparent 
                 bg-gradient-to-r from-red-800 to-teal-800">Thunder Fast Indexing</h1>
                 </div>
              </CardContent>
            </Card>
            <Card className="bg-black pointer-events-none select-none">
              <CardContent>
                <img src="Images/correct.gif"/>
              </CardContent>
              <CardFooter className="flex items-center justify-center pb-8">
                <h1 className="text-xl lg:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-slate-300">Correct Analysis and interactive Visualization</h1>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="pt-6 bg-slate-100 rounded-xl pointer-events-none select-none">
                <h1 className="text-center mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-sky-700">Literature Review and Sentiment Analysis</h1>
                <img src="Images/books.jpg" className="rounded-xl object-fit"/>
              </CardContent>
            </Card>
         </div>

         
         
      </section> */}

      <section className="flex flex-col items-center justify-center gap-y-4 lg:gap-y-8 p-4 lg:p-32 w-full mt-8" id="Quick_Links_Section">

        <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4 w-full">

          <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/image.png" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide">Multilingual CV and Resume Parsing</h1>
                <h2 className="self-start hidden md:block">breaking barriers for Global Talent Search</h2>
              </div>
            </div> 
            <Link href={"./Components/MultilingualParsing"}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div>

          {/* <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/globe.png" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide self-start">Translation Services</h1>
                <h2 className="self-start hidden md:block">Words that travel and connections that last</h2>
              </div>
            </div> 
            <Link href={"./Components/Translation"}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div> */}

          <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/chat.png" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide">Chat and Q/A with PDF</h1>
                <h2 className="self-start hidden md:block">Seamless Chatting with PDF</h2>
              </div>
            </div> 
            <Link href={"./Components/ChatWithPdf"}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div>

        </div>

        {/* <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4 w-full">

          <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center ">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/lit1.png" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide self-start">Literature Review Service</h1>
                <h2 className="self-start hidden md:block">breaking barriers for Global Talent Search</h2>
              </div>
            </div> 
            <Link href={""}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div>
          
        </div> */}

        {/* <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4 w-full">

          <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/annotate.jpeg" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide self-start">Annotations and sentiment Analysis</h1>
                <h2 className="self-start hidden md:block">breaking barriers for Global Talent Search</h2>
              </div>
            </div> 
            <Link href={""}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div>

          <div className="bg-zinc-800 w-full text-white lg:col-span-1 p-4 lg:p-8 rounded-lg lg:rounded-xl backdrop-blur-lg 
          border-y-2 border-x-2 border-zinc-600 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row lg:gap-x-8 gap-x-3 items-center justify-center pointer-events-none select-none">
              <img src="Images/QuickLinks/files.png" className="w-16 lg:w-20 h-16 lg:h-20 border-y-2 border-x-2 border-zinc-600 p-1.5 lg:p-2 rounded-md"/>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-semibold text-xl tracking-wide self-start">Indexing Services</h1>
                <h2 className="self-start hidden md:block">breaking barriers for Global Talent Search</h2>
              </div>
            </div> 
            <Link href={""}><button className="bg-white text-slate-800 px-8 py-1.5 rounded-md text-lg gap-x-4 flex 
            flex-row items-center justify-center mt-4">Start<SquareArrowOutUpRight/></button></Link>
          </div>
          
        </div> */}
      </section>


    </main>
  );
}
