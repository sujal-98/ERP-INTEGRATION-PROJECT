const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const routes = require('./routes/fetcher');
// const sequelize = require('./database/database');
// const { Student, Marks } = require('./modal/modal');


//middlewares
app.use(cors())
app.use(express.json());

//Routes
app.use('/api', routes);

async function showData(table) {
    try {
      const [results, metadata] = await sequelize.query(`select * from ${table}`);
      console.log(`Tables in the ${table} is: `,results)
    } catch (error) {
      console.error('Error querying database:', error);
    }
  }


  

async function showTables() {
    try {
      const [results, metadata] = await sequelize.query("SHOW TABLES");
      results.forEach(table => {
        console.log(table[`Tables_in_${process.env.database}`]);
        showData(table[`Tables_in_${process.env.database}`])
      });
    } catch (error) {
      console.error('Error querying database:', error);
    }
  }
  
async function emptyTables() {
    try {
      await sequelize.query(`DROP TABLE marks`);

      console.log("successfull ") 
    } catch (error) {
      console.error('Error querying database:', error);
    }
  }

// async function showMark() {
//     try {
//       const [results, metadata] = await sequelize.query("show columns from students");
//       console.log('Tables is',results);
//     } catch (error) {
//       console.error('Error querying database:', error);
//     }
//   }
async function query1(rollno) {
  try {
    const [data, metadata] = await sequelize.query(
      `SELECT * FROM students where rollno=${rollno} `
    );
    const [data2, metadata2] = await sequelize.query(
      `SELECT * FROM marks WHERE rollno = ${rollno} ORDER BY semester ASC;`,
    );
    console.log(data)
    console.log(data2)

  }
    // const result = {
    //   rollno: data[0]?.rollno,
    //   name: data[0]?.name,
    //   sno: data[0]?.sno,
    //   branch: data[0]?.branch,
    //   year: data[0]?.year,
    //   semesters: {}
    // };

    // data.forEach(record => {
    //   const semesterKey = `semester${record.semester}`;
    //   result.semesters[semesterKey] = {
    //     subject1: record.subject1,
    //     subject2: record.subject2,
    //     subject3: record.subject3,
    //     subject4: record.subject4,
    //     subject5: record.subject5,
    //     subject6: record.subject6,
    //     subject7: record.subject7,
    //     subject8: record.subject8,
    //     subject9: record.subject9,
    //     subject10: record.subject10,
    //     cgpa: record.cgpa
    //   };

  catch (error) {
    console.error('Error querying database:', error);
  }
}

// async function insertData() {
//     try {
      
//       await Marks.create({ rollno: 1,semester:6 ,subject1: 85, subject2: 90, subject3: 78, subject4: 92, subject5: 88, subject6: 79, subject7: 95, subject8: 80, subject9: 82, subject10: 84,cgpa:8.7 });
//       await Marks.create({ rollno: 2,semester:4, subject1: 75, subject2: 85, subject3: 70, subject4: 80, subject5: 82, subject6: 74, subject7: 90, subject8: 77, subject9: 79, subject10: 81,cgpa:9.0 });
//       await Marks.create({ rollno: 3,semester:8, subject1: 88, subject2: 92, subject3: 84, subject4: 89, subject5: 91, subject6: 86, subject7: 93, subject8: 87, subject9: 90, subject10: 85,cgpa:9.2 });
  
//       console.log('Data inserted successfully');
//     }catch(e){
//         console.log("Error encountered")
//     }}

async function generateRollNumbers(start, end) {
  const rollNumbers = [];
  for (let i = start; i <= end; i++) {
    rollNumbers.push(i.toString().padStart(11, '0'));
  }
  return rollNumbers;
}


const insertData2 = async () => {
  try {
    await Marks.create({
      rollno: 1120802722,
      semester: 2,
      subject1: 56,
      subject2: 85,
      subject3: 89,
      subject4: 88,
      subject5: 78,
      subject6: 77,
      subject7: 76,
      subject8: 75,
      subject9: 74,
      subject10:74,
      cgpa: 8.4    });
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error encountered:', error.message);
  }}


  async function startServer() {
    // showTables()
    // emptyTables();
    // showData('marks','students')
    // insertData2();
    // query1(820802722)
    app.listen(1000, () => {
      console.log('Server listening on port 1000');
    });
  }
  
  startServer();