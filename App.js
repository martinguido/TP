import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import Home from './components/Home/index.js';
import Favs from './components/Favs/index.js';
import {store} from './components/reducers/store.js';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Favs" component={Favs} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
