import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';


import MasterView from '../screens/MasterView';
import DetailView from '../screens/DetailView';

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// }));

const MainNavigator = createStackNavigator({
  MasterView: {screen: MasterView},
  DetailView: {screen: DetailView}
});

const App = createAppContainer(MainNavigator);

export default App;
