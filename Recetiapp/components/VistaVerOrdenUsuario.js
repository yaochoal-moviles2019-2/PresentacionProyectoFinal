import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { Text, Block, Button } from 'galio-framework';
import { CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import axios from 'axios';
import backurl from '../backurl';

const Opciones = ['Excelente', 'Bueno', 'Regular', 'Malo', 'Nefasto', 'Cancelar'];
const Opciones_vista = ['Sin calificar', 'Nefasto', 'Malo', 'Regular', 'Bueno', 'Excelente'];
export default class VistaVerOrdenUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    CalificarOrden=(index)=>{
        const parametros = {
            calificacion_usuario: index
        }
        axios.patch(backurl+"orders/"+this.props.orden.id,parametros).then(result=>{
            Alert.alert("Orden Calificada correctamente");
            setTimeout(() => { Actions.VistaMenuUsuario(); }, 1000);
        })
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FF5733' }}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}> Orden de: {this.props.orden.recipe.nombre}</Text>
                        <Image style={styles.imageDesing} source={{ uri: this.props.orden.recipe.imagen }} />
                        <Block style={{ margin: 25 }}>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >No° de Orden: {this.props.orden.id}</Text>
                                </Body>
                            </CardItem >
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Nombre de Tienda: {this.props.orden.store.nombre}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Fecha de entrega: {this.props.orden.fecha_entrega}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Estado: {this.props.orden.estado}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Costo Total: {this.props.orden.costo_total}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Calificación Usuario: {Opciones_vista[this.props.orden.calificacion_usuario]}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ margin: 10 }}>
                                <Body>
                                    <Text h6 color='black' >Calificación Tienda: {Opciones_vista[this.props.orden.calificacion_tienda]}</Text>
                                </Body>
                            </CardItem>
                            <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                                onPress={() => {
                                    if (global.user.latitude != null) {
                                        Actions.VerUbicacion({ latitude: this.props.orden.store.latitude, longitude: this.props.orden.store.longitude });
                                    } else {
                                        Alert.alert("Sin Ubicación seleccionada");
                                    }
                                }}>Ver ubicación de Tienda</Button>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={'¿Cómo le pareció el servicio?'}
                                options={Opciones}
                                cancelButtonIndex={5}
                                destructiveButtonIndex={5}
                                onPress={(index) => { 
                                    if(this.props.orden.calificacion_usuario==0){
                                        this.CalificarOrden(5-index) 
                                    }else{
                                        Alert.alert("Orden ya calificada.")
                                    }
                                }}
                            />
                            <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                                onPress={this.showActionSheet}>Calificar Orden</Button>
                        </Block>
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
        width: 200,
        height: 200,
        borderRadius: 25,
        borderColor: 'yellow',
        borderWidth: 5
    }
});