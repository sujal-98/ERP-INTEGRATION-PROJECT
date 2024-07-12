// Card.js
import React from 'react';
import './Main.css';

const Card = ({ data }) => {
  return (
    <div className='card'>
      <img src="/assets/photo1.jpg" alt={`${data.student.name}`} />
      <p>
        {data.student.name}<br />
        {data.student.rollno}<br />
        {data.student.year} ({data.student.branch})
      </p>
    </div>
  );
};

export default Card;
