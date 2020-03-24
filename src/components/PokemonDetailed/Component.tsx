import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, ActivityIndicator} from 'react-native';
import { RouteProp, NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AttacksComponent from './AttacksComponent';
import InfosComponent from './InfosComponent';
import EvolutionsComponent from './EvolutionsComponent';
import * as PokemonModule from "../../interfaces/Pokemon";
import { EvolutionChainModule } from "../../interfaces/EvolutionChain";

type PokemonInfo = PokemonModule.default.PokemonInfo;
type Move = PokemonModule.default.Move

/* type RootStackParamList = {
    PokemonList: undefined;
    PokemonDetailed : { data : any};
}

type DetailsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'PokemonDetailed'>,
    route: RouteProp<RootStackParamList, 'PokemonDetailed'>,
    // PokemonInfo: PokemonInfo
} */

interface State {
    evolutionChain: EvolutionChainModule.EvolutionChain,
    gotData: boolean,
}

const Tab = createBottomTabNavigator();

const PokemonTab = ({route, navigation}) => {
    const { infos, evolutionsFamily } = route.params
    return (
        <Tab.Navigator>
            <Tab.Screen name="Infos" initialParams={infos} component={InfosComponent}/>
            <Tab.Screen name="Attaques" initialParams={infos} component={AttacksComponent}/>
            <Tab.Screen name="Evolutions" initialParams={{infos, evolutionsFamily}} component={EvolutionsComponent}/>
        </Tab.Navigator>
    )
} 

export default PokemonTab;