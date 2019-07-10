import SET_TEXT from '../actions/types';

const initialState = {
  subject: {
    id: null,
    name: null,
  },
};

const dummyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.payload.data,
      };

    default:
      return state;
  }
};

export default dummyReducer;
