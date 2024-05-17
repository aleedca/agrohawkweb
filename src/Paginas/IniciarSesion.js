import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import firestore from '../Firebase/firebase';
import LogoAgro from '../Assets/LogoAgro.png';
import '../App.css';

function IniciarSesion() {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navegar = useNavigate();

    const iniciarSesion = async () => {
        try {
            // Realizar una consulta para verificar si el usuario existe en Firestore
            const usuariosRef = collection(firestore, 'Usuarios');
            const q = query(usuariosRef, where('Email', '==', Email), where('Password', '==', Password));
            const querySnapshot = await getDocs(q);

            // Verificar si se encontró algún usuario con las credenciales proporcionadas
            if (querySnapshot.docs.length > 0) {
                const usuario = querySnapshot.docs[0].data();
                // Verificar el rol del usuario y redirigirlo según corresponda
                navegar(`/${usuario.Rol}/pagina-principal`, { state: { Rol: usuario.Rol } });
            } else {
                setError('Credenciales incorrectas');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión, por favor intenta de nuevo');
        }
    };

    const navegarRegistrarCuenta = () => {
        navegar('/registrarCuenta');
    };

    return (
        <div className="fondo-principal">
            <div className="contenedor">
                <div className="contenedor-primario">

                    <h1>Iniciar Sesión</h1>
                    <body>Ingrese los datos de su cuenta</body>
                    <div style={{ margin: '30px' }}></div>
                    <div className="input-contenedor">
                        <FaUser className="icono" />
                        <input type="text" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-contenedor">
                        <FaLock className="icono" />
                        <input type="password" placeholder="Contraseña" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div style={{ margin: '10px' }}></div>
                    <div>
                        <button className="btn_principal" onClick={iniciarSesion}>Iniciar Sesión</button>
                        <button className="btn_secundario" onClick={navegarRegistrarCuenta}>Registrarse</button>
                    </div>
                </div>
            </div>
            <div className="logo-container">
                <img src={LogoAgro} alt="Logo" />
            </div>
        </div>
    );
}

export default IniciarSesion;
