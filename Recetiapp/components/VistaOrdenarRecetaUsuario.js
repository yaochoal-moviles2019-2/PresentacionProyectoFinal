import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import { Button, Input, Checkbox } from 'galio-framework';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import backurl from '../backurl';

export default class VistaOrdenarRecetaUsuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            date: null,
            otra_direccion: true,
            cantidad_porciones: 0,
            direccion_entrega: "",
        };
    }
    componentDidMount(){
        const parametros = {
            latitude: null,
            longitude: null
        }
        global.temp = parametros;
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        this.setState({ date: date });
        this.hideDateTimePicker();
    };
    GenerarOrden = (fecha_entrega, costo_total, direccion_entrega, estado, calificacion_usuario, calificacion_tienda, cantidad, user_id, store_id, recipe_id,latitude,longitude) => {
        if (cantidad == 0 || direccion_entrega == "" || direccion_entrega == null || fecha_entrega == null ||  latitude == null|| longitude == null) {
            Alert.alert("Faltan Campos por llenar")
        } else {
            const parametros_orden = {
                fecha_entrega: fecha_entrega,
                costo_total: costo_total,
                direccion_entrega: direccion_entrega,
                estado: estado,
                calificacion_usuario: calificacion_usuario,
                calificacion_tienda: calificacion_tienda,
                cantidad: cantidad,
                user_id: user_id,
                store_id: store_id,
                recipe_id: recipe_id,
                latitude:latitude,
                longitude:longitude
            }
            axios.post(backurl + "orders", parametros_orden).then(result => {
                Alert.alert("Orden realizada exitosamente");
                Actions.VistaMenuUsuario();
            }).catch(error => { console.log(error) })
        }
    }
    render() {
            return (
                <View style={styles.container}>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Ordenando:</Text>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{this.props.receta.nombre}</Text>
                    <Image style={styles.imageDesing} source={{ uri: this.props.receta.imagen }} />
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>Tienda: {this.props.receta.store.nombre}</Text>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'justify' }}>Dirección de Tienda: {this.props.receta.store.direccion}</Text>
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', margin: 10 }}
                            onPress={() => {
                                if (global.user.latitude != null) {
                                    Actions.VerUbicacion({latitude: this.props.receta.store.latitude,longitude: this.props.receta.store.longitude});
                                }else{
                                    Alert.alert("Sin Ubicación seleccionada");
                                }
                            }}>Ver ubicación de tienda</Button>
                    <Input placeholder="Cantidad de Porciones" style={{ width: 200 }} type='default' onChangeText={
                        cantidad_porciones => this.setState({ cantidad_porciones })} />
                    
                     <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                     onPress={ () => {Actions.UbicacionMapa({tipo_peticion: 2})}}
                 >Seleccionar ubicación de Entrega</Button>
                        
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                        onPress={this.showDateTimePicker}
                    >Seleccionar Fecha y Hora de entrega</Button>
                    <DateTimePicker
                        minDate={new Date(Date.now() + (10 * 60 * 1000))}
                        mode='datetime'
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                    <Button radius={200} shadowless={true} style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
                        onPress={() => {
                            this.GenerarOrden(
                                this.state.date,
                                this.props.receta.precio_unitario * this.state.cantidad_porciones,
                                global.user.direccion,
                                "Sin despachar",
                                0,
                                0,
                                this.state.cantidad_porciones,
                                global.user.id,
                                this.props.receta.store.id,
                                this.props.receta.id,
                                global.temp.latitude,
                                global.temp.longitude)
                        }}
                    >Realizar Orden</Button>
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