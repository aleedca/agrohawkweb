import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function DetalleServicio() {
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

  const navegarServicios = () => {
    navegar(`/${rol}/buscar/servicios`, { state: { Rol: rol } });
  };

  const navegarPaginaPrincipal = () => {
    navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
  }

  const modificarServicio = () => {
    alert("Servicio modificado correctamente");
    navegarPaginaPrincipal();
  }

  const eliminarServicio = () => {
    alert("Servicio eliminado correctamente");
    navegarPaginaPrincipal();
  }

  const detalles = {
    tipo: "xxxxxxt",
    area: "xxxxxxa",
    costo: "xxxxxxc",
    cultivo: "xxxxxxcu",
    descripcion: "xxxxxxd",
    dron: "xxxxxxdr",
    estado: "xxxxxxe",
    cedula: "xxxxxxcc",
    fechaInicio: "xxxxxxfi",
    fechaFin: "xxxxxxff"
  };

  return (
    <div className="fondo-secundario">
      <div className="contenedor">
        <div className="contenedor-terciario ">
          <div className="columna">
            <h1>Detalle del Servicio</h1>
            {location.pathname === '/tecnico/modificar/servicios-detalle' ? (
              <div className="input-contenedor">
                <select className="dropdown" value={Cliente} onChange={(e) => setCliente(e.target.value)}>
                  <option value="">Seleccione un cliente</option>
                  {Clientes.map((cliente, index) => (
                    <option key={index} value={cliente.value}>
                      {cliente.label}
                    </option>
                  ))}
                </select>
                <input type="text" value={TipoServicio} placeholder="Tipo de servicio" onChange={(e) => setTipoServicio(e.target.value)} />
                <input type="text" value={Area} placeholder="Área (tamaño)" onChange={(e) => setArea(e.target.value)} />
                <input type="text" value={Costo} placeholder="Costo" onChange={(e) => setCosto(e.target.value)} />
                <input type="text" value={Cultivo} placeholder="Cultivo" onChange={(e) => setCultivo(e.target.value)} />
                <input type="text" value={Descripcion} placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
                <input type="text" value={Dron} placeholder="Dron utilizado" onChange={(e) => setDron(e.target.value)} />
                <input type="date" value={FechaInicio} title="Fecha inicio" onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={FechaFin} title="Fecha fin" onChange={(e) => setFechaFin(e.target.value)} />
              </div>
            ) : (
              <div>
                <p>Cedula cliente: {detalles.cedula}</p>
                <p>Tipo de servicio: {detalles.tipo}</p>
                <p>Área: {detalles.area}</p>
                <p>Costo: {detalles.costo}</p>
                <p>Cultivo: {detalles.cultivo}</p>
                <p>Descripción: {detalles.descripcion}</p>
                <p>Dron utilizado: {detalles.dron}</p>
                <p>Estado: {detalles.estado}</p>
                <p>Fecha inicio: {detalles.fechaInicio}</p>
                <p>Fecha fin: {detalles.fechaFin}</p>
              </div>
            )}
            <div className="contenedor-botones">
              {location.pathname === '/tecnico/modificar/servicios-detalle' ? (
                <>
                  <button className="btn_principal" onClick={modificarServicio}>Modificar</button>
                  <button className="btn_principal" onClick={eliminarServicio}>Eliminar</button>
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