import { SET_SUBJECT } from '../actions/types';

const initialState = {
  subject: {
    id: null,
    name: null,
  },
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
    default:
      return state;
  }
};

export default formReducer;
