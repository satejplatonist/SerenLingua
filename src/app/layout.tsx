import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/NavBar";
import {ClerkProvider} from '@clerk/nextjs';
import Providers from "./Components/Providers";
import {Toaster} from 'react-hot-toast';
import dotenv from 'dotenv';

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SerenLingua"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <Navbar/>
            {children}
          </body>
          <Toaster/>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
