import React from 'react';
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import * as PokemonModule from "../../interfaces/Pokemon";
import { EvolutionChainModule } from "../../interfaces/EvolutionChain";

type PokemonInfo = PokemonModule.default.PokemonInfo;
type Move = PokemonModule.default.Move

type Props = {
    navigation: NavigationStackProp,
    PokemonInfo: PokemonInfo
}

interface State {
    evolutionChain: EvolutionChainModule.EvolutionChain,
    gotData: boolean,
}

class PokemonEvolutionsComponent extends React.PureComponent<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
           evolutionChain : null,
            gotData : false,
        }
    }

    componentDidMount(): void {
        const { id } = this.props.navigation.getParam('data') as PokemonInfo;

        fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
            .then(response => response.json())
            .then(responseJson => {
                var evolutionChain : EvolutionChainModule.EvolutionChain = responseJson;
                console.log('id pokemon : ' + id  + 'responseJson : ' + evolutionChain);
                this.setState({
                    gotData: true,
                    evolutionChain: responseJson
                })
                // this.setState({
                 //    evolutionChain: evolutionChain
                // })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { evolutionChain, gotData } = this.state;
        if (gotData) {
            return (
                <View>
                    <Text> { evolutionChain.chain.species.name } evolves to </Text>
                    <Text> {evolutionChain.chain.evolves_to[0].species.name} at level
                        {evolutionChain.chain.evolves_to[0].evolves_to[0].species.name } </Text>
                </View>
            )
        }
        else {
            return (<ActivityIndicator/>)
        }

    }
}

class PokemonAttacksComponent extends React.PureComponent<{}, {}> {
    constructor(props : {}) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text> Attacks </Text>
            </View>
        )
    }
}

class PokemonInfosComponent extends React.PureComponent<Props, { }>
{
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { name, height, moves, stats } = this.props.navigation.getParam('data') as PokemonInfo;
        return (
            <View>
                <Text> {name} </Text>
                <Text> tailles : {height}</Text>
                <Text> attaques  : </Text>
                <Text>
                    {moves.map((move: Move) =>
                        <Text> {move.move.name},  </Text>)
                    })}
                </Text>
            </View>
        )
    }
}


const PokemonDetailedComponent = createMaterialTopTabNavigator({
    Infos : PokemonInfosComponent,
    Evolutions : PokemonEvolutionsComponent,
    Attacks : PokemonAttacksComponent
})


export default createAppContainer(PokemonDetailedComponent);