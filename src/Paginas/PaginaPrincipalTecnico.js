import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function TecnicoPaginaPrincipal() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const navegarIniciarSesion = () => {
        //Validar se realice el cierre de sesion
        navegar('/');
    };

    const navegarBuscarServicio = () => {
        navegar(`/${rol}/buscar-servicios`, { state: { Rol: rol } });
    };

    const navegarRegistrarServicio = () => {
        navegar('/tecnico/registrar-servicio', { state: { Rol: rol } });
    };

    const navegarModificarServicio = () => {
        navegar('/tecnico/modificar-servicio');
    };

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Técnico</h1>
                        <body>Página Principal</body>
                        <div className='contenedor-botones'>
                            <button className="btn_verde" onClick={navegarBuscarServicio}>Buscar Servicio</button>
                            <button className="btn_verde" onClick={navegarRegistrarServicio}>Registrar Servicio</button>
                            <button className="btn_verde" onClick={navegarModificarServicio}>Modificar Servicio</button>
                            <button className="btn_rojo" onClick={navegarIniciarSesion}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TecnicoPaginaPrincipal;
