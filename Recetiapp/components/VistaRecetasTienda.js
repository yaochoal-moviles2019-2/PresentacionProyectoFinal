import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import backurl from '../backurl';

export default class VistaRecetasTienda extends Component {

    constructor() {
        super();
        this.state = {
            recetas: global.user.recipes,
            search: ''
        };
    }

    VerReceta = (item) => {
        var params = { item: item }
        Actions.VistaRecetaTienda(params);
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <View style={styles.MainContainer}>
                <SearchBar
                    platform="android"
                    placeholder="Buscar receta..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <FlatList
                    data={this.state.recetas}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 15 }}>
                            <TouchableOpacity onPress={() => this.VerReceta(item)}>
                                <Image style={styles.imageThumbnail} source={{ uri: item.imagen }} />
                                <Text style={{ color: 'white', textAlign: "center", flex: 1 }}>{item.nombre}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF5733',
        alignItems: 'center',

    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 24,
        backgroundColor: '#FF5733',

    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 25,
        borderColor: 'yellow',
        borderWidth: 5
    },
});
