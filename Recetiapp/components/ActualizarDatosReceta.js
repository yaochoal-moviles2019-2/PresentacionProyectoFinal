import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Input, Button, Block } from 'galio-framework';
import logo from '../assets/logo.png';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import backurl from '../backurl';

export default class ActualizarDatosReceta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            descripcion: "",
            ingredientes: "",
            precio: 0,
            stock: 0
        };
    }

    ActualizarReceta = (nombre, descripcion, ingredientes, precio_unitario, stock, id_receta) => {
        const column_names_values = [
            { name: "nombre", value: nombre },
            { name: "descripcion", value: descripcion },
            { name: "ingredientes", value: ingredientes },
            { name: "precio_unitario", value: precio_unitario },
            { name: "stock", value: stock },
        ];
        let nueva_informacion_usuario = {}
        for (let i = 0; i < column_names_values.length; i++) {
            let name = column_names_values[i].name
            let value_n = column_names_values[i].value
            if (column_names_values[i].value !== '') {
                nueva_informacion_usuario[name] = value_n
            }
        }
        axios.patch(backurl + "recipes/" + id_receta, nueva_informacion_usuario)
            .then(result => { Alert.alert("Receta actualizada correctamente"); Actions.VistaMenuTienda(); })
            .catch(error => { Alert.alert("Error actualizando receta"); console.log(error); })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200 }}
                />
                <Input placeholder="Nuevo Nombre" type='default' onChangeText={nombre => this.setState({ nombre })} />
                <Input placeholder="Nueva Descripcion" type='default' onChangeText={descripcion => this.setState({ descripcion })} />
                <Input placeholder="Nuevos Ingredientes" type='default' onChangeText={ingredientes => this.setState({ ingredientes })} />
                <Input placeholder="Nuevos Precio unitario" type='default' onChangeText={precio => this.setState({ precio })} />
                <Input placeholder="Nuevos Stock" type='default' onChangeText={stock => this.setState({ stock })} />
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => this.ActualizarReceta(
                        this.state.nombre,
                        this.state.descripcion,
                        this.state.ingredientes,
                        this.state.precio,
                        this.state.stock,
                        this.props.receta.id)}>
                    Editar Receta
                </Button>
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => Actions.ActualizarImagenReceta({ url: backurl + "recipes/" + this.props.receta.id })}>
                    Actualizar Imagen
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