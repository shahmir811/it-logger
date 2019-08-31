import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS
} from '../actions/types';

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LOGS:
      return { ...state, logs: payload, loading: false };

    case ADD_LOG:
      return { ...state, logs: [...state.logs, payload], loading: false };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== payload),
        loading: false
      };

    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log => (log.id === payload.id ? payload : log)),
        loading: false
      };

    case SEARCH_LOGS:
      return { ...state, logs: payload, loading: false };

    case LOGS_ERROR:
      console.error(payload);
      return { ...state, loading: false, error: payload };

    case SET_LOADING:
      return { ...state, loading: true };

    case SET_CURRENT:
      return { ...state, current: payload };

    case CLEAR_CURRENT:
      return { ...state, current: null };

    default:
      return state;
  }
};
