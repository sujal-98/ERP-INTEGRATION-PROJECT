import { SET_STUDENTS } from '../actions/index';

const initialState = {
  students: []
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    default:
      return state;
  }
};

export default studentReducer;
