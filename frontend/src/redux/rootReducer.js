import { combineReducers } from 'redux';
import studentReducer from './reducers';
import displayReducer from './displayReducer';

// Combine reducers
const rootReducer = combineReducers({
  student: studentReducer,
  display: displayReducer
});

export default rootReducer;
