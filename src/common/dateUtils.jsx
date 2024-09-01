export function getDate(localDateTimeString) {
    const date = new Date(localDateTimeString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('es-ES', options);
}