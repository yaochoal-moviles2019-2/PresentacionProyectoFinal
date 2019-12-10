import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

export default class VistaMisOrdenesUsuario extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ordenes: [],
        }
    }
    componentDidMount() {
        this.setState({ ordenes: global.user.orders });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>Mis Ordenes</Text>
                {
                    this.state.ordenes.map((orden, i) => (
                        <TouchableOpacity key={i} onPress={() => { Actions.VistaVerOrdenUsuario({ orden: orden }); }}>
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: orden.recipe.imagen } }}
                                title={"Orden de: "+orden.recipe.nombre}
                                subtitle={"N° de Orden: "+orden.id}
                                bottomDivider
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#FF5733',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
});
