// Modelo que representa un usuario en la aplicación
// Se usará en servicios y componentes que necesiten datos de usuarios
export interface User {
    id?: number; // ID opcional (BBDD asigna)
    email: string; // Correo del usuario
    role: 'ADMIN' | 'CLIENT'; // Tipo de usuario
}