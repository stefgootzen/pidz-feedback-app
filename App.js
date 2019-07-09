import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Feedback from './screens/Feedback';
import Selection from './screens/Selection';

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
});

const AppContainer = createAppContainer(MainNavigator);

const App = () => (
  <AppContainer />
);

export default App;
