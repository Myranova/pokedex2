import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    ActivityIndicator,
    TouchableHighlight,
    TextInput,
} from 'react-native';
import { StackNavigationProp} from '@react-navigation/stack';
import * as PokemonModule from "../../interfaces/Pokemon";
import mapTypeToColor from "../../utils/MapTypeToColor";

interface AppState {
    gotAll: boolean,
    gotAllEvolutionFamilyList: boolean
    errorFetch: boolean,
    searchValue: string,
    listSprites : any[],
    evolutionFamilyList : any[];
    Fulldata : PokemonModule.default.PokemonInfo[]
    data : PokemonModule.default.PokemonInfo[]
}

interface Props {
    navigation : StackNavigationProp<any>
}

export class PokemonList extends React.Component<Props, AppState>
{
    constructor(props: any) {
        super(props);
        this.state = {
            gotAll: false,
            gotAllEvolutionFamilyList : false,
            errorFetch: false,
            searchValue: "",
            evolutionFamilyList : [],
            listSprites: [],
            data: [],
            Fulldata: [],
        }
    }

    componentDidMount() {
        this.getAllEvolutionFamily();
        this.getAllPokemonsUri();
        
    }

    renderSearchBar = () => {
        return <TextInput
            style={{
                height: 40,
                borderWidth: 1,
                borderColor: 'black',
            }}
            value={this.state.searchValue}
            onChangeText={this.handleSearch}
            placeholder="search a pokemon"
        />
    }

    handleSearch = (text: string) => {
        const formattedQuery = text.toLowerCase();
        const filteredPokemons = this.state.Fulldata.filter(item => item.name.includes(formattedQuery));
        this.setState({
            searchValue: text,
            data : filteredPokemons
        });
    }

    getAllEvolutionFamily = async () => {
        let fetchedData = [];
        var error_fetch;
        for (let i = 1 ; i < 151 && error_fetch != true; i++) {
            await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
                .then(response => response.json())
                .then((responseJson) => {
                    fetchedData.push(responseJson);
                    // console.log(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                    error_fetch = true;
                })
        }
        this.setState({
            evolutionFamilyList : fetchedData,
            gotAllEvolutionFamilyList : true
        })
    }

    getAllPokemonsUri = async () => {
        let fetchedData = [];
        for(let i = 0; i < 15; i++) {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then((responseJson) => {
                    fetchedData.push(responseJson);
                    // console.log(responseJson);
                })
                .catch((error) => {
                    this.setState({
                        errorFetch: true,
                    })
                })
        }
        this.setState({
            gotAll: true,
            Fulldata: fetchedData,
            data: fetchedData,
            errorFetch: false
        })
    }

    renderRowPokemon = (data : any) =>
        <TouchableHighlight key={data.item.id}
            onPress={() => this.props.navigation.navigate('PokemonDetailed', {
                infos : data.item,
                evolutionsFamily : this.state.evolutionFamilyList
            })}
        >
            <View style={{flex : 1, flexDirection: 'row'}}>
                <Text style={{ flex : 0.30, textAlignVertical: 'center', justifyContent: 'center', alignItems : 'center'}}> #{data.item.id} </Text>
                <Image
                    style={{
                        flex : 1,
                        height: 80,
                        width: 80,
                        flexDirection: 'column', justifyContent: 'center' }}
                    source={{uri: data.item.sprites['front_default']}}
                />
                <View style={{flex : 2}}>
                    <Text style={{flex : 1.5, textAlignVertical: 'center'}}> {data.item.name} </Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{flex : 1,
                            margin: 3,
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            backgroundColor: mapTypeToColor.get(data.item.types[0].type.name),
                            color: 'white'}}> {data.item.types[0].type.name} </Text>
                        {data.item.types[1] ?
                            <Text style={{flex : 1,
                                margin: 3,
                                textAlignVertical: 'center',
                                textAlign: 'center',
                                backgroundColor: mapTypeToColor.get(data.item.types[1].type.name),
                                color: 'white'}}>
                                {data.item.types[1].type.name}
                            </Text> : null}
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    render() {
        const { gotAll, data, evolutionFamilyList, gotAllEvolutionFamilyList } = this.state;
        if (gotAllEvolutionFamilyList) {
            evolutionFamilyList.forEach((evolutionFamily) => {
            })
        }
        if (!gotAll) {
            return (<View>
                <ActivityIndicator/>
            </View>)
        }
        else {
            return (
                <View>
                    {this.renderSearchBar()}
                    <FlatList
                        data={data}
                        // style={{backgroundColor: 'green'}}
                        contentContainerStyle={{backgroundColor: 'white'}}
                        renderItem={this.renderRowPokemon}
                        initialNumToRender={1}
                        horizontal={false}
                        keyExtractor={(item, index ) => index.toString()}
                    />
                </View>
            )
        }
    }
};
