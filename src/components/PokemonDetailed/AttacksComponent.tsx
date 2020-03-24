import React from 'react';
import { View, Text} from 'react-native';

import * as PokemonModule from "../../interfaces/Pokemon";

type PokemonInfo = PokemonModule.default.PokemonInfo;

const AttacksComponent = ({route, navigation}) => {
    const { moves } = route.params as PokemonInfo
    return (
        <View>
            <Text> Attacks </Text>
            {moves.map((move) => 
            (
                <View>
                    <Text> {move.move.name} </Text>
                    <Text> {move.move.url} </Text>
                </View>
            ))}
            
            
        </View>
    )   
}

export default AttacksComponent;