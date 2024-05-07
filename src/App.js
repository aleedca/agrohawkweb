import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IniciarSesion from './Paginas/IniciarSesion';
import RegistrarCuenta from './Paginas/RegistrarCuenta';
import PaginaPrincipalAdmin from './Paginas/PaginaPrincipalAdmin';
import PaginaPrincipalTecnico from './Paginas/PaginaPrincipalTecnico';
import PaginaPrincipalAnalista from './Paginas/PaginaPrincipalAnalista';

import RegistrarCliente from './Paginas/RegistrarCliente';
import BuscarCliente from './Paginas/BuscarCliente';
import DetalleCliente from './Paginas/DetalleCliente';

import RegistrarServicio from './Paginas/RegistrarServicio';
import BuscarServicio from './Paginas/BuscarServicio';
import ListaServicios from './Paginas/ListaServicios';
import DetalleServicio from './Paginas/DetalleServicio';

import GenerarReporte from './Paginas/GenerarReporte';
import VerEstadisticasGenerales from './Paginas/VerEstadisticasGenerales';
import VerReportes from './Paginas/VerReportes';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/registrarCuenta" element={<RegistrarCuenta />} />
        <Route path="/administrador/pagina-principal" element={<PaginaPrincipalAdmin />} />
        <Route path="/tecnico/pagina-principal" element={<PaginaPrincipalTecnico />} />
        <Route path="/analista/pagina-principal" element={<PaginaPrincipalAnalista />} />

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

        <Route path="/tecnico/modificar-servicios" element={<BuscarServicio />} />
        <Route path="/tecnico/modificar/servicios" element={<ListaServicios />} />
        <Route path="/tecnico/modificar/servicios-detalle" element={<DetalleServicio />} />

        <Route path="/analista/estadisticas-generales" element={<VerEstadisticasGenerales />} />
        <Route path="/analista/reportes" element={<VerReportes />} />
        <Route path="/analista/generar-reporte" element={<GenerarReporte />} />

      </Routes>
    </Router>
  );
}

export default App;
