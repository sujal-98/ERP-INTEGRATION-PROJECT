/* eslint-disable no-restricted-globals */

import JSZip from "jszip";
import { downloadAllPdf } from "../pdf/renderPdf";

self.onmessage = async (e) => {
  const { students, cancelToken } = e.data;
  const zip = new JSZip();
  const folder = zip.folder("students");

  for (let i = 0; i < students.length; i++) {
    if (cancelToken.cancelled) {
      self.postMessage({ type: 'cancel' });
      return;
    }

    const student = students[i];
    try {
      const pdfBlob = await downloadAllPdf(student,true);
      
      if (!pdfBlob || pdfBlob.size === 0) {
        throw new Error(`Invalid PDF Blob for ${student.semesters[0].student_name}`);
      }
      
      folder.file(`${student.semesters[0].student_name}_report.pdf`, pdfBlob);
    } catch (error) {
      console.error(`Failed to generate PDF for ${student.semesters[0].student_name}:`, error);
    }

    const progress = ((i + 1) / students.length) * 100;
    self.postMessage({ type: 'progress', progress });
  }

  try {
    const zipBlob = await zip.generateAsync({ type: "blob" });
    self.postMessage({ type: 'done', zipBlob });
  } catch (error) {
    console.error("Failed to generate ZIP file:", error);
  }
};
