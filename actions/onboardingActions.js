import { SET_ONBOARDING_STATE } from './types';

// eslint-disable-next-line
export const setOnboardingState = data => (dispatch) => {
  dispatch({
    type: SET_ONBOARDING_STATE,
    payload: data,
  });
};
