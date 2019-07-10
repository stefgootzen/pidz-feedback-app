import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store';
import Feedback from './screens/Feedback';
import Selection from './screens/Selection';
import fromRight from './utils/transitionConfig';

const MainNavigator = createStackNavigator({
  Feedback: {
    screen: Feedback,
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
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
