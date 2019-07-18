import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSmile, faMeh, faFrown, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import configureStore from './store';
import Suitability from './screens/Suitability';
import Selection from './screens/Selection';
import Closing from './screens/Closing';
import Factors from './screens/Factors';
import FreelancerCompetences from './screens/FreelancerCompetences';
import fromRight from './utils/transitionConfig';

library.add(faSmile, faMeh, faFrown, faTrash);

const MainNavigator = createStackNavigator({
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
},
{
  initialRouteName: 'Selection',
  transitionConfig: () => fromRight(),
});

const AppContainer = createAppContainer(MainNavigator);

const App = () => (
  <Provider store={configureStore()}>
    <AppContainer />
  </Provider>
);

export default App;
