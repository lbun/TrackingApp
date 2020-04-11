import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext'
import { FontAwesome } from '@expo/vector-icons'
// evey screen we define inside navigation receives navigation props object
// this allows to handle navigations or trigger nacvigation
// accessing to this props outside a react component is quite challenging

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: < FontAwesome name="th-list" size={20} />
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    CreateTrack: TrackCreateScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

// in this way at the very top we have our AuthProvider and below all
// the child components
// this App component is created entirely from React Navigation
//and here we pass the prop to manage prop outside react component
export default () => {
  return (
    <TrackProvider>
     <LocationProvider>
      <AuthProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};