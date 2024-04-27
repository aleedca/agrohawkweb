import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firestore from '../Firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../App.css';

function RegistrarServicios() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();

  const [TipoServicio, setTipoServicio] = useState('');
  const [Area, setArea] = useState('');
  const [Costo, setCosto] = useState('');
  const [Cultivo, setCultivo] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Dron, setDron] = useState('');
  const [Cliente, setCliente] = useState('');
  const [Clientes, setClientes] = useState([]);
  const [Estado, setEstado] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const clientesCollection = collection(firestore, 'Clientes'); // Asegúrate de que 'Clientes' es el nombre correcto de tu colección
    const clientesSnapshot = await getDocs(clientesCollection);
    const clientesList = clientesSnapshot.docs.map(doc => ({ label: doc.data().Nombre + " " + doc.data().Apellidos, value: doc.data().Cedula }));
    setClientes(clientesList);
    console.log('Clientes cargados:', clientesList);
  };

  const servicios = [
    { label: 'Servicio de Fumigación con drone', value: 'Servicio de Fumigación con drone' },
    { label: 'Servicio se mapeo de Finca, inventario de fincas y conteo de plantas de piña', value: 'Servicio se mapeo de Finca, inventario de fincas y conteo de plantas de piña' },
    { label: 'Servicio de monitoreo de maquinaria agrícola', value: 'Servicio de monitoreo de maquinaria agrícola' }
  ];

  const estados = [
    { label: 'En espera', value: 'En espera' },
    { label: 'En proceso', value: 'En proceso' },
    { label: 'Finalizado', value: 'Finalizado' }
  ];

  const registrarServicio = async () => {
    // Validar los campos de entrada
    if (!TipoServicio || !Area || !Costo || !Cultivo || !Descripcion || !Dron || !Estado || !Cliente || !FechaInicio || !FechaFin) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validar las fechas
    if (new Date(FechaInicio) >= new Date(FechaFin)) {
      alert('La fecha de fin debe ser mayor que la fecha de inicio.');
      return;
    }

    try {
      const datosServicio = {
        TipoServicio,
        Area,
        Costo,
        Cultivo,
        Descripcion,
        Dron,
        Estado,
        Cliente,
        FechaInicio,
        FechaFin
      };
      const docRef = await addDoc(collection(firestore, 'Servicios'), datosServicio);
      console.log('Documento insertado con ID: ', docRef.id);
      alert("Servicio agregado con éxito");
      navegarPaginaPrincipal();
    } catch (error) {
      console.error('Error al insertar el documento: ', error);
    }
  }

  const navegarPaginaPrincipal = () => {
    navegar('/tecnico/pagina-principal', { state: { Rol: rol } });
  }

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario ">
          <div className="columna">
            <h1>Registrar Servicio</h1>
            <div className="input-contenedor">
            <select className="dropdown" value={TipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
                <option value="">Seleccione el tipo de servicio</option>
                {servicios.map((servicio, index) => (
                  <option key={index} value={servicio.value}>
                    {servicio.label}
                  </option>
                ))}
              </select>
              
              <input type="text" value={Area} placeholder="Área (tamaño)" onChange={(e) => setArea(e.target.value)} />
              <input type="text" value={Costo} placeholder="Costo" onChange={(e) => setCosto(e.target.value)} />
              <input type="text" value={Cultivo} placeholder="Cultivo" onChange={(e) => setCultivo(e.target.value)} />
              <input type="text" value={Descripcion} placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
              <input type="text" value={Dron} placeholder="Dron utilizado" onChange={(e) => setDron(e.target.value)} />
              <select className="dropdown" value={Estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Seleccione un estado</option>
                {estados.map((estado, index) => (
                  <option key={index} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
              <select className="dropdown" value={Cliente} onChange={(e) => setCliente(e.target.value)}>
                <option value="">Seleccione un cliente</option>
                {Clientes.map((cliente, index) => (
                  <option key={index} value={cliente.value}>
                    {cliente.label}
                  </option>
                ))}
              </select>
              <input type="date" value={FechaInicio} title="Fecha inicio" onChange={(e) => setFechaInicio(e.target.value)} />
              <input type="date" value={FechaFin} title="Fecha fin" onChange={(e) => setFechaFin(e.target.value)} />
            </div>
            <div className="contenedor-botones">
              <button className="btn_principal" onClick={registrarServicio}>Registrar Servicio</button>
              <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarServicios;