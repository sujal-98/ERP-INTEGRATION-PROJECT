const express = require('express');
const Router = express.Router();
const sequelize =require('../database/database')
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


//constants
const path2='./result'


Router.post('/response', async (req, res) => {
  console.log(req.body.enroll);
  const roll = req.body.enroll;
  const result = [];

  try {
      const [data] = await sequelize.query(
        `SELECT * FROM students WHERE rollno = ${roll}`      );
      const [data2] = await sequelize.query(
        `SELECT * FROM marks WHERE rollno = ${roll} ORDER BY semester ASC`
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
          totalCgpa += record.cgpa;
          semesterCount += 1;
        });
        const aggregateCgpa = semesterCount ? (totalCgpa / semesterCount).toFixed(3) : 0;
        rec.student.result = semesters;
        rec.student.aggregateCgpa = aggregateCgpa;
        console.log('Transformed Data:', rec);
      } else {
        rec.student = { roll: "N/A" };
        console.log('Transformed Data:', rec);
      }
    result.push(rec);
    return res.status(200).send(result);
  } catch (error) {
    console.error('Error querying database:', error);
    return res.status(500).json({ message: "error occurred" });
  }
});
const results = [];

function parseCSVFile(filePath, rollNumber, callback) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const studentDetails = results.filter(row => row.enrollment_number === rollNumber);
      console.log(studentDetails)
      if (studentDetails.length > 0) {
        callback(null, studentDetails);
      } else {
        callback(`Roll number ${rollNumber} not found`, null);
      }
    })
    .on('error', (err) => {
      callback(err, null);
    });
}

Router.post('/result', async (req, res) => {
  const rollNumber = req.body.enroll;
  const path2 = './result';
  const results = []; 

  fs.readdir(path2, async (err, files) => {
    if (err) {
      console.error(`Could not list the directory.`, err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let count = 0;

    files.forEach((file, index) => {
      const filePath = path.join(path2, file);
      parseCSVFile(filePath, rollNumber, (err, data) => {
        if (err) {
          console.error(`Error processing file ${file}:`, err);
        } else {
          if (data && data.length > 0) {
            results.push(...data); 
          }
        }
        count++;

        if (count === files.length) {
          if (results.length !== 0) {
            res.status(201).json(results); 
          } else {
            res.status(404).json({ message: 'Data not found' }); 
          }
        }
      });
    });
  });
});

module.exports = Router;

