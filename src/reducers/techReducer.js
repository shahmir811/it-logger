import {
  GET_TECHS,
  DELETE_TECH,
  ADD_TECH,
  TECHS_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  techs: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TECHS:
      return { ...state, techs: payload, loading: false, error: null };

    case ADD_TECH:
      return { ...state, techs: [...state.techs, payload], loading: false };

    case TECHS_ERROR:
      console.error(payload);
      return { ...state, error: payload };

    case SET_LOADING:
      return { ...state, loading: true };

    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== payload),
        loading: false
      };

    default:
      return state;
  }
};
