import { SET_SUBJECT } from './types';

export const setSubject = data => ({ // eslint-disable-line
  types: SET_SUBJECT,
  payload: {
    data,
  },
});
