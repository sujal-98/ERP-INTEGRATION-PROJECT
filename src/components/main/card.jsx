import React from 'react';
import './Main.css';
import {generatePdf} from '../../pdf/renderPdf';




const Card = ({ data }) => {
  const handleClick=(data)=>{
    generatePdf(data)
  }
  return (
    <div className='card' onClick={()=>{handleClick(data.student)}}>
      <img src="/assets/photo1.jpg" alt={`${data.student.name}`} />
      <p>
        <b>{data.student.name}</b><br />
        {data.student.rollno}<br />
        {data.student.year} ({data.student.branch})
      </p>
    </div>
  );
};

export default Card;
