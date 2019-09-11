import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
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

library.add(faSmile, faMeh, faFrown, faTrash, faAngleRight, faSignOutAlt, faTimes);

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
  PidzCompetences: {
    screen: PidzCompetences,
  },
  DepartmentCompetences: {
    screen: DepartmentCompetences,
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
  initialRouteName: 'initialLoading',
  transitionConfig: () => fromRight(),
});

const AppContainer = createAppContainer(Routes);

class App extends React.Component {
  state={
    isReady: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      /* eslint global-require: 0 */
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
    });
    this.setState({
      isReady: true,
    });
  }

  render() {
    const {
      isReady,
    } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <AppContainer />
            <ErrorShower />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
