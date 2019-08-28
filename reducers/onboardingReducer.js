import { SET_ONBOARDING_STATE } from '../actions/types';

const initialState = {
  shouldShowOnboarding: true,
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONBOARDING_STATE:
      return {
        ...state,
        shouldShowOnboarding: action.payload,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
