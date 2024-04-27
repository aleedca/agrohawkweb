import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import firestore from '../Firebase/firebase';
import { FaUser } from 'react-icons/fa';
import '../App.css';

function BuscarServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();
  const [numeroCedula, setNumeroCedula] = useState('');

  const navegarListaServicios = async () => {
    try {
      const q = query(collection(firestore, 'Servicios'), where('Cliente', '==', numeroCedula));
      const querySnapshot = await getDocs(q);
      const serviciosEncontrados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (location.pathname === '/tecnico/modificar-servicios') {
        navegar(`/${rol}/modificar/servicios`, { state: { Rol: rol, servicios: serviciosEncontrados  } });
      } else {
        navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol, servicios: serviciosEncontrados } });
      }
    } catch (error) {
      console.error('Error al buscar servicios:', error);
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
              <input type="text" placeholder="Número de cédula, formato: 101110111" value={numeroCedula} onChange={(e => setNumeroCedula(e.target.value))} />
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