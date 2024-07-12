const express = require('express');
const Router = express.Router();
const sequelize =require('../database/database')





Router.post('/response', async (req, res) => {
    console.log(req.body.enroll);
    const enroll = req.body.enroll.enroll;
    const result = [];
  
    try {
      const promises = enroll.map(async (roll) => {
        const [data, metadata] = await sequelize.query(
          `SELECT * FROM students WHERE rollno=${roll}`
        );
        const [data2, metadata2] = await sequelize.query(
          `SELECT * FROM marks WHERE rollno=${roll} ORDER BY semester ASC;`
        );
  
        const rec = {};
        if (data.length && data2.length) {
          rec.student = data[0];
  
          const semesters = {};
          data2.forEach(record => {
            const semesterKey = `${record.semester}`;
            semesters[semesterKey] = {
              subject1: record.subject1,
              subject2: record.subject2,
              subject3: record.subject3,
              subject4: record.subject4,
              subject5: record.subject5,
              subject6: record.subject6,
              subject7: record.subject7,
              subject8: record.subject8,
              subject9: record.subject9,
              subject10: record.subject10,
              cgpa: record.cgpa
            };
          });
  
          rec.student.result = semesters;
          console.log('Transformed Data:', rec);
        } else {
          rec.student = { roll: "N/A" };
          console.log('Transformed Data:', rec);
        }
  
        result.push(rec);
      });
  
      await Promise.all(promises);
  
      return res.status(200).send(result);
    } catch (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ "message": "error occurred" });
    }
  });
  
module.exports = Router;
