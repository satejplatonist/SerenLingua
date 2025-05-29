import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

interface PdfProps {
   fileName: string
}

function PdfComp({fileName}: PdfProps) {
  const [file, setFile] = useState<any>();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    // Dynamically set the file to fetch from your API route based on the passed fileName prop
    setFile(`/api/get-file?filename=${fileName}`);
  }, [fileName]);

  return (
    <div className="">     
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
        })}
      </Document>
    </div>
  );
}

export default PdfComp;