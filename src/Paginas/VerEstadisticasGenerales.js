import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import firestore from "../Firebase/firebase";
import Chart from "chart.js/auto";
import LogoAgro from '../Assets/LogoAgro.png';
import "../App.css";

const VerEstadisticasGenerales = () => {
    const [reportes, setReportes] = useState([]);
    const [informacionGeneral, setInformacionGeneral] = useState(null);
    const location = useLocation();
    const rol = location.state.Rol;
    const navegar = useNavigate();

    useEffect(() => {
        cargarReportes();
    }, []);

    const cargarReportes = async () => {
        const reportesCollection = collection(firestore, "Reportes");
        const reportesSnapshot = await getDocs(reportesCollection);
        const reportesList = reportesSnapshot.docs.map((doc) => doc.data());
        setReportes(reportesList);
        calcularInformacionGeneral(reportesList);
    };

    const calcularInformacionGeneral = (reportes) => {
        let totalClientes = 0;
        let totalDrones = 0;
        let totalHectareas = 0;
        let totalCostos = 0;
        let totalServicios = 0;

        reportes.forEach((reporte) => {
            totalClientes += reporte.Top3Clientes.length;
            totalDrones += reporte.Top3Drones.length;
            totalHectareas += reporte.HectareasFumigadas.total;
            totalCostos +=
                reporte.Costos.promedioColones + reporte.Costos.promedioDolares;
            totalServicios += reporte.Servicios.finalizados;
        });

        setInformacionGeneral({
            totalClientes,
            totalDrones,
            totalHectareas,
            totalCostos,
            totalServicios,
        });
    };

    const generarGraficos = () => {
        const labels = ["Clientes", "Drones", "Hectáreas", "Costos", "Servicios"];
    
        // Generar gráficos individuales para cada reporte
        reportes.forEach((reporte, index) => {
            const data = [
                reporte.Top3Clientes.length,
                reporte.Top3Drones.length,
                reporte.HectareasFumigadas.total,
                reporte.Costos.promedioColones + reporte.Costos.promedioDolares,
                reporte.Servicios.finalizados,
            ];
            const chartConfigs = generarConfiguracionesGrafico(index, labels, data);
            renderizarGraficos(chartConfigs);
        });
    
        // Generar gráficos para la información general
        if (informacionGeneral) {
            const data = [
                informacionGeneral.totalClientes,
                informacionGeneral.totalDrones,
                informacionGeneral.totalHectareas,
                informacionGeneral.totalCostos,
                informacionGeneral.totalServicios,
            ];
            const chartConfigs = generarConfiguracionesGrafico("General", labels, data);
            renderizarGraficos(chartConfigs);
        }
    };
    
    const generarConfiguracionesGrafico = (index, labels, data) => {
        return [
            {
                type: "bar",
                elementId: `chartBar${index}`,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Cantidad",
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.5)",
                                "rgba(54, 162, 235, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(153, 102, 255, 0.5)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: getChartOptions(),
            },
            {
                type: "line",
                elementId: `chartLine${index}`,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Cantidad",
                            data: data,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                },
                options: getChartOptions(),
            },
            {
                type: "pie",
                elementId: `chartPie${index}`,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Cantidad",
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.5)",
                                "rgba(54, 162, 235, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(153, 102, 255, 0.5)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: getChartOptions(),
            },
        ];
    };
    
    const renderizarGraficos = (chartConfigs) => {
        chartConfigs.forEach((config) => {
            const canvas = document.getElementById(config.elementId);
            const ctx = canvas.getContext("2d");
            new Chart(ctx, config);
        });
    };
    
    const getChartOptions = () => {
        return {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    type: "logarithmic",
                    ticks: {
                        callback: function (value, index, values) {
                            if (value === 10 || value === 100 || value === 1000 || value === 10000) {
                                return value;
                            }
                            return null;
                        },
                    },
                },
            },
        };
    };
    
    useEffect(() => {
        generarGraficos();
    }, [reportes, informacionGeneral]);
    
    const navegarMenu = () => {
        navegar(`/${rol}/pagina-principal`, { state: { Rol: rol } });
    }

    return (
        <div className="fondo-secundario">
            <div className="contenedor" style={{ overflowY: 'scroll', height: '90%' }}>
                <div style={{ display: "flex", marginTop: "1200px", alignItems: "center" }}></div>
                <div style={{ display: "flex", flexDirection: "Column", alignItems: "center" }}>
                    {informacionGeneral && (
                        <div style={{ marginBottom: "60px", width: "100%" }}>
                            <h1>Información General</h1>
                            <body  style={{marginTop:'4px'}} >Métricas de todos los reportes generados</body>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico de Barras General</h4>
                                    <canvas id="chartBarGeneral" width="400" height="400"></canvas>
                                </div>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico Lineal General</h4>
                                    <canvas id="chartLineGeneral" width="400" height="400"></canvas>
                                </div>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico Circular General</h4>
                                    <canvas id="chartPieGeneral" width="400" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    )}
                    {reportes.map((reporte, index) => (
                        <div key={index} style={{ marginBottom: "60px", width: "100%" }}>
                            
                            <h3>{reporte.NombreReporte}</h3>
                            <body style={{marginTop:'4px'}}>Métrica por reporte de manera individual</body>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico de Barras</h4>
                                    <canvas id={`chartBar${index}`} width="400" height="400"></canvas>
                                </div>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico Lineal</h4>
                                    <canvas
                                        id={`chartLine${index}`}
                                        width="400"
                                        height="400"
                                    ></canvas>
                                </div>
                                <div style={{ flex: 1, margin: "20px" }}>
                                    <h4>Gráfico Circular</h4>
                                    <canvas id={`chartPie${index}`} width="400" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="contenedor-botones" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                <button className="btn_secundario" onClick={navegarMenu}>Volver a la Página Principal</button>
            </div>
            <div className="logo-container">
                <img src={LogoAgro} alt="Logo" />
            </div>
        </div>
    );
};

export default VerEstadisticasGenerales;
