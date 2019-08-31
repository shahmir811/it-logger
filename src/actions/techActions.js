import axios from 'axios';
import {
  GET_TECHS,
  DELETE_TECH,
  ADD_TECH,
  TECHS_ERROR,
  SET_LOADING
} from './types';

// Get all technicians
export const geTechnicians = () => async dispatch => {
  try {
    dispatch(setLoading());

    const response = await axios.get('/techs');

    dispatch({
      type: GET_TECHS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Add technician to server
export const addTech = tech => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await axios.post('/techs', tech, config);

    dispatch({
      type: ADD_TECH,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Delete technician
export const deleteTech = id => async dispatch => {
  try {
    await axios.delete(`/techs/${id}`);

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

// set loading to true
export const setLoading = () => ({ type: SET_LOADING });
