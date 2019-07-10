import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import configureStore from './store';
import Suitability from './screens/Suitability';
import Selection from './screens/Selection';
import fromRight from './utils/transitionConfig';

const MainNavigator = createStackNavigator({
  Suitability: {
    screen: Suitability,
  },
  Selection: {
    screen: Selection,
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
