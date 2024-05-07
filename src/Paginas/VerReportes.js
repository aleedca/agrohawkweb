import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function VerReportes() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navigate = useNavigate();

    const navegarMenu = () => {
        navigate('/analista/pagina-principal', { state: { Rol: rol } });
    }

    const reportes = [
        ];

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Analista</h1>
                        <body>Seleccione un reporte??</body><br /><br />
                        <div className="contenedor-items">
                            <ul>
                                {reportes.length > 0 ? (
                                    reportes.map(reporte => (
                                        <li key={reporte.value}>
                                            {reporte.label}
                                        </li>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: 'red', margin: '0px'}}>No hay reportes existentes</p>
                                )}
                            </ul>
                        </div>
                        <div className="contenedor-botones">
                            <button className="btn_secundario" onClick={navegarMenu}>Volver a la Página Principal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerReportes;