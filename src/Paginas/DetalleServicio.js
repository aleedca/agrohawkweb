import React, { useEffect, useState } from 'react';
import firestore from '../Firebase/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import '../App.css';

function DetalleServicio() {
  const location = useLocation();
  const rol = location.state.Rol;
  const servicio = location.state.servicio; // Obtener el objeto del servicio de la ubicación
  const navegar = useNavigate();

  const [TipoServicio, setTipoServicio] = useState(servicio.TipoServicio)
  const [Area, setArea] = useState(servicio.Area);
  const [Costo, setCosto] = useState(servicio.Costo);
  const [Cultivo, setCultivo] = useState(servicio.Cultivo);
  const [Descripcion, setDescripcion] = useState(servicio.Descripcion);
  const [Dron, setDron] = useState(servicio.Dron);
  const [Cliente, setCliente] = useState(servicio.cliente);
  const [Clientes, setClientes] = useState([]);
  const [Estado, setEstado] = useState(servicio.Estado);
  const [FechaInicio, setFechaInicio] = useState(servicio.FechaInicio);
  const [FechaFin, setFechaFin] = useState(servicio.FechaFin);

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
    //navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
    navegar(-1, { state: { Rol: rol } });
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

  const modificarServicio = async () => {

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

    const servicioQuery = doc(firestore, "Servicios", servicio.id);

    // Crear un nuevo objeto con los datos originales y los datos actualizados
    const servicioActualizado = {
      TipoServicio: TipoServicio || servicio.TipoServicio,
      Area: Area || servicio.Area,
      Costo: Costo || servicio.Costo,
      Cultivo: Cultivo || servicio.Cultivo,
      Descripcion: Descripcion || servicio.Descripcion,
      Dron: Dron || servicio.Dron,
      Cliente: Cliente || servicio.Cliente,
      Estado: Estado || servicio.Estado,
      FechaInicio: FechaInicio || servicio.FechaInicio,
      FechaFin: FechaFin || servicio.FechaFin
    };

    // Actualizar solo los campos que han cambiado
    await updateDoc(servicioQuery, servicioActualizado);

    alert("Servicio modificado con éxito");
    navegarPaginaPrincipal();
  }

  const eliminarServicio = async () => {
    try {
      const confirmacion = window.confirm("¿Estás seguro que deseas eliminar este servicio?");

      if (confirmacion) {
        const servicioRef = doc(firestore, "Servicios", servicio.id);

        // Eliminar el servicio de la base de datos
        await deleteDoc(servicioRef);

        // Mostrar un mensaje de éxito
        alert("Servicio eliminado con éxito");

        // Redirigir al usuario a la página principal
        navegarPaginaPrincipal();
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      // Mostrar un mensaje de error al usuario
      alert("Error al eliminar el servicio. Por favor, inténtalo de nuevo más tarde.");
    }
  }

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    return (fechaFormateada.getDate() + 1) + '/' + (fechaFormateada.getMonth() + 1) + '/' + fechaFormateada.getFullYear();
  }

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
                <input type="text" value={Area} placeholder="Área (tamaño)" onChange={(e) => setArea(e.target.value)} />
                <input type="text" value={Costo} placeholder="Costo (dólares)" onChange={(e) => setCosto(e.target.value)} />
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
                <input type="date" value={FechaInicio} title="Fecha inicio" onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={FechaFin} title="Fecha fin" onChange={(e) => setFechaFin(e.target.value)} />
              </div>
            ) : (
              <div>
                <p>Cedula cliente: {servicio.Cliente}</p>
                <p>Tipo de servicio: {servicio.TipoServicio}</p>
                <p>Área: {servicio.Area}</p>
                <p>Costo: {servicio.Costo}</p>
                <p>Cultivo: {servicio.Cultivo}</p>
                <p>Descripción: {servicio.Descripcion}</p>
                <p>Dron utilizado: {servicio.Dron}</p>
                <p>Estado: {servicio.Estado}</p>
                <p>Fecha inicio: {formatearFecha(servicio.FechaInicio)}</p>
                <p>Fecha fin: {formatearFecha(servicio.FechaFin)}</p>
              </div>
            )}
            <div className="contenedor-botones" >
              {location.pathname === '/tecnico/modificar/servicios-detalle' ? (
                <div>
                  <button className="btn_principal" style={{ marginBottom: '-3px', marginTop: '-10px'}} onClick={modificarServicio}>Modificar</button>
                  <button className="btn_principal" style={{ marginBottom: '-2px', marginTop: '10px' }} onClick={eliminarServicio}>Eliminar</button>
                  <button className="btn_secundario" onClick={navegarServicios}>Atrás</button>
                </div>
              ) : (
                <div>
                  <button className="btn_principal" onClick={navegarServicios}>Atrás</button>
                  <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la Página Principal</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleServicio;