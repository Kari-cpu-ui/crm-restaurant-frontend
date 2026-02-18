// Modelo que representa un usuario en la aplicación
// Se usará en servicios y componentes que necesiten datos de usuarios
export interface User {
    id?: number; // ID opcional (BBDD asigna)
    email: string; // Correo del usuario
    role: 'ADMIN' | 'CLIENT'; // Tipo de usuario
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    userId?: number; // opcional si el backend devuelve el ID del usuario
}

export interface DeleteResponse {
    detail: string;
}
