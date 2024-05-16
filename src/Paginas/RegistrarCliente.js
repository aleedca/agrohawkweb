import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaAddressCard, FaHouseUser, FaPhone } from 'react-icons/fa';
import firestore from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function RegistrarCuenta() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const [Nombre, setNombre] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Cedula, setCedula] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Email, setEmail] = useState('');
    const [Direccion, setDireccion] = useState('');

    const navegarPaginaPrincipal = () => {
        navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
    };

    const registrarCliente = async () => {
        // Validar los campos de entrada
        if (!Nombre || !Apellidos || !Cedula || !Telefono || !Email || !Direccion) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const datosCliente = {
                Nombre,
                Apellidos,
                Cedula,
                Telefono,
                Email,
                Direccion
            };
            const docRef = await addDoc(collection(firestore, 'Clientes'), datosCliente);
            console.log('Documento insertado con ID: ', docRef.id);
            setNombre('');
            setApellidos('');
            setCedula('');
            setTelefono('');
            setEmail('');
            setDireccion('');
            alert("Cliente registrado con éxito");
            navegarPaginaPrincipal();
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-terciario">
                    <div className="columna">
                        <h1 style={{ marginTop: "30px" }}>Administrador</h1>
                        <body>Registrar Cliente</body><br />
                        <div className="input-contenedor">
                            <FaUser className="icono" />
                            <input type="text" placeholder="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaUser className="icono" />
                            <input type="text" placeholder="Apellidos" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaAddressCard className="icono" />
                            <input type="text" placeholder="Cédula" value={Cedula} onChange={(e) => setCedula(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaPhone className="icono" />
                            <input type="text" placeholder="Número de teléfono" value={Telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaEnvelope className="icono" />
                            <input type="text" placeholder="Correo electrónico" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-contenedor">
                            <FaHouseUser className="icono" />
                            <input type="text" placeholder="Dirección" value={Direccion} onChange={(e) => setDireccion(e.target.value)} />
                        </div>

                        <div className="contenedor-botones" style={{ marginBottom: '20px' }}>
                            <button className="btn_principal" onClick={registrarCliente}>Registrar Cliente</button>
                            <button className="btn_secundario" onClick={navegarPaginaPrincipal}>Volver a la página principal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrarCuenta;
