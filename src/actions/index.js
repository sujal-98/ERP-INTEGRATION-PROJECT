import axios from 'axios';

export const SET_STUDENTS = 'SET_STUDENTS';

export const setStudents = (students) => ({
  type: SET_STUDENTS,
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
        const response = await axios.post('http://localhost:1000/api/result', {
          enroll: String(roll),
        });
        console.log('Response fetched for roll:', roll, response.data);
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
      if (result && result.results && result.results.length > 0) {
        const studentEnrollment = result.results[0].enrollment_number;
        const existingStudentIndex = newState.findIndex(
          (student) => student.enrollment_number === studentEnrollment
        );

        const attendanceData = [
          {
            theory: { attended: result.theory_attendance_semester_1 || '0%' },
            practical: { attended: result.practical_attendance_semester_1 || '0%' },
          },
          {
            theory: { attended: result.theory_attendance_semester_2 || '0%' },
            practical: { attended: result.practical_attendance_semester_2 || '0%' },
          },
          {
            theory: { attended: result.theory_attendance_semester_3 || '0%' },
            practical: { attended: result.practical_attendance_semester_3 || '0%' },
          },
          {
            theory: { attended: result.theory_attendance_semester_4 || '0%' },
            practical: { attended: result.practical_attendance_semester_4 || '0%' },
          },
        ];

        const studentData = {
          enrollment_number: studentEnrollment,
          student_name: result.results[0].student_name || 'N/A',
          email: 'dummy.email@example.com', // Dummy email
          overall_cgpa: randomGen(10, 8).toFixed(2),
          semesters: result.results,
          attendance: attendanceData,
          achievements: result.achievements || { technical: [], nonTechnical: [] },
          batch: result.results[0].batch || 'N/A',
          branch_name: result.results[0].branch_name || 'N/A',
          college_name: result.results[0].college_name || 'N/A',
        };

        if (existingStudentIndex !== -1) {
          newState[existingStudentIndex] = studentData;
        } else {
          newState.push(studentData);
        }
      }
    });

    console.log('Updated state:', newState);
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
  console.log('Sorted by CGPA:', sortedStudents);
};

export const enrollSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const roll1 = parseInt(a.enrollment_number);
    const roll2 = parseInt(b.enrollment_number);
    return roll1 - roll2;
  });
  dispatch(setStudents(sortedStudents));
  console.log('Sorted by Enrollment:', sortedStudents);
};

export const attendanceSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aLast = parseFloat(a.attendance[3]?.theory?.attended.replace('%', '')) || 0;
    const bLast = parseFloat(b.attendance[3]?.theory?.attended.replace('%', '')) || 0;
    return bLast - aLast;
  });
  dispatch(setStudents(sortedStudents));
  console.log('Sorted by Attendance:', sortedStudents);
};

export const achievementSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const count1 = a.achievements.technical.length + a.achievements.nonTechnical.length;
    const count2 = b.achievements.technical.length + b.achievements.nonTechnical.length;
    return count2 - count1; // Sorting in descending order
  });
  dispatch(setStudents(sortedStudents));
  console.log('Sorted by Achievements:', sortedStudents);
};
