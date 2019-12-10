import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { MAP_TYPES, ProviderPropType, Marker } from 'react-native-maps';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const customStyle = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#242f3e',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#263c3f',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#6b9a76',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#38414e',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#212a37',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9ca5b3',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#746855',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#1f2835',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#f3d19c',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#2f3948',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#d59563',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#515c6d',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#17263c',
            },
        ],
    },
];


export default class UbicacionMapa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: null,
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    ConfirmarUbicacion = (url, tipo_de_peticion, region, tipo_de_usuario) => {
        const parametros = {
            latitude: region.latitude,
            longitude: region.longitude
        }
        if (tipo_de_peticion == 1) {
            axios.patch(url, parametros)
                .then(result => { 
                    Alert.alert("Ubicación Actualizada Correctamente"); 
                    if(tipo_de_usuario==1){
                        setTimeout(() => { Actions.VistaMenuUsuario(); }, 1000);
                    }
                    if(tipo_de_usuario==2){
                        setTimeout(() => { Actions.VistaMenuTienda(); }, 1000);
                    }
                })
                .catch(error => { console.log(error) })
        }
        if(tipo_de_peticion ==2){
            global.temp = parametros;
            Alert.alert("Ubicación Actualizada Correctamente"); 
            setTimeout(() => { Actions.pop(); }, 1000);
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Vaya, esto no funcionará en Sketch en un emulador de Android. Pruébalo en tu dispositivo!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Se denegó el permiso para acceder a la ubicación',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            region: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.region != null && <MapView
                    provider={this.props.provider}
                    ref={ref => {
                        this.map = ref;
                    }}
                    mapType={MAP_TYPES.STANDARD}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onRegionChange={region => this.onRegionChange(region)}
                    customMapStyle={customStyle}
                >
                    <Marker
                        coordinate={this.state.region}
                        title={"Mi Ubicación"}

                    />
                </MapView>}
                {this.state.region != null && <View style={[styles.bubble, styles.latlng]}>
                    <Text style={styles.centeredText}>
                        {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
                    </Text>
                </View>
                }

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.ConfirmarUbicacion(
                            this.props.url, 
                            this.props.tipo_peticion, 
                            this.state.region,
                            this.props.tipo_usuario)}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={styles.buttonText}>Confirmar Ubicación</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

UbicacionMapa.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 100,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    buttonText: {
        textAlign: 'center',
    },
    centeredText: { textAlign: 'center' },
});