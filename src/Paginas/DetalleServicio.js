import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function DetalleServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();

  const navegarServicios = () => {
    navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
  };

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const detalles = {
    tipo: "xxxxxxt",
    area: "xxxxxxa",
    costo: "xxxxxxc",
    cultivo: "xxxxxxcu",
    descripcion: "xxxxxxd",
    dron: "xxxxxxdr",
    estado: "xxxxxxe",
    cedula: "xxxxxxcc",
    fechaInicio: "xxxxxxfi",
    fechaFin: "xxxxxxff"
  };

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario ">
          <div className="columna">
            <h1>Detalle del Servicio</h1>
            <p>Tipo de servicio: {detalles.tipo}</p>
            <p>Área: {detalles.area}</p>
            <p>Costo: {detalles.costo}</p>
            <p>Cultivo: {detalles.cultivo}</p>
            <p>Descripción: {detalles.descripcion}</p>
            <p>Dron utilizado: {detalles.dron}</p>
            <p>Estado: {detalles.estado}</p>
            <p>Cedula cliente: {detalles.cedula}</p>
            <p>Fecha inicio: {detalles.fechaInicio}</p>
            <p>Fecha fin: {detalles.fechaFin}</p>
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