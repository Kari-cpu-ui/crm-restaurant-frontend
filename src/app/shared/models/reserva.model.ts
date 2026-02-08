// Modelo que representa un menú o plato del restaurante
// Se usará en componentes de menú y en el servicio MenuService
export interface Reserva {
    id?: number; // ID de la reserva 
    fecha: string; // Fecha y hora de la reserva 
    personas: number; // Número de personas
    mesaId: number; // Número o ID de la mesa
    userId: number; // Usuario que hizo la reserva (opcional)
}