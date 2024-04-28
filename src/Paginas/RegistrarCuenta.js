import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import firestore from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

function RegistrarCuenta() {
    const [Nombre, setNombre] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Rol, setRol] = useState('');
    const navegar = useNavigate();

    const navegarIniciarSesion = () => {
        navegar('/');
    };

    const registrarUsuario = async () => {
        try {
            if (!Nombre || !Apellidos || !Email || !Password || !Rol) {
                alert("Por favor, rellene todos los campos.");
                return;
            } else {
                const datosUsuario = {
                    Nombre,
                    Apellidos,
                    Email,
                    Password,
                    Rol
                };
                const docRef = await addDoc(collection(firestore, 'Usuarios'), datosUsuario);
                console.log('Documento insertado con ID: ', docRef.id);
                alert("Cuenta agregada con éxito");
                navegar('/');
            }
        } catch (error) {
            console.error('Error al insertar el documento: ', error);
        }
    };

    return (
        <div className="fondo-principal">
            <div className="contenedor">
                <h1>Registrar cuenta usuario</h1>
                <body>Ingrese los datos solicitados para el registro</body>

                <div className="contenedor-secundario">
                    <div className="columna">
                        <div className="input-contenedor">
                            <FaUser className="icono" />
                            <input type="text" placeholder="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaEnvelope className="icono" />
                            <input type="text" placeholder="Correo electrónico" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="columna">
                        <div className="input-contenedor">
                            <FaUser className="icono" />
                            <input type="text" placeholder="Apellidos" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaLock className="icono" />
                            <input type="password" placeholder="Contraseña" value={Password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '-350px', marginLeft: '40px', marginRight: '40px' }}>
                    {/* Inputs fuera de las columnas */}
                    <body>Seleccione su rol</body>
                    <div className="columna">
                        <div className="contenedor-rol">
                            <input type="radio" id="administrador" name="rol" value="administrador" checked={Rol === 'administrador'} onChange={() => setRol('administrador')} />
                            <label htmlFor="administrador">Administrador </label>

                            <input type="radio" id="analista" name="rol" value="analista" checked={Rol === 'analista'} onChange={() => setRol('analista')} />
                            <label htmlFor="analista">Analista </label>

                            <input type="radio" id="tecnico" name="rol" value="tecnico" checked={Rol === 'tecnico'} onChange={() => setRol('tecnico')} />
                            <label htmlFor="tecnico">Técnico </label>
                        </div>
                    </div>
                </div>
                <div className="contenedor-botones" style={{ marginBottom: '20px' }}>
                    <button className="btn_principal" onClick={registrarUsuario}>Registrarse</button>
                    <button className="btn_secundario" onClick={navegarIniciarSesion}>Volver a la página principal</button>
                </div>
            </div>
        </div>
    );
}

export default RegistrarCuenta;
