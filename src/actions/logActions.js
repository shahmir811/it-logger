import axios from 'axios';

import {
  ADD_LOG,
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS
} from './types';

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await axios.get('/logs');

    dispatch({
      type: GET_LOGS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};

// add new log
export const addLog = log => async dispatch => {
  try {
    dispatch(setLoading());

    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await axios.post('/logs', log, config);

    dispatch({
      type: ADD_LOG,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};

// delete log
export const deleteLog = id => async dispatch => {
  try {
    dispatch(setLoading());

    await axios.delete(`/logs/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};

// update log
export const updateLog = log => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    dispatch(setLoading());

    const response = await axios.put(`/logs/${log.id}`, log, config);

    dispatch({
      type: UPDATE_LOG,
      payload: response.data
    });

    dispatch(clearCurrent());
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};

// Search from logs
export const searchLogs = text => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await axios.get(`/logs?q=${text}`);

    dispatch({
      type: SEARCH_LOGS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};

// Set Current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// set loading to true
export const setLoading = () => ({ type: SET_LOADING });
