import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firestore from '../Firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { tiposServicios, estados, tiposCosto, opcionesContrato } from '../Utils/Data';
import '../App.css';

function RegistrarServicios() {
  const location = useLocation();
  const rol = location.state.Rol;
  const navegar = useNavigate();

  const [TipoServicio, setTipoServicio] = useState('');
  const [Hectareas, setHectareas] = useState('');
  const [Costo, setCosto] = useState('');
  const [TipoCosto, setTipoCosto] = useState('');
  const [Cultivo, setCultivo] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Dron, setDron] = useState('');
  const [Piloto, setPiloto] = useState('');
  const [Cliente, setCliente] = useState('');
  const [Clientes, setClientes] = useState([]);
  const [Estado, setEstado] = useState('');
  const [FechaInicio, setFechaInicio] = useState('');
  const [FechaFin, setFechaFin] = useState('');
  const [Contrato, setContrato] = useState('');
  const [CantidadContrato, setCantidadContrato] = useState('');
  const [Periodicidad, setPeriodicidad] = useState('');

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

  const registrarServicio = async () => {
    // Validar los campos de entrada
    if (!TipoServicio || !Hectareas || !Costo || !Cultivo || !Descripcion || !Dron || !Estado || !Cliente || !FechaInicio || !FechaFin || !Periodicidad || !TipoCosto || !Piloto || !Contrato) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validar que la cantidad de contrato sea mayor a 0 si el servicio es un contrato
    if (Contrato === "Sí" && !CantidadContrato) {
      alert('Por favor, completa la cantidad de días del contrato.');
      return;
    }

    // Validar las fechas
    if (new Date(FechaInicio) >= new Date(FechaFin)) {
      alert('La fecha de fin debe ser mayor que la fecha de inicio.');
      return;
    }

    // Validar que la fecha de fin no sea mayor a la fecha actual si el estado es finalizado

    console.log(CantidadContrato);

    try {
      const datosServicio = {
        TipoServicio,
        Hectareas,
        Costo,
        TipoCosto,
        Cultivo,
        Descripcion,
        Dron,
        Piloto,
        Estado,
        Cliente,
        FechaInicio,
        FechaFin,
        Contrato,
        Periodicidad,
        CantidadContrato
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
              <select className="dropdown" value={Cliente} onChange={(e) => setCliente(e.target.value)}>
                <option value="">Seleccione un cliente</option>
                {Clientes.map((cliente, index) => (
                  <option key={index} value={cliente.value}>
                    {cliente.label}
                  </option>
                ))}
              </select>
              <select className="dropdown" value={TipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
                <option value="">Seleccione el tipo de servicio</option>
                {tiposServicios.map((tipo, index) => (
                  <option key={index} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
              <div className="fila">
                <select className="dropdown" value={TipoCosto} onChange={(e) => setTipoCosto(e.target.value)}>
                  <option value="">Seleccione una moneda</option>
                  {tiposCosto.map((tipo, index) => (
                    <option key={index} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                <input type="text" value={Costo} placeholder="Costo" onChange={(e) => setCosto(e.target.value)} />
              </div>
              <div className="fila">
                <input type="text" value={Cultivo} placeholder="Cultivo" onChange={(e) => setCultivo(e.target.value)} />
                <input type="text" value={Descripcion} placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
              </div>
              <div className="fila">
                <input type="text" value={Dron} placeholder="Matrícula del drone" onChange={(e) => setDron(e.target.value)} />
                <input type="text" value={Piloto} placeholder="Piloto del drone" onChange={(e) => setPiloto(e.target.value)} />
              </div>
              <div className="fila">
                <input type="text" value={Hectareas} placeholder="Hectáreas" onChange={(e) => setHectareas(e.target.value)} />
                <select className="dropdown" value={Estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="">Seleccione un estado</option>
                  {estados.map((estado, index) => (
                    <option key={index} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fila">
                <input type="date" value={FechaInicio} title="Fecha inicio" onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={FechaFin} title="Fecha fin" onChange={(e) => setFechaFin(e.target.value)} />
                <input type="number" min="0" value={Periodicidad} placeholder="Periodicidad por semana" onChange={(e) => setPeriodicidad(e.target.value)} />
              </div> <br />
              <label style={{ fontSize: '14px' }}> ¿El servicio es un contrato? </label>
              <div className="fila">
                <select className="dropdown" value={Contrato} onChange={(e) => {
                  setContrato(e.target.value);
                  if (e.target.value === 'No') {
                    setCantidadContrato("0");
                  }
                }}>
                  <option value="">Seleccione una opción</option>
                  {opcionesContrato.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
                {Contrato === "Sí" && (
                  <input type="number" min="0" value={CantidadContrato} placeholder="Cantidad en días" onChange={(e) => setCantidadContrato(e.target.value)} />
                )}
              </div>
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