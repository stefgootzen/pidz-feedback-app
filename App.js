import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import Suitability from './screens/Suitability';
import ErrorShower from './components/ErrorShower';
import Selection from './screens/Selection';
import Closing from './screens/Closing';
import Factors from './screens/Factors';
import InitialLoadingScreen from './screens/InitialLoadingScreen';
import Login from './screens/Login';
import FreelancerCompetences from './screens/FreelancerCompetences';
import fromRight from './utils/transitionConfig';

library.add(faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
});

const MainStack = createStackNavigator({
  Selection: {
    screen: Selection,
  },
  Suitability: {
    screen: Suitability,
  },
  FreelancerCompetences: {
    screen: FreelancerCompetences,
  },
  Factors: {
    screen: Factors,
  },
  Closing: {
    screen: Closing,
  },
});

const Routes = createSwitchNavigator({
  initialLoading: InitialLoadingScreen,
  auth: AuthStack,
  all: MainStack,
}, {
  initialRouteName: 'initialLoading',
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
