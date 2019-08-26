import {
  SET_FREELANCER_COMPETENCE, SET_FREELANCER, SET_SUITABILITY, SET_FACTORS, SET_OTHER_FACTORS,
  SET_DEPARTMENT,
} from './types';

export const setDepartment = data => (dispatch) => {
  dispatch({
    type: SET_DEPARTMENT,
    payload: data,
  });
};

export const setFreelancer = data => (dispatch) => {
  dispatch({
    type: SET_FREELANCER,
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

export const setFactors = data => (dispatch) => {
  dispatch({
    type: SET_FACTORS,
    payload: data,
  });
};

export const setOtherFactors = data => (dispatch) => {
  dispatch({
    type: SET_OTHER_FACTORS,
    payload: data,
  });
};
