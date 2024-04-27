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
    navegar(`/${rol}/buscar-servicios`, { state: { Rol: rol } });
  }

  const navegarMenu = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const navegarDetalleServicio = (id, servicio) => {
    navegar(`/${rol}/buscar/servicios-detalle`, { state: { Rol: rol, servicio: servicio } });
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-secundario">
          <div className="columna">
            <h1>Servicios</h1>
            <body>Seleccione el servicio</body>
            <div className="contenedor-items">
              <ul>
                {servicios.map(servicio => (
                  <li key={servicio.id} onClick={() => navegarDetalleServicio(servicio.id, servicio)}>
                    Fecha de Inicio: {servicio.FechaInicio}
                  </li>
                ))}
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