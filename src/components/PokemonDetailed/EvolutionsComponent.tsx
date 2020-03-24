import React from 'react';
import {View, Text} from 'react-native';

const EvolutionsComponent = ({route, navigation}) => {
    const { infos, evolutionsFamily} = route.params;

    const { name, height, id } = infos;

    let evolutions = [];
    evolutionsFamily.forEach(evolutionChain => {
        if (evolutionChain.chain.species.name == name) {
            evolutions.push(evolutionChain.chain.species.name);
            if (evolutionChain.chain.evolves_to[0] != undefined) {
                evolutions.push(evolutionChain.chain.evolves_to[0].species.name);
                if (evolutionChain.chain.evolves_to[0].evolves_to[0] != undefined) {
                    evolutions.push(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name);
                }
            }
        }  
        else if (evolutionChain.chain.evolves_to[0] != undefined) {
            if (evolutionChain.chain.evolves_to[0].species.name == name) {
                evolutions.push(evolutionChain.chain.species.name);
                evolutions.push(evolutionChain.chain.evolves_to[0].species.name)
                if (evolutionChain.chain.evolves_to[0].evolves_to[0] != undefined) {
                    evolutions.push(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)
                }
            }
            else if (evolutionChain.chain.evolves_to[0].evolves_to[0] != undefined) {
                if (evolutionChain.chain.evolves_to[0].evolves_to[0].species.name == name) {
                    evolutions.push(evolutionChain.chain.species.name);
                    evolutions.push(evolutionChain.chain.evolves_to[0].species.name)
                    evolutions.push(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)
                }     
            }       
        }
    });

    return(
        <View>
            <Text> {id} </Text>
            <Text> {name} </Text>
            <Text> {height} </Text>
            <Text> base : {evolutions[0]} </Text>
            {evolutions[1] ?  <Text> evolves to {evolutions[1]}</Text> : null}
            {evolutions[2] ? <Text> evolves to {evolutions[2]} </Text> : null}
        </View>
    )
}

export default EvolutionsComponent;