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

  const chunks = chunkArray([...enrollments], 20);  

  for (const chunk of chunks) {
    const promises = chunk.map(async (roll) => {
      try {
        const response = await axios.post('http://localhost:1000/api/result', {
          enroll: String(roll),
        });
        console.log("response fetched for roll:", roll);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(`Error posting data for roll ${roll}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter(result => result !== null);

    const currentState = getState().students;
    const newState = [...currentState];

    filteredResults.forEach(result => {
      if (result.length > 0) {
        const studentEnrollment = result[0].enrollment_number;
        const existingStudent = newState.find(student => student.enrollment_number === studentEnrollment);

        if (existingStudent) {
          existingStudent.semesters.push(...result);
        } else {
          newState.push({
            enrollment_number: studentEnrollment,
            student_name: result[0].student_name,
            branch_name: result[0].branch_name,
            batch: result[0].batch,
            college_name: result[0].college_name,
            semesters: result,
          });
        }
      }
    });
console.log(newState)
    dispatch(setStudents(newState));
  }
};

export const studentSort = () => async (dispatch, getState) => {
  const currentState = getState().students;
  const sortedStudents = [...currentState].sort((a, b) => {
    const aCGPA = a.semesters.reduce((acc, sem) => acc + parseFloat(sem.credit_obtained), 0) / a.semesters.length;
    const bCGPA = b.semesters.reduce((acc, sem) => acc + parseFloat(sem.credit_obtained), 0) / b.semesters.length;
    
    return bCGPA - aCGPA;
  });
  
  dispatch(setStudents(sortedStudents));
};
