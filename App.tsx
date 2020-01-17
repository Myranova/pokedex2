import React from 'react';
import {StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { PokemonList } from './src/components/PokemonList/Component';
import PokemonDetailed from './src/components/PokemonDetailed/Component';

const AppNavigator =  createStackNavigator({
  PokemonList : PokemonList,
  PokemonDetailed : PokemonDetailed
}, {
  initialRouteName : 'PokemonList'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppNavigator);