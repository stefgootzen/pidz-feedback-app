import { combineReducers } from 'redux';
import formReducer from './formReducer';
import onboardingReducer from './onboardingReducer';
import jwtReducer from './jwtReducer';

export default combineReducers({
  form: formReducer,
  onboarding: onboardingReducer,
  jwt: jwtReducer,
});
