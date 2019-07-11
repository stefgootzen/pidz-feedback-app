import { SET_FREELANCER_COMPETENCE, SET_SUBJECT, SET_SUITABILITY } from './types';

export const setSubject = data => (dispatch) => {
  dispatch({
    type: SET_SUBJECT,
    payload: data,
  });
};

export const setSuitability = data => (dispatch) => {
  dispatch({
    type: SET_SUITABILITY,
    payload: data,
  });
};

export const setFreelancerCompetence = data => (dispatch) => {
  dispatch({
    type: SET_FREELANCER_COMPETENCE,
    payload: data,
  });
};
