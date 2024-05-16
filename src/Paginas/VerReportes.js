import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firestore from '../Firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';

function VerReportes() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navigate = useNavigate();

    const [reportes, setReportes] = useState([]);
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    useEffect(() => {
        cargarReportes();
    }, []);

    const navegarMenu = () => {
        navigate('/analista/pagina-principal', { state: { Rol: rol } });
    }

    const navegarDetalleReporte = (reporte) => {
        navigate('/analista/reportes-detalle', { state: { Rol: rol, reporte: reporte } });
    }

    const cargarReportes = async () => {
        const reportesCollection = collection(firestore, 'Reportes');
        const reportesSnapshot = await getDocs(reportesCollection);
        const reportesList = reportesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReportes(reportesList);
    };

    const reportesFiltrados = reportes.filter(reporte => {
        if (!mesSeleccionado) return true;
        const mesReporte = Number(reporte.Fecha.split('-')[1]);
        return mesReporte === Number(mesSeleccionado);
    });

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Analista</h1>
                        <body style={{ margin: 0 }}>Seleccione un reporte</body><br /><br />
                        <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
                            <option value="">Todos los meses</option>
                            {meses.map((mes, index) => (
                                <option key={index} value={index + 1}>{mes}</option>
                            ))}
                        </select>
                        <div className="contenedor-items">
                            <ul>
                                {reportesFiltrados.length > 0 ? (
                                    reportesFiltrados.map(reporte => (
                                        <li key={reporte.id} onClick={() => navegarDetalleReporte(reporte)}>
                                            Reporte: {reporte.NombreReporte} ({reporte.Fecha})
                                        </li>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: 'red', background: 'none', border: 'none', marginBottom: '50px', marginTop: '70px'}}>No hay reportes existentes</p>
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