import React from 'react';
import {StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonList } from './src/components/PokemonList/Component';
import PokemonDetailed from './src/components/PokemonDetailed/Component';

const Stack = createStackNavigator();

const myAppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="PokemonList">
      <Stack.Screen name="PokemonList" component={PokemonList}/>
      <Stack.Screen name="PokemonDetailed" component={PokemonDetailed}/>
    </Stack.Navigator>
  </NavigationContainer>
) 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default myAppNavigator;