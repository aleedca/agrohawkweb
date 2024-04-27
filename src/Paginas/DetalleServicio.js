import React, { useEffect, useState } from 'react';
import firestore from '../Firebase/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';

function DetalleServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const servicio = location.state.servicio; // Obtener el objeto del servicio de la ubicación
  const navegar = useNavigate();

  const [TipoServicio, setTipoServicio] = useState(servicio.TipoServicio)
  const [Area, setArea] = useState('');
  const [Costo, setCosto] = useState('');
  const [Cultivo, setCultivo] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Dron, setDron] = useState('');
  const [Cliente, setCliente] = useState(servicio.cliente);
  const [Clientes, setClientes] = useState([]);
  const [Estado, setEstado] = useState(servicio.Estado);
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState(''); 

  useEffect(() => {
    setCliente(servicio.Cliente);
  }, [servicio.Cliente]);

  useEffect(() => {
    setTipoServicio(servicio.TipoServicio);
  }, [servicio.TipoServicio]);

  useEffect(() => {
    setEstado(servicio.Estado);
  }, [servicio.Estado]);

  useEffect(() => {
    cargarClientes();
  }, []);

  const navegarServicios = () => {
    navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
  };

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const cargarClientes = async () => {
    const clientesCollection = collection(firestore, 'Clientes'); // Asegúrate de que 'Clientes' es el nombre correcto de tu colección
    const clientesSnapshot = await getDocs(clientesCollection);
    const clientesList = clientesSnapshot.docs.map(doc => ({ label: doc.data().Nombre + " " + doc.data().Apellidos, value: doc.data().Cedula }));
    setClientes(clientesList);
  };

  const modificarServicio = () => {
    alert("Servicio modificado correctamente");
    navegarPaginaPrincipal();
  }

  const eliminarServicio = () => {
    alert("Servicio eliminado correctamente");
    navegarPaginaPrincipal();
  }

  const tipos = [
    { label: 'Servicio de fumigación con drone', value: 'Servicio de fumigación con drone' },
    { label: 'Servicio se mapeo de finca, inventario de fincas y conteo de plantas de piña', value: 'Servicio se mapeo de finca, inventario de fincas y conteo de plantas de piña' },
    { label: 'Servicio de monitoreo de maquinaria agrícola', value: 'Servicio de monitoreo de maquinaria agrícola' }
  ];

  const estados = [
    { label: 'Sin iniciar', value: 'Sin iniciar' },
    { label: 'En proceso', value: 'En proceso' },
    { label: 'Finalizado', value: 'Finalizado' }
  ];

  console.log('Servicio:', servicio);
  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario">
          <div className="columna">
            <h1>Detalle del Servicio</h1>
            {location.pathname === '/tecnico/modificar/servicios-detalle' ? (
              <div className="input-contenedor">
                <select className="dropdown" value={Cliente} onChange={(e) => setCliente(e.target.value)}>
                  <option value="">Seleccione un cliente</option>
                  {Clientes.map((cliente, index) => (
                    <option key={index} value={cliente.value}>
                      {cliente.label + " - " + cliente.value}
                    </option>
                  ))}
                </select>
                <select className="dropdown" value={TipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
                  <option value="">Seleccione el tipo de servicio</option>
                  {tipos.map((tipo, index) => (
                    <option key={index} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                <input type="text" value={servicio.Area} placeholder="Área (tamaño)" onChange={(e) => setArea(e.target.value)} />
                <input type="text" value={servicio.Costo} placeholder="Costo" onChange={(e) => setCosto(e.target.value)} />
                <input type="text" value={servicio.Cultivo} placeholder="Cultivo" onChange={(e) => setCultivo(e.target.value)} />
                <input type="text" value={servicio.Descripcion} placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
                <input type="text" value={servicio.Dron} placeholder="Dron utilizado" onChange={(e) => setDron(e.target.value)} />
                <select className="dropdown" value={Estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="">Seleccione un estado</option>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
                <input type="date" value={servicio.FechaInicio} title="Fecha inicio" onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={servicio.FechaFin} title="Fecha fin" onChange={(e) => setFechaFin(e.target.value)} />
              </div>
            ) : (
              <div>
                <p>Cedula cliente: {servicio.Cliente}</p>
                <p>Tipo de servicio: {servicio.Tipo}</p>
                <p>Área: {servicio.Area}</p>
                <p>Costo: {servicio.Costo}</p>
                <p>Cultivo: {servicio.Cultivo}</p>
                <p>Descripción: {servicio.Descripcion}</p>
                <p>Dron utilizado: {servicio.Dron}</p>
                <p>Estado: {servicio.Estado}</p>
                <p>Fecha inicio: {servicio.FechaInicio}</p>
                <p>Fecha fin: {servicio.FechaFin}</p>
              </div>
            )}
            <div className="contenedor-botones" >
              {location.pathname === '/tecnico/modificar/servicios-detalle' ? (
                <>
                  <button className="btn_principal" style={{ marginBottom: '-3px', marginTop: '-10px'}} onClick={modificarServicio}>Modificar</button>
                  <button className="btn_principal" style={{ marginBottom: '-2px', marginTop: '10px'}} onClick={eliminarServicio}>Eliminar</button>
                </>
              ) : (
                <button className="btn_principal" onClick={navegarServicios}>Atrás</button>
              )}
              <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la Página Principal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleServicio;