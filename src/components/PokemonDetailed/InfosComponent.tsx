import React from 'react';
import {View, Text} from 'react-native';

import * as PokemonModule from "../../interfaces/Pokemon";

type PokemonInfo = PokemonModule.default.PokemonInfo;

const PokemonInfosComponent = ({route, navigation}) => {
    const { name, height, stats} = route.params as PokemonInfo;
        return (
            <View>
                <Text> Details </Text>
                <Text> {name}</Text>
                <Text> {height} </Text>
                {stats.map((stat) => {
                    <Text> {stat.base_stat}</Text>
                })}
                
            </View>
        )
}

export default PokemonInfosComponent;