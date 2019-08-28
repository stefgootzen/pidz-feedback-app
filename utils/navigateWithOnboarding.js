import { store } from '../store';
import onboardingData from '../assets/onboardingData';

const navigateWithOnboarding = (navigator, route) => {
  const {
    shouldShowOnboarding,
  } = store.getState().onboarding;

  if (shouldShowOnboarding && onboardingData[route.toLowerCase()]) {
    return navigator.navigate('Onboarding', { route });
  }

  return navigator.navigate(route);
};

export default navigateWithOnboarding;
