import {
  SET_FREELANCER_COMPETENCE, SET_SUBJECT, SET_SUITABILITY, SET_FACTORS,
} from './types';

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
  console.log('in competence action');
  dispatch({
    type: SET_FREELANCER_COMPETENCE,
    payload: data,
  });
};

export const setFactors = data => (dispatch) => {
  dispatch({
    type: SET_FACTORS,
    payload: data,
  });
};
