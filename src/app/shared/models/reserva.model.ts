// Modelo que representa un menú o plato del restaurante
// Se usará en componentes de menú y en el servicio MenuService
export interface Reserva {
    id?: number; // ID de la reserva 
    reservation_code?: string; // Código único de 4 dígitos para el cliente
    time: string; // Hora de la reserva (ej: '14:00')
    customer_name: string; // FK a usuario (string para el backend)
    date: string; // Fecha de la reserva
    guests: number; // Cantidad de personas
    status?: string; // Estado de la reserva (default: 'active')
}

