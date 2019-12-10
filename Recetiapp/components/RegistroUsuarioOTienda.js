import React, { Component } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Block, Button, Checkbox } from 'galio-framework';
import { Image } from 'react-native-elements';
import logo from '../assets/logo.png';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import backurl from '../backurl';

export default class RegistroUsuarioOTienda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registro_nombre: "",
            registro_correo: "",
            registro_password: "",
            tienda: true,
        };
    }

    SignUp = (registro_nombre, registro_correo, registro_password, tienda) => {
        if(registro_nombre!=""&&registro_correo!=""&&registro_password!=""){
            firebase.auth().createUserWithEmailAndPassword(registro_correo, registro_password)
            .then(result => {
                Alert.alert("Usuario Registrado correctamente");
                global.gid = result.user.uid;
                const user_info = {
                    nombre: registro_nombre,
                    google_id: result.user.uid,
                    correo: registro_correo,
                    imagen: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                if (tienda) {
                    axios.post(backurl + "stores", user_info)
                        .then(result => { global.user = result.data; Actions.VistaMenuTienda() })
                        .catch(error => { console.log("Error registrando datos de usuario en Back"); console.log(error); })
                } else {
                    axios.post(backurl + "users", user_info)
                        .then(result => { global.user = result.data; Actions.VistaMenuUsuario() })
                        .catch(error => { console.log("Error registrando datos de usuario en Back"); console.log(error); })
                }
            })
            .catch(error => { console.log("Error Registrando en Firebase"); console.log(error); });
        }else{
            Alert.alert("Faltan Datos por llenar");
        }
        
    };

    render() {
        console.log(this.state.tienda)
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white' }} h1>RECETICAPP</Text>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200 }}
                />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Block>
                        <Input placeholder="Nombre completo" type='default' onChangeText={
                            registro_nombre => this.setState({ registro_nombre })} />
                        <Input placeholder="Email" type='email-address' onChangeText={
                            registro_correo => this.setState({ registro_correo })} />
                        <Input placeholder="Contraseña" password={true} onChangeText={
                            registro_password => this.setState({ registro_password })} />
                        <View style={{ padding: 15 }}>
                            <Checkbox color="warning" label="Registrar como Tienda"
                                labelStyle={{ color: 'white' }}
                                onChange={() => {
                                    if (this.state.tienda) {
                                        this.setState({ tienda: false });
                                    } else {
                                        this.setState({ tienda: true });
                                    }
                                }} />
                        </View>
                        <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', }}
                            onPress={() => this.SignUp(
                                this.state.registro_nombre,
                                this.state.registro_correo,
                                this.state.registro_password,
                                this.state.tienda
                            )}>Registrate</Button>
                    </Block>
                </KeyboardAvoidingView>
                <View >
                    <Text h5 color='white' bold={true} italic={true} style={{margin:10}}  onPress={() => {
                        Actions.LoginUsuarioOTienda()
                    }}>Ya te encuentras registrado? Oprime aqui!</Text>
                </View>
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
