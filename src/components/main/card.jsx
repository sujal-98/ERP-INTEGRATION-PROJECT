import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { generatePdfUrl, downloadPdf } from "../../pdf/renderPdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload, faRandom } from "@fortawesome/free-solid-svg-icons"; 

const Card = ({ data }) => {
  const navigate = useNavigate();

  const handlePreviewClick = async (student) => {
    const pdfUrl = await generatePdfUrl(student);
    console.log(pdfUrl);
    navigate("/pdf-preview", { state: { pdfUrl } });
  };

  const handleDownloadClick = async (student) => {
    await downloadPdf(student);
  };

  const returnBranch =(branch)=>{
    if(branch=="BACHELOR OF TECHNOLOGY (COMPUTER SCIENCE AND ENGINEERING)"){
      return ["BACHELOR OF TECHNOLOGY", "CSE"];
    }
  }
  return (
    <div className="card">
      <img src="/assets/photo1.jpg" alt={`${data.semesters[0].student_name}`} />
      <p>
        <b>{data.semesters[0].student_name}</b>
        <br />
        <b>{data.semesters[0].enrollment_number}</b>
        <br />
        <span style={{fontSize:"0.8rem"}}>
        {returnBranch(data.semesters[0].branch_name)}
        </span>
        <br />
        <span style={{fontWeight:"100"}}>
        {data.semesters[0].batch+" - "+data.semesters[0].branch_code}
        </span>
      </p>
      <button
        onClick={() => handlePreviewClick(data)}
        style={{ position: "absolute" }}
      >
        <FontAwesomeIcon
          icon={faEye}
          className="icon"
        />
      </button>
      <button
        onClick={() => handleDownloadClick(data)}
        style={{ position: "relative", bottom: "8px" }}
      >
        <FontAwesomeIcon
          icon={faDownload}
          className="icon"
        />
      </button>
    </div>
  );
};

export default Card;
