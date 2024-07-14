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

  const chunks = chunkArray(enrollments, 20);

  for (const chunk of chunks) {
    const promises = chunk.map(async (roll) => {
      try {
        const response = await axios.post('http://localhost:1000/api/response', {
          enroll: [roll],
        });
        console.log("response fetched for roll:", roll);
        return response.data;
      } catch (error) {
        console.error(`Error posting data for roll ${roll}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const filteredResults = results.filter(result => result !== null);

    const currentState = getState().students;
    dispatch(setStudents([...currentState, ...filteredResults.flat()]));
  }
};
