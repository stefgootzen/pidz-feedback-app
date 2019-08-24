import { REMOVE_JWT, SET_JWT } from '../actions/types';

const initialState = {
  jwt: null,
};

const jwtReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_JWT:
      return {
        ...state,
        jwt: null,
      };
    case SET_JWT:
      return {
        ...state,
        jwt: action.payload,
      };
    default:
      return state;
  }
};

export default jwtReducer;
