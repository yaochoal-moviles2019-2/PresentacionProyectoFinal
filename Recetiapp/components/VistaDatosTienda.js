import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import { Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { CardItem, Body } from 'native-base';

export default class VistaDatosTienda extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: 'sans-serif-medium', color: 'white' }} h2>Bienvenido</Text>
                <Avatar size="xlarge" rounded source={{ uri: global.user.imagen }} />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Block style={{ margin: 25 }}>
                        <CardItem style={{ margin: 10 }}>
                            <Body>
                                <Text h6 color='black' >Nombre: {global.user.nombre}</Text>
                            </Body>
                        </CardItem >
                        <CardItem style={{ margin: 10 }}>
                            <Body>
                                <Text h6 color='black' >Email: {global.user.correo}</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ margin: 10 }}>
                            <Body>
                                <Text h6 color='black' >Dirección: {global.user.direccion}</Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ margin: 10 }}>
                            <Body>
                                <Text h6 color='black' >Telefono: {global.user.telefono}</Text>
                            </Body>
                        </CardItem>
                        <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                            onPress={() => {
                                if (global.user.latitude != null) {
                                    Actions.VerUbicacion({latitude: global.user.latitude,longitude: global.user.longitude});
                                }else{
                                    Alert.alert("Sin Ubicación seleccionada");
                                }
                            }}>Ver mi ubicación seleccionada</Button>
                        <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                            onPress={() => { Actions.ActualizarDatosTienda(); }}>Actualizar mis datos personales</Button>
                    </Block>
                </KeyboardAvoidingView>
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
