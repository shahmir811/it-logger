import { combineReducers } from 'redux';
import LogReducer from './logReducer';

export default combineReducers({
  default: () => 'Hello',
  log: LogReducer
});
