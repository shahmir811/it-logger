import { combineReducers } from 'redux';
import LogReducer from './logReducer';
import TechReducer from './techReducer';

export default combineReducers({
  default: () => 'Hello',
  log: LogReducer,
  tech: TechReducer
});
