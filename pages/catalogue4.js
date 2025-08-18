import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
// import { Document, Page } from "react-pdf/build/entry.noworker";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="demoPage" ref={ref}>
//       /* ref required */
//       <h1>Page Header</h1>
//       <p>{props.children}</p>
//       <p>Page number: {props.number}</p>
//     </div>
//   );
// });

function MyBook(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const options = {
    cMapUrl: "cmaps/",
    standardFontDataUrl: "standard_fonts/",
  };
  return (
    <div>
      <Document
        file="https://tricabtstbucket.blob.core.windows.net/creditfiles/97234429-6bc7-4b30-b16d-8d3678c6fce1.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <HTMLFlipBook width={300} height={500}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </HTMLFlipBook>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default MyBook;
