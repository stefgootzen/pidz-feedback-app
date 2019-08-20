import { combineReducers } from 'redux';
import formReducer from './formReducer';
import onboardingReducer from './onboardingReducer';

export default combineReducers({
  form: formReducer,
  onboarding: onboardingReducer,
});
