import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import '../App.css';

function BuscarServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();

  const navegarListaServicios = () => {
    if (location.pathname === '/tecnico/modificar-servicios') {
      navegar(`/${rol}/modificar/servicios`, { state: { Rol: rol } });
    } else {
      navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
    }
  }

  const navegarMenu = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-secundario">
          <div className="columna">
            <h1>{rol === 'administrador' ? 'Administrador' : 'Técnico'}</h1>
            <body>{location.pathname === '/tecnico/modificar-servicios' ? 'Modificar Servicio' : 'Buscar Servicio'}</body><br /><br />

            <div className="input-contenedor">
              <FaUser className="icono" />
              <input type="text" placeholder="Número de cédula, formato: 101110111" />
            </div><br />

            <div className="contenedor-botones">
              <button className="btn_principal" onClick={navegarListaServicios}>Buscar Servicio</button>
              <button className="btn_secundario" onClick={navegarMenu}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuscarServicio;