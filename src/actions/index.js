import axios from 'axios';

export const SET_STUDENTS = 'SET_STUDENTS';

export const setStudents = (students) => ({
  type: 'SET_STUDENTS',
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
        const response = await axios.post('http://localhost:2000/api/result', {
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

    const currentState = getState().students;
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

        const studentData = {
          enrollment_number: studentEnrollment,
          semesters: result.results,
          attendance: result.attendance,
          achievements: result.achievements,
        };

        if (existingStudentIndex !== -1) {
          newState[existingStudentIndex].semesters.push(...result.results);
          newState[existingStudentIndex].attendance = result.attendance;
          newState[existingStudentIndex].achievements = result.achievements;
        } else {
          newState.push(studentData);
        }
      }
    });

    console.log(newState);
    dispatch(setStudents(newState));
  }
};

export const studentSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aCGPA = parseFloat(a.overall_cgpa);
    const bCGPA = parseFloat(b.overall_cgpa);
    return bCGPA - aCGPA;
  });
  dispatch(setStudents(sortedStudents));
  console.log(sortedStudents);
};

export const enrollSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const roll1 = parseInt(a.enrollment_number);
    const roll2 = parseInt(b.enrollment_number);
    return roll1 - roll2;
  });
  dispatch(setStudents(sortedStudents));
  console.log(sortedStudents);
};

export const attendanceSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aLast = a.attendance.length > 0 ? a.attendance[a.attendance.length - 1].attendance : 0;
    const bLast = b.attendance.length > 0 ? b.attendance[b.attendance.length - 1].attendance : 0;
    return bLast - aLast;
  });
  dispatch(setStudents(sortedStudents));
  console.log(sortedStudents);
};

export const achievementSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const roll1 = parseInt(a.attendance);
    const roll2 = parseInt(b.enrollment_number);
    return roll1 - roll2;
  });
  dispatch(setStudents(sortedStudents));
  console.log(sortedStudents);
};
