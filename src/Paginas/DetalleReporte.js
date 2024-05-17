import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoAgro from '../Assets/LogoAgro.png';
import '../App.css';

function DetalleReporte() {
    const location = useLocation();
    const rol = location.state.Rol;
    const reporte = location.state.reporte; 
    const navegar = useNavigate();

    const navegarReportes = () => {
        navegar(`/${rol}/reportes`, { state: { Rol: rol } });
    }

    const eliminarReporte = () => {
        alert("Reporte eliminado con éxito");
        navegarReportes();
    }

    console.log("Reporte: ", reporte);

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-terciario">
                    <h1>Detalle del Reporte <br /> {reporte.Fecha}</h1>
                    <div className="contenedor-scroll">
                        <div className="columna">
                            <div className="input-contenedor">
                                <div className="fila">
                                    <div className="columna-detalle">
                                        <p><strong>Nombre del Reporte:</strong> {reporte.NombreReporte}</p>
                                        <p><strong>Descripción:</strong> {reporte.Descripcion}</p>
                                        <p><strong>Costos:</strong></p>
                                        <ul>
                                            <li>Promedio en Colones: {reporte.Costos.promedioColones}</li>
                                            <li>Promedio en Dólares: {reporte.Costos.promedioDolares}</li>
                                        </ul>
                                        <p><strong>Hectáreas Fumigadas:</strong></p>
                                        <ul>
                                            <li>Promedio: {reporte.HectareasFumigadas.promedio}</li>
                                            <li>Total: {reporte.HectareasFumigadas.total}</li>
                                        </ul>
                                    </div>
                                    <div className="columna-detalle">
                                        <p><strong>Servicios:</strong></p>
                                        <ul>
                                            <li>Finalizados: {reporte.Servicios.finalizados}</li>
                                            <li>En Proceso: {reporte.Servicios.enProceso}</li>
                                            <li>Sin Iniciar: {reporte.Servicios.sinIniciar}</li>
                                            <li>Tipo Más Frecuente: {reporte.Servicios.tipoMasFrecuente}</li>
                                        </ul>
                                        <p><strong>Top 3 Clientes:</strong></p>
                                        <ul>
                                            {reporte.Top3Clientes.map((cliente, index) => (
                                                <li key={index}>
                                                    Nombre: {cliente.nombre}, Cédula: {cliente.cedula}, Conteo: {cliente.conteo}
                                                </li>
                                            ))}
                                        </ul>
                                        <p><strong>Top 3 Drones:</strong></p>
                                        <ul>
                                            {reporte.Top3Drones.map((drone, index) => (
                                                <li key={index}>
                                                    Matrícula: {drone.matricula}, Conteo: {drone.conteo}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-botones">
                        <button className="btn_principal" onClick={eliminarReporte}>Eliminar</button>
                        <button className="btn_secundario" onClick={navegarReportes}>Atrás</button>
                    </div>
                </div>
            </div>
            <div className="logo-container">
                <img src={LogoAgro} alt="Logo" />
            </div>
        </div>
    );
}

export default DetalleReporte;