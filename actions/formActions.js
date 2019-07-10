import { SET_SUBJECT } from './types';

export const setSubject = data => (dispatch) => { //eslint-disable-line
  dispatch({
    type: SET_SUBJECT,
    payload: data,
  });
};
