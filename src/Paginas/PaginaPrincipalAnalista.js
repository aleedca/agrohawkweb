import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoAgro from '../Assets/LogoAgro.png';
import '../App.css';

function AnalistaPaginaPrincipal() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const navegarIniciarSesion = () => {
        //Validar se realice el cierre de sesion
        navegar('/');
    }

    const navegarGenerarReporte = () => {
        navegar(`/${rol}/generar-reporte`, { state: { Rol: rol } });
    }

    const navegarVerEstadisticas = () => {
        navegar(`/${rol}/estadisticas-generales`, { state: { Rol: rol } });
    }

    const navegarVerReportes = () => {
        navegar(`/${rol}/reportes`, { state: { Rol: rol } });
    }

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Analista</h1>
                        <body>Página Principal</body>
                        <div className='contenedor-botones'>
                            <button className="btn_verde" onClick={navegarGenerarReporte}>Generar Reportes</button>
                            <button className="btn_verde" onClick={navegarVerReportes}>Ver Reportes</button>
                            <button className="btn_verde" onClick={navegarVerEstadisticas}>Ver Estadísticas Generales</button>
                            <button className="btn_rojo" onClick={navegarIniciarSesion}>Cerrar sesión</button>
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

export default AnalistaPaginaPrincipal;