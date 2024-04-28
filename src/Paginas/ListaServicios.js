import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function ListaServicios() {
  const location = useLocation();
  const rol = location.state.Rol;
  const [servicios, setServicios] = useState([]);
  const navegar = useNavigate();

  // Cargar los servicios al cargar la pantalla por primera vez
  useEffect(() => {
    const serviciosFromLocation = location.state.servicios || [];
    setServicios(serviciosFromLocation);
  }, [location.state.servicios]);

  const navegarBuscar = () => {
    if (location.pathname === '/tecnico/modificar/servicios') {
      navegar(`/${rol}/modificar-servicios`, { state: { Rol: rol } });
    } else {
      navegar(`/${rol}/buscar-servicios`, { state: { Rol: rol } });
    }
  }

  const navegarMenu = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const navegarDetalleServicio = (id, servicio) => {
    if (location.pathname === '/tecnico/modificar/servicios') {
      navegar(`/${rol}/modificar/servicios-detalle`, { state: { Rol: rol, servicio: servicio } });
    } else {
      navegar(`/${rol}/buscar/servicios-detalle`, { state: { Rol: rol, servicio: servicio } });
    }
  }

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    return (fechaFormateada.getDate() + 1) + '/' + (fechaFormateada.getMonth() + 1) + '/' + fechaFormateada.getFullYear();
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-secundario">
          <div className="columna">
            <h1>Servicios</h1>
            <body>{location.pathname === '/tecnico/modificar/servicios' ? 'Seleccione el servicio a modificar' : 'Seleccione el servicio a consultar'}</body><br /><br />
            <div className="contenedor-items">
              <ul>
                {servicios.length > 0 ? (
                  servicios.map(servicio => (
                    <li key={servicio.id} onClick={() => navegarDetalleServicio(servicio.id, servicio)}>
                      Fecha de Inicio: {formatearFecha(servicio.FechaInicio)}
                    </li>
                  ))
                ) : (
                  <p style={{textAlign: 'center', color: 'red'}}>No hay servicios asociados a este cliente.</p>
                )}
              </ul>
            </div>
            <div className="contenedor-botones">
              <button className="btn_principal" onClick={navegarBuscar}>Atrás</button>
              <button className="btn_secundario" onClick={navegarMenu}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaServicios;