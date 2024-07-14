import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import { generatePdfUrl, downloadPdf } from '../../pdf/renderPdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons'; // Import icons you need


const Card = ({ data }) => {
  const navigate = useNavigate();

  const handlePreviewClick = async (student) => {
    const pdfUrl = await generatePdfUrl(student);
    console.log(pdfUrl); // Log the URL to check if it's valid
    navigate('/pdf-preview', { state: { pdfUrl } });
  };
  

  const handleDownloadClick = async (student) => {
    await downloadPdf(student);
  };

  return (
    <div className='card'>
      <img src="/assets/photo1.jpg" alt={`${data.student.name}`} />
      <p>
        <b>{data.student.name}</b><br />
        {data.student.rollno}<br />
        {data.student.year} ({data.student.branch})
      </p>
      <button onClick={() => handlePreviewClick(data.student)} style={{position:"absolute"}}><FontAwesomeIcon icon={faEye} style={{color:"rgb(100, 169, 249)", fontSize:"1.5rem"}} /></button>
      <button onClick={() => handleDownloadClick(data.student)} style={{position:"relative", bottom:"8px"}}><FontAwesomeIcon icon={faDownload} style={{color:"rgb(100, 169, 249)", fontSize:"1.5rem"}}/></button>
    </div>
  );
};

export default Card;
