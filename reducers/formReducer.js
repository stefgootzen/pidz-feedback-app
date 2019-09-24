import {
  SET_DEPARTMENT, SET_DEPARTMENT_COMPETENCES, SET_PIDZ_COMPETENCES, SET_FREELANCER,
  SET_OTHER_DEPARTMENT_COMPETENCES, SET_SUITABILITY, SET_FREELANCER_COMPETENCES, SET_REMARKS,
} from '../actions/types';

const initialState = {
  department: {
    id: null,
  },
  freelancer: {
    id: null,
    name: null,
  },
  isSuitableForDepartment: null,
  pidzCompetences: null,
  freelancerCompetences: null,
  departmentCompetences: null,
  otherDepartmentCompetence: null,
  remark: {
    message: null,
    recipients: null,
  },
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEPARTMENT:
      return {
        ...state,
        department: {
          ...state.department,
          id: action.payload,
        },
      };
    case SET_FREELANCER:
      return {
        ...state,
        freelancer: {
          ...state.freelancer,
          id: action.payload.id,
          name: action.payload.name,
        },
      };
    case SET_SUITABILITY:
      return {
        ...state,
        isSuitableForDepartment: action.payload,
      };
    case SET_PIDZ_COMPETENCES:
      return {
        ...state,
        pidzCompetences: action.payload,
      };
    case SET_FREELANCER_COMPETENCES:
      return {
        ...state,
        freelancerCompetences: action.payload,
      };
    case SET_DEPARTMENT_COMPETENCES:
      return {
        ...state,
        departmentCompetences: action.payload,
      };
    case SET_OTHER_DEPARTMENT_COMPETENCES:
      return {
        ...state,
        otherDepartmentCompetences: action.payload,
      };
    case SET_REMARKS:
      return {
        ...state,
        remark: {
          message: action.payload.message,
          recipients: action.payload.recipients,
        },
      };
    default:
      return state;
  }
};

export default formReducer;
