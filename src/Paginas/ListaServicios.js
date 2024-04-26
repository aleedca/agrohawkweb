import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function ListaServicios() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();

  const navegarBuscar = () => {
    navegar(`/${rol}/buscar-servicios`, { state: { Rol: rol } });
  }

  const navegarMenu = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const navegarDetalleServicio = () => {
    navegar(`/${rol}/buscar/servicios-detalle`, { state: { Rol: rol } });
  }

  const servicios = [
    'Servicio 1',
    'Servicio 2',
    'Servicio 3',
    'Servicio 4',
    'Servicio 5',
    'Servicio 6',
    'Servicio 7',
    'Servicio 8',
    'Servicio 9',
    'Servicio 10'
  ];

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-secundario">
          <div className="columna">
            <h1>Servicios</h1>
            <body>Seleccione el servicio</body>
            <div className="contenedor-items">
            <ul>
              {servicios.map((servicio, index) => (
                <li key={index} onClick={navegarDetalleServicio}>{servicio}</li>
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