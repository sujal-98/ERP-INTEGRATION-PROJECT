import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import renderPdf from './renderPdf';

const Generate = ({ student }) => (
  <PDFViewer width="100%" height="600">
    <renderPdf student={student} />
  </PDFViewer>
);

export default Generate;