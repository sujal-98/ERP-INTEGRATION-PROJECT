import axios from 'axios';

export const SET_STUDENTS = 'SET_STUDENTS';
export const UPD_STUDENTS = 'UPD_STUDENTS';


export const setStudents = (students) => ({
  type: 'SET_STUDENTS',
  payload: students,
});

export const updStudents = (students) => ({
  type: 'UPD_STUDENTS',
  payload: students,
});

export const fetchStudents = (enrollments) => async (dispatch, getState) => {
  const chunkArray = (array, chunk_size) => {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, chunk_size));
    }
    return results;
  };

  const randomGen = (max, min) => Math.random() * (max - min) + min;

  const chunks = chunkArray([...enrollments], 20);

  for (const chunk of chunks) {
    const promises = chunk.map(async (roll) => {
      try {
        // const response = await axios.post('https://erp-integration-project-backend.onrender.com/api/result', {
          const response = await axios.post('http://localhost:1000/api/result', {
        enroll: String(roll),
        });
        console.log('response fetched for roll:', roll);
        return response.data;
      } catch (error) {
        console.error(`Error posting data for roll ${roll}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter((result) => result !== null);

    const currentState = getState().student.students;
    const newState = [...currentState];

    filteredResults.forEach((result) => {
      if (result.results.length > 0) {
        const studentEnrollment = result.results[0].enrollment_number;
        const existingStudentIndex = newState.findIndex(
          (student) => student.enrollment_number === studentEnrollment
        );

        result.results.forEach((semester) => {
          semester.cgpa = randomGen(10, 6).toFixed(2);
        });
        const overall_cgpa=randomGen(10,5).toFixed(2)
        const studentData = {
          email:'abcd@gmail.com',
          enrollment_number: studentEnrollment,
          batch:result.results[0].batch,
          branch:result.results[0].branch_name,
          overall_cgpa:overall_cgpa,
          semesters: result.results,
          attendance: result.attendance,
          achievements: result.achievements,
          societies:[ {
            "name": "Namespace",
            "background": "Technical",
            "position": "Member",
            "major_events": [
              "Tech Innovators Conference 2023",
              "Hackathon 2023"
            ],
            "achievements": [
              "First Prize in National Coding Competition",
              "Organized the largest tech meet-up in the region"
            ]
          },
          {
            "name": "HashDefine",
            "background": "Technical",
            "position": "President",
            "major_events": [
              "AI & Machine Learning Workshop",
              "Coding Bootcamp"
            ],
            "achievements": [
              "Launched a successful coding bootcamp series",
              "Developed a popular open-source project"
            ]
          },
          {
            "name": "Aavran",
            "background": "Non-Technical",
            "position": "Event Coordinator",
            "major_events": [
              "Cultural Fest",
              "Annual Art Exhibition"
            ],
            "achievements": [
              "Best Cultural Event of the Year",
              "Record attendance at the Annual Art Exhibition"
            ]
          },
          {
            "name": "Anveshan",
            "background": "Non-Technical",
            "position": "Member",
            "major_events": [
              "Social Outreach Programs",
              "Annual Community Service Day"
            ],
            "achievements": [
              "Successfully organized over 50 community outreach programs",
              "Received Community Service Award"
            ]
          },
          {
            "name": "Octave",
            "background": "Non-Technical",
            "position": "Secretary",
            "major_events": [
              "Music Festival",
              "Talent Showcase"
            ],
            "achievements": [
              "Best Music Festival in the Region",
              "Promoted local talent through multiple showcases"
            ]
          }]
        };

        if (existingStudentIndex !== -1) {
          newState[existingStudentIndex].overall_cgpa=randomGen(10,8).toFixed(2)
          newState[existingStudentIndex].semesters.push(...result.results);
          newState[existingStudentIndex].attendance = result.attendance;
          newState[existingStudentIndex].achievements = result.achievements;
        } else {
          newState.push(studentData);
        }
      }
    });

    console.log(newState);
    dispatch(updStudents(newState))
    dispatch(setStudents(newState));
  }
};

export const studentSort = () => async (dispatch, getState) => {
  const currentState = getState().display.students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aCGPA = parseFloat(a.overall_cgpa);
    const bCGPA = parseFloat(b.overall_cgpa);
    return bCGPA - aCGPA;
  });
  dispatch(updStudents(sortedStudents));
  console.log(sortedStudents);
};

export const enrollSort = () => async (dispatch, getState) => {
  const currentState = getState().display.students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const roll1 = parseInt(a.enrollment_number);
    const roll2 = parseInt(b.enrollment_number);
    return roll1 - roll2;
  });
  dispatch(updStudents(sortedStudents));
  console.log(sortedStudents);
};


  const getLastSemesterAttendance = (attendance) => {
    if (!attendance || attendance.length === 0) return 0;

    const latestSemesterIndex = Object.keys(attendance[0])
      .filter(key => key.startsWith('theory_attendance_semester_') || key.startsWith('practical_attendance_semester_'))
      .map(key => parseInt(key.split('_').pop(), 10))
      .reduce((a, b) => Math.max(a, b), 0);

    const theoryAttendance = attendance[0][`theory_attendance_semester_${latestSemesterIndex}`] || "0%";
    const practicalAttendance = attendance[0][`practical_attendance_semester_${latestSemesterIndex}`] || "0%";

    const theoryPercentage = parseFloat(theoryAttendance) || 0;
    const practicalPercentage = parseFloat(practicalAttendance) || 0;

    return (theoryPercentage + practicalPercentage) / 2;
  };


 export const attendanceSort = () => async (dispatch, getState) => {
  const currentState = getState().display.students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aAvg = getLastSemesterAttendance(a.attendance);
    const bAvg = getLastSemesterAttendance(b.attendance);
    return bAvg - aAvg;
  });
  dispatch(updStudents(sortedStudents));
  console.log(sortedStudents);
  };

export const achievementSort = () => async (dispatch, getState) => {
  const currentState = getState().display.students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aCount = a.achievements ? a.achievements.length : 0;
    const bCount = b.achievements ? b.achievements.length : 0;
    return bCount - aCount;
  });
  dispatch(updStudents(sortedStudents));
  console.log(sortedStudents);
};

export const filterStudents= (filter)=> async (dispatch,getState) => {
  const { batch, branch, cgpa, society } = filter;
  const students=getState().display.students;
    // Define the CGPA ranges
    const cgpaRanges = {
      "6.9": (cgpa) => cgpa < 7,
      "7.0": (cgpa) => cgpa >= 7 && cgpa <= 7.5,
      "7.5": (cgpa) => cgpa > 7.5 && cgpa <= 8,
      "8.0": (cgpa) => cgpa > 8 && cgpa <= 8.5,
      "8.5": (cgpa) => cgpa > 8.5 && cgpa <= 9,
      "9.0": (cgpa) => cgpa > 9
    };

    const filteredStudents = students.filter((student) => {
      const matchesBatch = batch ? student.batch === batch : true;
      const matchesBranch = branch ? (branch === "CSE" && student.branch==="BACHELOR OF TECHNOLOGY (COMPUTER SCIENCE AND ENGINEERING)" ) : true;
      const matchesCGPA = cgpa ? cgpaRanges[cgpa](student.overall_cgpa) : true;
      const matchesSociety = society ? student.societies.background===society : true;

      return matchesBatch && matchesBranch && matchesCGPA && matchesSociety;
    });
    dispatch(updStudents(filteredStudents));
    console.log(filteredStudents);
}