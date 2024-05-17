import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { collection, query, where, getDocs } from 'firebase/firestore';
import firestore from '../Firebase/firebase';
import LogoAgro from '../Assets/LogoAgro.png';
import '../App.css';

function BuscarCliente() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();
  const [Cedula, setCedula] = useState('');
  const [error, setError] = useState('');

  const infoCliente = async () => {
    try {
      const clientesRef = collection(firestore, 'Clientes');
      const q = query(clientesRef, where('Cedula', '==', Cedula))
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const cliente = querySnapshot.docs[0].data();
        // Redirigir a DetalleCliente con los datos del cliente
        navegar(`/${rol}/buscar/cliente-detalle`, { state: { Rol: rol, cliente: cliente } });
      } else {
        alert('Cliente no se encuentra registrado');
        setCedula('');
      }
    } catch (error) {
      console.error('Error al buscar cliente:', error);
      setError('Error al buscar cliente, intente de nuevo');
    }
  }

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-secundario">
          <div className="columna">
            <h1>Administrador</h1>
            <body>Buscar Cliente</body><br/><br/>

            <div className="input-contenedor">
              <FaUser className="icono" />
              <input type="text" placeholder="Número de cédula, formato: 101110111" value={Cedula} onChange={(e) => setCedula(e.target.value)} />
            </div><br/>

            <div className="contenedor-botones">
              <button className="btn_principal" onClick={infoCliente}>Buscar Cliente</button>
              <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
      <div className="logo-container">
          <img src={LogoAgro} alt="Logo" />
      </div>
    </div>
  );
}

export default BuscarCliente;