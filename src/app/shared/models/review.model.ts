// Modelo que representa una reseña de una reserva
// Se usará en componentes de review y en el servicio correspondiente
export interface Review {
    id?: number;                // ID de la reseña
    reservation_code: string;   // Código de 4 dígitos de la reserva asociada
    rating: number;             // Puntuación de 1 a 5
    comment: string;            // Comentario obligatorio (máx 500 caracteres)
    created_at?: string;        // Fecha de creación (ISO string)
}
