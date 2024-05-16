export function formatearFecha(fecha) {
    fecha = new Date(fecha);
    let year = fecha.getFullYear();
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript empiezan en 0
    let day = ("0" + fecha.getDate()).slice(-2);
    return (`${day}-${month}-${year}`);
}