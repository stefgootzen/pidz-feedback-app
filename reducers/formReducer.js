import {
  SET_DEPARTMENT, SET_DEPARTMENT_COMPETENCES, SET_PIDZ_COMPETENCE, SET_OTHER_DEPARTMENT_COMPETENCES, SET_FREELANCER,
  SET_SUITABILITY,
} from '../actions/types';

const initialState = {
  department: {
    id: null,
  },
  freelancer: {
    id: null,
    name: null,
  },
  suitableForDepartment: {
    isSuitable: null,
    clarification: null,
  },
  pidzCompetences: [],
  departmentCompetences: null,
  otherDepartmentCompetences: null,
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
        suitableForDepartment: {
          ...state.suitability,
          isSuitable: action.payload.isSuitable,
          clarification: action.payload.clarification,
        },
      };
    case SET_PIDZ_COMPETENCE:
      return {
        ...state,
        pidzCompetences: [
          ...state.pidzCompetences,
          action.payload,
        ],
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
    default:
      return state;
  }
};

export default formReducer;
