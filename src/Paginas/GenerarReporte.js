import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatearFecha } from '../Utils/Funciones';
import firestore from '../Firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../App.css';

function GenerarReporte() {
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    const [NombreReporte, setNombreReporte] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Clientes, setClientes] = useState([]);
    const [Servicios, setServicios] = useState([]);

    useEffect(() => {
        cargarClientes();
        cargarServicios();
    }, []);

    const navegarMenu = () => {
        navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
    }

    const cargarClientes = async () => {
        const clientesCollection = collection(firestore, 'Clientes');
        const clientesSnapshot = await getDocs(clientesCollection);
        const clientesList = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClientes(clientesList);
    };

    const cargarServicios = async () => {
        const serviciosCollection = collection(firestore, 'Servicios');
        const serviciosSnapshot = await getDocs(serviciosCollection);
        const serviciosList = serviciosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServicios(serviciosList);
    };

    const calcularTop3Clientes = async () => {
        // Cargar los clientes y servicios
        let conteoServiciosPorCliente = new Map();
        for (let servicio of Servicios) {
            let conteo = conteoServiciosPorCliente.get(servicio.Cliente) || 0;
            conteoServiciosPorCliente.set(servicio.Cliente, conteo + 1);
        }

        // Convertir en array y ordenar
        let paresClienteConteo = Array.from(conteoServiciosPorCliente);
        paresClienteConteo.sort((a, b) => b[1] - a[1]);

        // Tomar los primeros tres y devolver los datos del cliente
        let top3Clientes = paresClienteConteo.slice(0, 3).map(([cedula, conteo]) => {
            let cliente = Clientes.find(cliente => cliente.Cedula === cedula);
            if (!cliente) {
                console.error(`No se encontró ningún cliente con la cédula ${cedula}`);
                return null;
            }
            return { nombre: cliente.Nombre + " " + cliente.Apellidos, cedula: cliente.Cedula, conteo };
        }).filter(cliente => cliente !== null);

        return top3Clientes;
    };

    const calcularTop3Drones = async () => {
        // Cargar los servicios
        let conteoServiciosPorDrone = new Map();
        for (let servicio of Servicios) {
            let conteo = conteoServiciosPorDrone.get(servicio.Dron) || 0;
            conteoServiciosPorDrone.set(servicio.Dron, conteo + 1);
        }

        // Convertir en array y ordenar
        let paresDroneConteo = Array.from(conteoServiciosPorDrone);
        paresDroneConteo.sort((a, b) => b[1] - a[1]);

        // Tomar los primeros tres y devolver los datos del drone
        let top3Drones = paresDroneConteo.slice(0, 3).map(([matricula, conteo]) => {
            let servicio = Servicios.find(servicio => servicio.Dron === matricula);
            if (!servicio) {
                console.error(`No se encontró ningún servicio con el drone matricula ${matricula}`);
                return null;
            }
            return { matricula, conteo };
        }).filter(drone => drone !== null);

        return top3Drones;
    }

    const calcularHectareasFumigadas = async () => {
        let hectareasTotales = 0;
        let serviciosFinalizados = 0;
        for (let servicio of Servicios) {
            if (servicio.Estado === 'Finalizado') {
                hectareasTotales += parseInt(servicio.Hectareas, 10);
                serviciosFinalizados++;
            }
        }

        if (serviciosFinalizados === 0) {
            return 0;
        }

        let promedioHectareas = hectareasTotales / serviciosFinalizados;
        return { total: hectareasTotales, promedio: promedioHectareas };
    }

    const calcularCostos = async () => {
        let costoTotalDolares = 0;
        let costoTotalColones = 0;
        let serviciosFinalizados = 0;
        for (let servicio of Servicios) {
            if (servicio.Estado === 'Finalizado') {
                if (servicio.TipoCosto === 'Dólares') {
                    costoTotalDolares += parseInt(servicio.Costo, 10);
                } else if (servicio.TipoCosto === 'Colones') {
                    costoTotalColones += parseInt(servicio.Costo, 10);
                }
                serviciosFinalizados++;
            }
        }

        if (serviciosFinalizados === 0) {
            throw new Error('No hay servicios finalizados');
        }

        let promedioCostoDolares = costoTotalDolares / serviciosFinalizados;
        let promedioCostoColones = costoTotalColones / serviciosFinalizados;
        return { promedioDolares: promedioCostoDolares, promedioColones: promedioCostoColones };
    };

    const calcularServicios = () => {
        let serviciosSinIniciar = 0;
        let serviciosEnProceso = 0;
        let serviciosFinalizados = 0;
        let frecuenciaTipos = {};

        for (let servicio of Servicios) {
            switch (servicio.Estado) {
                case 'Sin iniciar':
                    serviciosSinIniciar++;
                    break;
                case 'En proceso':
                    serviciosEnProceso++;
                    break;
                case 'Finalizado':
                    serviciosFinalizados++;
                    break;
                default:
                    console.warn(`Estado de servicio desconocido: ${servicio.Estado}`);
                    break;
            }

            if (servicio.Estado === 'Finalizado') {
                if (!frecuenciaTipos[servicio.TipoServicio]) {
                    frecuenciaTipos[servicio.TipoServicio] = 0;
                }
                frecuenciaTipos[servicio.TipoServicio]++;
            }
        }

        let tipoMasFrecuente = Object.keys(frecuenciaTipos).reduce((a, b) => frecuenciaTipos[a] > frecuenciaTipos[b] ? a : b);

        return {
            sinIniciar: serviciosSinIniciar,
            enProceso: serviciosEnProceso,
            finalizados: serviciosFinalizados,
            tipoMasFrecuente: tipoMasFrecuente
        };
    };


    const generarReporte = async () => {
        if (!NombreReporte) {
            alert('Por favor, asigne por lo menos el nombre del reporte');
            return;
        }

        let clientes = await calcularTop3Clientes();
        let drones = await calcularTop3Drones();
        let hectareasFumigadas = await calcularHectareasFumigadas();
        let costos = await calcularCostos();
        let servicios = calcularServicios();

        const reporte = {
            NombreReporte,
            Descripcion,
            Fecha: formatearFecha(new Date()),
            Top3Clientes: clientes,
            Top3Drones: drones,
            HectareasFumigadas: hectareasFumigadas,
            Costos: costos,
            Servicios: servicios
        };

        // Guardar el reporte en la base de datos
        await addDoc(collection(firestore, 'Reportes'), reporte);
        alert("Reporte generado con éxito");
    }

    return (
        <div className="fondo-secundario">
            <div className="contenedor">
                <div className="contenedor-secundario">
                    <div className="columna">
                        <h1>Generar reporte</h1><br />
                        <body>Ingrese los datos del reporte</body><br />
                        <div className="input-contenedor">
                            <input type="text" value={NombreReporte} placeholder="Ingrese el nombre del reporte" onChange={(e) => setNombreReporte(e.target.value)} /><br />
                            <textarea value={Descripcion} placeholder="Ingrese la descripción del reporte" onChange={(e) => setDescripcion(e.target.value)} /><br />
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