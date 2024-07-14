import React from 'react';
import { useLocation } from 'react-router-dom';

const PdfPreview = () => {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;

  if (!pdfUrl) {
    return <div>No PDF to preview</div>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview" />
    </div>
  );
};

export default PdfPreview;
