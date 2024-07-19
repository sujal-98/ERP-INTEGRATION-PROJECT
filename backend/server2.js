const fs = require('fs');
const csv = require('csv-parser');

 filePath='./result/first.csv'
 rollNumber='120802721'
function parseCSVFile(filePath, rollNumber, callback) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const studentDetails = results.find(row => row.enrollment_number === rollNumber);
      if (studentDetails) {
        callback(null, studentDetails);
      } else {
        callback(`Roll number ${rollNumber} not found`, null);
      }
    })
    .on('error', (err) => {
      callback(err, null);
    });
}

parseCSVFile(filePath, rollNumber, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
});
