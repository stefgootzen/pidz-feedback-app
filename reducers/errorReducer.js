import { SET_ERROR, REMOVE_ERROR } from '../actions/types';

const initialState = {
  message: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ERROR:
      return {
        ...state,
        message: null,
      };
    case SET_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
