import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from 'react-redux';
import JSZip from 'jszip';
import { downloadPdf } from '../../pdf/renderPdf'; // Adjust the import path as needed

const actions = [
  { icon: <DownloadIcon />, name: 'Download All' },
];

const Speed = () => {
  const students = useSelector((state) => state.students);

  const handleDownloadAllClick = async () => {
    if(students.length>0){

    const zip = new JSZip();
    const folder = zip.folder("students");

    const pdfPromises = students.map(async (student) => {
      const pdfBlob = await downloadPdf(student, true);
      const studentName = student.semesters[0].student_name;
      folder.file(`${studentName}.pdf`, pdfBlob);
    });

    await Promise.all(pdfPromises);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "students.zip";
    link.click();
  }};

  return (
    <Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1, position: 'sticky', bottom: '60px', left: '95%', width: '5%' }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleDownloadAllClick} // Trigger the download when clicked
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Speed;
