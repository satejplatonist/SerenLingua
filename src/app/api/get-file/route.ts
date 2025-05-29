import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest,{params}:{params:{pdf_name:string}})
{
  const pdfName = req.nextUrl.searchParams.get('filename');
  console.log(pdfName);
  const dir = path.join('D:', 'temp');
  const filePath = path.join(dir, `pdf-${pdfName}.pdf`);

  try {
    const filedata = await fs.promises.readFile(filePath);   
    return new NextResponse(filedata, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="pdf-${pdfName}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}