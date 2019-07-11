import { SET_FREELANCER_COMPETENCE, SET_SUBJECT, SET_SUITABILITY } from '../actions/types';

const initialState = {
  subject: {
    id: null,
    name: null,
  },
  suitableForDepartment: {
    isSuitable: null,
    clarification: null,
  },
  freelancerCompetences: null,
  factors: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECT:
      return {
        ...state,
        subject: {
          ...state.subject,
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
    case SET_FREELANCER_COMPETENCE:
      return {
        ...state,
        freelancerCompetences: {
          ...state.freelancerCompetences,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default formReducer;
