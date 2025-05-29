import { auth, currentUser } from "@clerk/nextjs/server";

export function convertToAscii(str: string)
{
    // 1. remove non-ascii characters
    const asciiString = str.replace(/[^\x00-\x7F]+/g,""); 
    return asciiString;
}


