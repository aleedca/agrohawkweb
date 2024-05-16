import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-terciario">
                    <div className="columna">
                        <h1>Detalle del Reporte <br /> {reporte.Fecha}</h1> <br />
                        
                        <div className="contenedor-botones">
                            <button className="btn_principal" onClick={eliminarReporte}>Eliminar</button>
                            <button className="btn_secundario" onClick={navegarReportes}>Atrás</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleReporte;