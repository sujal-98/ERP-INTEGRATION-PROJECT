import { UPD_STUDENTS } from '../actions/index';

const initialState = {
  students: []
};

const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPD_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    default:
      return state;
  }
};

export default displayReducer;
