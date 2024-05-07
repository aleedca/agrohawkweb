export function formatearFecha (fecha) {
    const fechaFormateada = new Date(fecha);
    return (fechaFormateada.getDate() + 1) + '/' + (fechaFormateada.getMonth() + 1) + '/' + fechaFormateada.getFullYear();
}