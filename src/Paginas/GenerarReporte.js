import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tiposReportes } from '../Utils/Data';
import '../App.css';

function GenerarReporte() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const navegarMenu = () => {
        navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
    }

    const generarReporte = () => {
        //hay que generarlo
        alert("Reporte generado con éxito");
    }

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Generar reporte</h1><br />
                        <div className="input-contenedor">
                            <input type="text" placeholder="Ingrese el nombre del reporte" /><br />
                            <select className="dropdown" type="text" placeholder="Seleccione el tipo de reporte"><br />
                                <option value="0">Seleccione el tipo de reporte</option>
                                {tiposReportes.map((tipo, index) => (
                                    <option key={index} value={tipo.value}>
                                        {tipo.label}
                                    </option>
                                ))}
                            </select><br />
                            <textarea placeholder="Ingrese la descripción del reporte" /><br />
                        </div>
                        <div className="contenedor-botones">
                            <button className="btn_principal" onClick={generarReporte}>Generar Reporte</button>
                            <button className="btn_secundario" onClick={navegarMenu}>Volver a la Página Principal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerarReporte;