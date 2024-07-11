// Card.js
import React from 'react';
import './Main.css';

const Card = ({ student }) => {
  return (
    <div className='card'>
      <img src="/assets/photo1.jpg" alt={`${student.name}`} />
      <p>
        {student.name}<br />
        {student.enrollmentNumber}<br />
        {student.batchYear} ({student.branch})
      </p>
    </div>
  );
};

export default Card;
