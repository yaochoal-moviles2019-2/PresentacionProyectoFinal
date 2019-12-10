import React, { Component } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import { Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import backurl from '../backurl';

export default class VistaTiendaUsuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagen: ""
        }
    }
    LogOut = () => {
        firebase.auth().signOut()
            .then(result => { Alert.alert("Deslogeado correctamente"); Actions.LoginUsuarioOTienda(); })
            .catch(error => { Alert.alert("Error Deslogeando"); console.log(error) })
    }
    componentDidMount() {
        axios.get(backurl + "stores/" + global.gid).then(result => { global.user = result.data; this.setState({ imagen: "2" }) })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white' }} h2>Bienvenido</Text>
                <Avatar size="xlarge" rounded source={{ uri: global.user.imagen }} />
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white', marginTop: 5 }} h5>{global.user.nombre}</Text>
                <Block style={{ margin: 25 }}>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                        onPress={() => { Actions.VistaRecetasTienda(); }}>Ver Mis Recetas</Button>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                        onPress={() => { Actions.VistaMisOrdenesTienda(); }}>Ver mis Ordenes</Button>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                        onPress={() => { Actions.VistaDatosTienda(); }}>Ver mis Datos Personales</Button>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                        onPress={() => { Actions.VistaNuevaReceta(); }}>Agregar Nueva Receta</Button>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                        onPress={() => { this.LogOut(); }}>Cerrar sesión</Button>
                </Block>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#FF5733',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
