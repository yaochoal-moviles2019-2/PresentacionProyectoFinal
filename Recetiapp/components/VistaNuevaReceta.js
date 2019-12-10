import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, TextInput  } from 'react-native';
import {Textarea, Form } from 'native-base';
import { Input, Button } from 'galio-framework';
import logo from '../assets/logo.png';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import backurl from '../backurl';

export default class VistaNuevaReceta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            descripcion: "",
            imagen: "",
            ingredientes: "",
            precio: 0,
            stock: 0
        };
    }

    ActualizarReceta = (nombre, descripcion, imagen, ingredientes, precio, stock, id_tienda) => {

        if (nombre != "" && descripcion != "" && imagen != undefined && ingredientes != "" && precio != "" && stock != "") {
            const parametros = {
                nombre: nombre,
                descripcion: descripcion,
                ingredientes: ingredientes,
                imagen: imagen,
                precio_unitario: precio,
                stock: stock,
                store_id: id_tienda
            }
            axios.post(backurl + "recipes", parametros)
                .then(result => { Alert.alert("Receta creada correctamente"); Actions.VistaMenuTienda(); })
                .catch(error => { Alert.alert("Error actualizando receta"); console.log(error); })
        } else {
            Alert.alert("Faltan datos por llenar");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200 }}
                />
                <Input placeholder="Nombre" type='default' onChangeText={nombre => this.setState({ nombre })} />
                <Input placeholder="Descripcion" type='default' onChangeText={descripcion => this.setState({ descripcion })} />
                <Input placeholder="Ingredientes" style={{height:150, textAlign: 'left',justifyContent: 'flex-start',alignItems:'flex-start'}} type='default' onChangeText={ingredientes => this.setState({ ingredientes })} />
              
                <Input placeholder="Precio unitario" type='default' onChangeText={precio => this.setState({ precio })} />
                <Input placeholder="Stock" type='default' onChangeText={stock => this.setState({ stock })} />
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => Actions.NuevaImagenReceta()}>
                    Seleccionar Imagen
                </Button>
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => this.ActualizarReceta(
                        this.state.nombre,
                        this.state.descripcion,
                        global.temp,
                        this.state.ingredientes,
                        this.state.precio,
                        this.state.stock,
                        global.user.id)}>
                    Crear Receta
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF5733',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});