import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Button } from 'galio-framework';
import { Actions } from 'react-native-router-flux';
import { CardItem, Body } from 'native-base';

export default class VistaRecetaUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientes: []
        }
    }
    componentDidMount() {
        var Texto = this.props.item.ingredientes;
        this.setState({ ingredientes: Texto.split(",") })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FF5733', }}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>{this.props.item.nombre}</Text>
                        <Image style={styles.imageDesing} source={{ uri: this.props.item.imagen }} />
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>Descripción:</Text>
                        <Text style={{ color: 'white', fontSize: 15, textAlign: 'justify' }} > {this.props.item.descripcion}</Text>
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>Ingredientes:</Text>
                        {this.state.ingredientes.map((ingrediente, index) => {
                            return (<CardItem key={index} style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >{ingrediente}</Text>
                                </Body>
                            </CardItem>);
                        })
                        }
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>Precio unitario:</Text>
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>$ {this.props.item.precio_unitario}</Text>
                        <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                            onPress={() => { Actions.VistaOrdernarRecetaUsuario({ receta: this.props.item }); }}
                        >Encargar Orden</Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF5733',
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'center',
    },
    imageDesing: {
        width: 300,
        height: 300,
        borderRadius: 25,
        borderColor: 'yellow',
        borderWidth: 5
    }
});