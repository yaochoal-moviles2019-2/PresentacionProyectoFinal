import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Input, Button } from 'galio-framework';
import logo from '../assets/logo.png';
import axios from 'axios';
import backurl from '../backurl';
import { Actions } from 'react-native-router-flux';

export default class ActualizarDatosUsuario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            direccion: "",
            imagen: "",
            telefono: "",
        };
    }
    ActualizarDatosUsuario = (google_id, nombre, direccion, telefono) => {
        const column_names_values = [
            { name: "nombre", value: nombre },
            { name: "direccion", value: direccion },
            { name: "telefono", value: telefono }];
        let nueva_informacion_usuario = {}
        for (let i = 0; i < column_names_values.length; i++) {
            let name = column_names_values[i].name
            let value_n = column_names_values[i].value
            if (column_names_values[i].value !== '') {
                nueva_informacion_usuario[name] = value_n
            }
        }
        axios.patch(backurl + "users/" + google_id, nueva_informacion_usuario)
            .then(result => { global.user = result.data; Alert.alert("Datos actualizados correctamente"); Actions.VistaMenuUsuario(); })
            .catch(error => { console.log(error); Alert.alert("Error actualizando datos"); })

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white' }} h4>Actualizar</Text>
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white' }} h4>Mis Datos Personales</Text>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200 }}
                />
                <Input placeholder="Nombre" type='default' onChangeText={nombre => this.setState({ nombre })} />
                <Input placeholder="Direccion" type='default' onChangeText={direccion => this.setState({ direccion })} />
                <Input placeholder="Telefono" type='default' onChangeText={telefono => this.setState({ telefono })} />

                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => this.ActualizarDatosUsuario(global.gid, this.state.nombre, this.state.direccion, this.state.telefono)}>
                    Actualizar mis Datos
                </Button>
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => Actions.ActualizarImagenUsuario({ url: backurl + "users/" + global.gid })}>
                    Actualizar Imagen
                </Button>
                <Button
                    radius={200}
                    shadowless={true}
                    style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                    onPress={() => Actions.UbicacionMapa({ url: backurl + "users/" + global.gid,tipo_peticion: 1,tipo_usuario: 1})}>
                    Actualizar Ubicación
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
        justifyContent: 'center',
    },
});