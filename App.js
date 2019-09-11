import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import Suitability from './screens/Suitability';
import ErrorShower from './components/ErrorShower';
import Selection from './screens/Selection';
import Closing from './screens/Closing';
import DepartmentCompetences from './screens/DepartmentCompetences';
import Onboarding from './screens/Onboarding';
import InitialLoadingScreen from './screens/InitialLoadingScreen';
import Login from './screens/Login';
import FreelancerCompetences from './screens/FreelancerCompetences';
import PidzCompetences from './screens/PidzCompetences';
import fromRight from './utils/transitionConfig';

library.add(faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
});

const MainStack = createStackNavigator({
  DepartmentCompetences: {
    screen: DepartmentCompetences,
  },
  Selection: {
    screen: Selection,
  },
  Suitability: {
    screen: Suitability,
  },
  PidzCompetences: {
    screen: PidzCompetences,
  },
  FreelancerCompetences: {
    screen: FreelancerCompetences,
  },
  Closing: {
    screen: Closing,
  },
  Onboarding: {
    screen: Onboarding,
  },
});

const Routes = createSwitchNavigator({
  initialLoading: InitialLoadingScreen,
  auth: AuthStack,
  all: MainStack,
},
{
  initialRouteName: 'all',
  transitionConfig: () => fromRight(),
});

const AppContainer = createAppContainer(Routes);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={{ flex: 1 }}>
        <AppContainer />
        <ErrorShower />
      </View>
    </PersistGate>
  </Provider>
);

export default App;
