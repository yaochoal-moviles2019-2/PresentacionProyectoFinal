import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Root } from "native-base";
import { Router, Stack, Scene } from 'react-native-router-flux';
import LoginUsuarioOTienda from './components/LoginUsuarioOTienda';
import RegistroUsuarioOTienda from './components/RegistroUsuarioOTienda';
import VistaMenuUsuario from './components/VistaMenuUsuario';
import VistaMenuTienda from './components/VistaMenuTienda';
import VistaDatosTienda from './components/VistaDatosTienda';
import VistaDatosUsuario from './components/VistaDatosUsuario';
import ActualizarDatosUsuario from './components/ActualizarDatosUsuario';
import VistaRecetasUsuario from './components/VistaRecetasUsuario';
import VistaRecetaUsuario from './components/VistaRecetaUsuario';
import VistaOrdernarRecetaUsuario from './components/VistaOrdenarRecetaUsuario';
import VistaMisOrdenesUsuario from './components/VistaMisOrdenesUsuario';
import VistaVerOrdenUsuario from './components/VistaVerOrdenUsuario';
import ActualizarDatosTienda from './components/ActualizarDatosTienda';
import VistaRecetasTienda from './components/VistaRecetasTienda';
import VistaRecetaTienda from './components/VistaRecetaTienda';
import ActualizarDatosReceta from './components/ActualizarDatosReceta';
import VistaMisOrdenesTienda from './components/VistaMisOrdenesTienda';
import VistaVerOrdenTienda from './components/VistaVerOrdenTienda';
import VistaNuevaReceta from './components/VistaNuevaReceta';
import ActualizarImagenUsuario from './components/ActualizarImagenUsuario';
import ActualizarImagenReceta from './components/ActualizarImagenReceta';
import ActualizarImagenTienda from './components/ActualizarImagenTienda';
import NuevaImagenReceta from './components/NuevaImagenReceta';
import UbicacionMapa from './components/UbicacionMapa';
import VerUbicacion from './components/VerUbicacion';
var firebaseConfig = {
  apiKey: "AIzaSyDLgyR0M7Qk_rG6JiX3v7Qn5ZPSWURSIi8",
  authDomain: "recetiapp.firebaseapp.com",
  databaseURL: "https://recetiapp.firebaseio.com",
  projectId: "recetiapp",
  storageBucket: "recetiapp.appspot.com",
  messagingSenderId: "593389944464",
  appId: "1:593389944464:web:4d7ddc30493d8586772215",
  measurementId: "G-E39PNC4FC8"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  
  render() {
    return (
      <Root >
        <Router >
          <Stack key="root" hideNavBar={true}>
            <Scene key="LoginUsuarioOTienda" component={LoginUsuarioOTienda} title="Iniciar sesión" initial={true}/>
            <Scene key="RegistroUsuarioOTienda" component={RegistroUsuarioOTienda} title="Registrarse" />
            <Scene key="VistaMenuUsuario" component={VistaMenuUsuario} title="Menu de Usuario" />
            <Scene key="VistaMenuTienda" component={VistaMenuTienda} title="Menu de Tienda" />
            <Scene key="VistaDatosTienda" component={VistaDatosTienda} title="Datos de Tienda" />
            <Scene key="VistaDatosUsuario" component={VistaDatosUsuario} title="Datos de Usuario" />
            <Scene key="ActualizarDatosUsuario" component={ActualizarDatosUsuario} title="Actualizar mis Datos" />
            <Scene key="VistaRecetasUsuario" component={VistaRecetasUsuario} title="Todas las Recetas" />
            <Scene key="VistaRecetaUsuario" component={VistaRecetaUsuario} title="Receta" />
            <Scene key="VistaOrdernarRecetaUsuario" component={VistaOrdernarRecetaUsuario} title="Ordenar Receta" />
            <Scene key="VistaMisOrdenesUsuario" component={VistaMisOrdenesUsuario} title="Mis Ordenes" />
            <Scene key="VistaVerOrdenUsuario" component={VistaVerOrdenUsuario} title="Orden" />
            <Scene key="ActualizarDatosTienda" component={ActualizarDatosTienda} title="Actualizar mis Datos" />
            <Scene key="VistaRecetasTienda" component={VistaRecetasTienda} title="Mis recetas" />
            <Scene key="VistaRecetaTienda" component={VistaRecetaTienda} title="Receta" />
            <Scene key="ActualizarDatosReceta" component={ActualizarDatosReceta} title="Receta" />
            <Scene key="VistaMisOrdenesTienda" component={VistaMisOrdenesTienda} title="Mis Ordenes" />
            <Scene key="VistaVerOrdenTienda" component={VistaVerOrdenTienda} title="Orden" />
            <Scene key="VistaNuevaReceta" component={VistaNuevaReceta} title="Nueva Receta" />
            <Scene key="ActualizarImagenUsuario" component={ActualizarImagenUsuario} title="Actualizar imagen" />
            <Scene key="ActualizarImagenReceta" component={ActualizarImagenReceta} title="Actualizar imagen" />
            <Scene key="ActualizarImagenTienda" component={ActualizarImagenTienda} title="Actualizar imagen" />
            <Scene key="NuevaImagenReceta" component={NuevaImagenReceta} title="Actualizar imagen" />
            <Scene key="UbicacionMapa" component={UbicacionMapa} title="Actualizar Ubicacion" />
            <Scene key="VerUbicacion" component={VerUbicacion} title="Ver Ubicacion" />
          </Stack>
        </Router>
      </Root>
    );
  }
}

