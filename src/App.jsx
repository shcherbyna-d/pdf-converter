import React, { useEffect, useState } from "react";
import TextInput from "./components/TextInput/TextInput";
import Button from "./components/Button/Button";
import PdfViewer from "./components/PdfViewer/PdfViewer";
import History from "./components/History/History";
import { convertToPdf } from "./services/pdfApi";
import { getFilesFromIndexDB, storeFileInIndexDB } from "./services/indexDB";
import { getFormatedFileName } from "./utils";

const App = () => {
  const [text, setText] = useState("");
  const [pdfUrl, setPdfUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const setPdfUrlWithRevoke = (newPdfUrl) => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(newPdfUrl);
  };

  const handleConvertToPdf = async () => {
    setLoading(true);
    setError("");

    try {
      const pdfBlob = await convertToPdf(text);

      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrlWithRevoke(pdfUrl);

      const newFile = {
        name: getFormatedFileName(),
        pdfBlob,
        id: Date.now(),
      };

      setFiles([...files, newFile]);

      storeFileInIndexDB(newFile, newFile.id);
    } catch (error) {
      setError("Error during conversion into PDF");
      console.error("Error during conversion into PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getDataFromIndexDB(params) {
      const pdfs = await getFilesFromIndexDB();
      setFiles(pdfs);
    }

    getDataFromIndexDB();
  }, []);

  const handleViewPdf = (file) => {
    const pdfUrl = URL.createObjectURL(file.pdfBlob);
    setPdfUrlWithRevoke(pdfUrl);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-8 text-center">PDF Converter</h1>
      <div className="grid grid-cols-[0.5fr_,1fr] gap-4 relative p-2">
        <div className="flex flex-col gap-6">
          <TextInput value={text} onChange={setText} />
          <Button disabled={text.length === 0} onClick={handleConvertToPdf}>
            Convert to PDF
          </Button>
          <div className="mt-12">
            <History files={files} onViewPdf={handleViewPdf} />
          </div>
        </div>
        <div className="border-solid border-2 rounded-md border-slate-300">
          {pdfUrl ? (
            <PdfViewer pdfUrl={pdfUrl} />
          ) : (
            <div className="flex h-full items-center justify-center text-lg font-bold text-slate-300">
              <span>{error ? error : "Coverted PDF will be here"}</span>
            </div>
          )}
        </div>
        {loading && (
          <div className="text-lg font-bold w-full h-full backdrop-blur-sm rounded-md absolute top-0 flex justify-center items-center">
            ...Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
