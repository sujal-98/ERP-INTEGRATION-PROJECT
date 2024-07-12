import { createStore } from 'redux';
import studentReducer from './reducers';

const store = createStore(
  studentReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
