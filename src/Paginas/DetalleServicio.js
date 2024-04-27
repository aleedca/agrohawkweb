import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function DetalleServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const servicio = location.state.servicio; // Obtener el objeto del servicio de la ubicación
  const navegar = useNavigate();

  const navegarServicios = () => {
    navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
  };

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  console.log("Servicio: ", servicio);
  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario">
          <div className="columna">
            <h1>Detalle del Servicio</h1>
            <p>Tipo de servicio: {servicio.Tipo}</p>
            <p>Área: {servicio.Area}</p>
            <p>Costo: {servicio.Costo}</p>
            <p>Cultivo: {servicio.Cultivo}</p>
            <p>Descripción: {servicio.Descripcion}</p>
            <p>Dron utilizado: {servicio.Dron}</p>
            <p>Estado: {servicio.Estado}</p>
            <p>Cédula cliente: {servicio.Cliente}</p>
            <p>Fecha inicio: {servicio.FechaInicio}</p>
            <p>Fecha fin: {servicio.FechaFin}</p>
            <div className="contenedor-botones">
              <button className="btn_principal" onClick={navegarServicios}>Atrás</button>
              <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleServicio;