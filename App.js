import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import configureStore from './store';
import Suitability from './screens/Suitability';
import Selection from './screens/Selection';
import FreelancerCompetences from './screens/FreelancerCompetences';
import fromRight from './utils/transitionConfig';

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
