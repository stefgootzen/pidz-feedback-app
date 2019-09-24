import {
  SET_PIDZ_COMPETENCES, SET_FREELANCER, SET_SUITABILITY, SET_DEPARTMENT_COMPETENCES,
  SET_OTHER_DEPARTMENT_COMPETENCES, SET_DEPARTMENT, SET_FREELANCER_COMPETENCES, SET_REMARKS
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

export const setPidzCompetences = data => (dispatch) => {
  dispatch({
    type: SET_PIDZ_COMPETENCES,
    payload: data,
  });
};

export const setDepartmentCompetences = data => (dispatch) => {
  dispatch({
    type: SET_DEPARTMENT_COMPETENCES,
    payload: data,
  });
};

export const setFreelancerCompetences = data => (dispatch) => {
  dispatch({
    type: SET_FREELANCER_COMPETENCES,
    payload: data,
  });
};

export const setOtherDepartmentCompetences = data => (dispatch) => {
  dispatch({
    type: SET_OTHER_DEPARTMENT_COMPETENCES,
    payload: data,
  });
};

export const setRemarks = data => (dispatch) => {
  dispatch({
    type: SET_REMARKS,
    payload: data,
  });
};
