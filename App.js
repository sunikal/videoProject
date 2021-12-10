import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import {
  createAppContainer,
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './src/HomeScreen';
import VideoItem from './src/components/VideoItem';
import VideoScreen from './src/components/VideoScreen';

const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };


  const navOptionHandler = ()=>(
        {
          headerShown: false
        }
      );
  
// screens

  


const  App=()=>  {
  const Stack = createStackNavigator();
  return (
        <NavigationContainer theme={AppTheme}>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={navOptionHandler}/>
            <Stack.Screen name="VideoItem" component={VideoItem} options={navOptionHandler}/>
            
            <Stack.Screen name="VideoScreen" component={VideoScreen} options={navOptionHandler}/>
           </Stack.Navigator>
         </NavigationContainer>  
    );
}

export default App;