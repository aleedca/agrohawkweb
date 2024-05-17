// Eve esta aqui
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoAgro from '../Assets/LogoAgro.png';
import '../App.css';

function AdminPaginaPrincipal() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const navegarIniciarSesion = () => {
        //Validar se realice el cierre de sesion
        navegar('/');
    };

    const navegarRegistrarCliente = () => {
        navegar(`/${rol}/registrar-cliente`, { state: { Rol: rol } });
    };

    const navegarBuscarCliente = () => {
        navegar(`/${rol}/buscar-cliente`, { state: { Rol: rol } });
    };

    const navegarBuscarServicio = () => {
        navegar(`/${rol}/buscar-servicios`, { state: { Rol: rol } });
    };

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Administrador</h1>
                        <body>Página Principal</body>
                        <div className='contenedor-botones'>
                            <button className="btn_verde" onClick={navegarBuscarCliente}>Buscar Cliente</button>
                            <button className="btn_verde" onClick={navegarRegistrarCliente}>Registrar Cliente</button>
                            <button className="btn_verde" onClick={navegarBuscarServicio}>Buscar Servicio</button>
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

export default AdminPaginaPrincipal;
