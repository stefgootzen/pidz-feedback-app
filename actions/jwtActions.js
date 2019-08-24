import { REMOVE_JWT, SET_JWT } from './types';

export const setJwt = data => (dispatch) => {
  dispatch({
    type: SET_JWT,
    payload: data,
  });
};

export const removeJwt = () => (dispatch) => {
  dispatch({
    type: REMOVE_JWT,
  });
};
