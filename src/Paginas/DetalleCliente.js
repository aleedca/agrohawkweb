import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import LogoAgro from '../Assets/LogoAgro.png';
import firestore from '../Firebase/firebase';

function BuscarCliente() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();
  const cliente = location.state.cliente;
  const [Nombre, setNombre] = useState(cliente.Nombre);
  const [Apellidos, setApellidos] = useState(cliente.Apellidos);
  const [Cedula, setCedula] = useState(cliente.Cedula);
  const [Telefono, setTelefono] = useState(cliente.Telefono);
  const [Email, setEmail] = useState(cliente.Email);
  const [Direccion, setDireccion] = useState(cliente.Direccion);
  const [nuevaCedula, setNuevaCedula] = useState(cliente.Cedula);

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  // Función para modificar el cliente
  const modificarCliente = async () => {
    try {
      // Actualizar los datos del cliente en Firestore
      const clienteQuery = query(collection(firestore, 'Clientes'), where('Cedula', '==', Cedula));
      const clienteSnapshot = await getDocs(clienteQuery);
      console.log(clienteSnapshot);
      if (!clienteSnapshot.empty) {
        // Verificar si la cédula ha cambiado
        console.log("Cedula vieja: ", Cedula);
        console.log("Cedula nueva: ", nuevaCedula);
        const clienteDoc = clienteSnapshot.docs[0];
        const clienteRef = doc(firestore, 'Clientes', clienteDoc.id);
        if (Cedula !== nuevaCedula) {
          // Obtener el documento anterior
          const clienteAntiguoRef = doc(firestore, 'Clientes', Cedula);
          // Crear un nuevo documento con la nueva cédula
          const clienteNuevoRef = doc(firestore, 'Clientes', nuevaCedula);
          // Copiar los datos del documento anterior al nuevo
          await updateDoc(clienteNuevoRef, clienteSnapshot.data());
          // Eliminar el documento anterior
          await deleteDoc(clienteAntiguoRef);
        }

        // Actualizar los datos del cliente
        await updateDoc(clienteRef, {
          Nombre: Nombre,
          Apellidos: Apellidos,
          Cedula: nuevaCedula,
          Telefono: Telefono,
          Email: Email,
          Direccion: Direccion
        });

        alert("Cliente modificado con éxito");
        navegarPaginaPrincipal();
      } else {
        alert('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al modificar cliente:', error);
      alert('Error al modificar cliente, por favor intenta de nuevo');
    }
  }

  // Función para eliminar el cliente
  const eliminarCliente = async () => {
    try {
      const confirmacion = window.confirm("¿Está seguro que desea eliminar este cliente?");

      if (confirmacion) {
        // Buscamos al cliente por su cédula
        const clienteQuery = query(collection(firestore, 'Clientes'), where('Cedula', '==', cliente.Cedula));
        const clienteSnapshot = await getDocs(clienteQuery);
        console.log(clienteSnapshot);

        if (!clienteSnapshot.empty) {
          // Obtenemos el ID del cliente
          const clienteId = clienteSnapshot.docs[0].id;

          // Eliminamos el cliente
          await deleteDoc(doc(firestore, 'Clientes', clienteId));

          // Obtener todos los servicios asociados al cliente
          const serviciosQuery = query(collection(firestore, "Servicios"), where("Cliente", "==", cliente.Cedula));
          const serviciosSnapshot = await getDocs(serviciosQuery);

          // Eliminar cada servicio
          serviciosSnapshot.forEach(async (servicio) => {
            const docRef = doc(firestore, "Servicios", servicio.id);
            await deleteDoc(docRef);
          });

          alert("Cliente eliminado con éxito");
          navegarPaginaPrincipal();
        } else {
          alert('Cliente no encontrado');
        }
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert('Error al eliminar cliente, por favor intenta de nuevo');
    }
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario">
          <div className="columna">
            <h1 style={{marginTop: "30px"}}>Administrador</h1>
            <body>Detalle Cliente</body><br />

            <div className="input-contenedor">
              <input type="text" placeholder="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
              <input type="text" placeholder="Apellidos" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
              <input type="text" placeholder="Cédula" value={Cedula} readOnly />
              <input type="text" placeholder="Número de teléfono" value={Telefono} onChange={(e) => setTelefono(e.target.value)} />
              <input type="text" placeholder="Correo electrónico" value={Email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" placeholder="Dirección" value={Direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>

            <div className="contenedor-botones">
              <button className="btn_principal" onClick={modificarCliente}>Modificar</button>
              <button className="btn_principal" onClick={eliminarCliente}>Eliminar</button>
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