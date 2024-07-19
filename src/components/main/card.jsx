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
    console.log(pdfUrl); 
    navigate('/pdf-preview', { state: { pdfUrl } });
  };

  const handleDownloadClick = async (student) => {
    await downloadPdf(student);
  };

  return (
    <div className='card'>
      <img src="/assets/photo1.jpg" alt={`${data.student_name}`} />
      <p>
        <b>{data.student_name}</b><br />
        {data.branch_name}<br />
        {data.batch} ({data.branch_code})
      </p>
      <button onClick={() => handlePreviewClick(data)} style={{position:"absolute"}}><FontAwesomeIcon icon={faEye} style={{color:"rgb(100, 169, 249)", fontSize:"1.5rem"}} /></button>
      <button onClick={() => handleDownloadClick(data)} style={{position:"relative", bottom:"8px"}}><FontAwesomeIcon icon={faDownload} style={{color:"rgb(100, 169, 249)", fontSize:"1.5rem"}}/></button>
    </div>
  );
};

export default Card;
