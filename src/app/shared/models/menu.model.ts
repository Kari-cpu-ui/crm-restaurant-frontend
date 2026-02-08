// Modelo que representa un menú o plato del restaurante
// Se usará en componentes de menú y en el servicio MenuService
export interface Menu {
    id?: number; // ID del menú
    nombre: string; // Nombre del plato
    descripcion: string; // Descripción del plato
    precio: number; // Precio del plato
    disponible: boolean; // Si el plato está disponible
}
