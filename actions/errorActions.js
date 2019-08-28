import { REMOVE_ERROR, SET_ERROR } from './types';

// eslint-disable-next-line
export const setError = data => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: data,
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ERROR,
    });
  }, 3000);
};
