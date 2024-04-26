import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IniciarSesion from './Paginas/IniciarSesion';
import RegistrarCuenta from './Paginas/RegistrarCuenta';
import PaginaPrincipalAdmin from './Paginas/PaginaPrincipalAdmin';
import PaginaPrincipalTecnico from './Paginas/PaginaPrincipalTecnico';

import RegistrarCliente from './Paginas/RegistrarCliente';
import BuscarCliente from './Paginas/BuscarCliente';
import DetalleCliente from './Paginas/DetalleCliente';

import RegistrarServicio from './Paginas/RegistrarServicio';
import BuscarServicio from './Paginas/BuscarServicio';
import ListaServicios from './Paginas/ListaServicios';
import DetalleServicio from './Paginas/DetalleServicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/registrarCuenta" element={<RegistrarCuenta />} />
        <Route path="/administrador/pagina-principal" element={<PaginaPrincipalAdmin />} />
        <Route path="/tecnico/pagina-principal" element={<PaginaPrincipalTecnico />} />

        <Route path="/administrador/registrar-cliente" element={<RegistrarCliente />} />
        <Route path="/administrador/buscar-servicios" element={<BuscarServicio />} />
        <Route path="/administrador/buscar/servicios" element={<ListaServicios />} />
        <Route path="/administrador/buscar/servicios-detalle" element={<DetalleServicio />} />
        <Route path="/administrador/buscar-cliente" element={<BuscarCliente />} />
        <Route path="/administrador/buscar/cliente-detalle" element={<DetalleCliente />} />

        <Route path="/tecnico/buscar-servicios" element={<BuscarServicio />} />
        <Route path="/tecnico/buscar/servicios" element={<ListaServicios />} />
        <Route path="/tecnico/buscar/servicios-detalle" element={<DetalleServicio />} />
        <Route path="/tecnico/registrar-servicio" element={<RegistrarServicio />} />


      </Routes>
    </Router>
  );
}

export default App;
