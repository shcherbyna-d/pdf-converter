const PdfViewer = ({ pdfUrl }) => {
  return (
    <div>
      <embed
        data-testid="pdf-viewer"
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="1100px"
      />
    </div>
  );
};

export default PdfViewer;
