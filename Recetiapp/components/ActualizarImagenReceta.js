import React from 'react';
import {
  ActivityIndicator,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { Text, Button } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import * as firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

console.disableYellowBox = true;

export default class ActualizarImagenReceta extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#FF5733',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {image ? null : (
          <Text style={{ fontFamily: 'sans-serif-medium', color: 'white', marginTop: 10 }} h3>Actualizar Imagen</Text>
        )}
        <Button
          radius={200}
          shadowless={true}
          style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
          onPress={this._pickImage}>
          Seleccionar imagen de Galeria
                </Button>
        <Button
          radius={200}
          shadowless={true}
          style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
          onPress={this._takePhoto}>
          Tomar una Foto
                </Button>
        {this._maybeRenderImage()}
        <Button
          radius={200}
          shadowless={true}
          style={{ backgroundColor: '#F59D2D', marginTop: 10 }}
          onPress={() => { this.ActualizarFoto(this.state.image) }} >
          Actualizar imagen
                </Button>
        {this._maybeRenderUploadingOverlay()}
        <StatusBar barStyle="default" />
      </View>
    );
  }
  ActualizarFoto = (image) => {
    if (image != null) {
      const parametros = {
        imagen: image
      }
      axios.patch(this.props.url, parametros)
        .then(result => { Alert.alert("Foto Actualizada Correctamente"); setTimeout(() => { Actions.VistaMenuTienda(); }, 2000); })
        .catch(error => { console.log(error) })
    } else {
      Alert.alert("Sin Imagen Seleccionada");
    }

  }
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Mira esta foto',
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Carga fallida, lo siento :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Solicitud de red fallida'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();



  return await snapshot.ref.getDownloadURL();
}
