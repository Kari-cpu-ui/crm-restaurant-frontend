import { Injectable } from '@angular/core';
import { Reserva } from '../../shared/models/reserva.model'; // Modelo de reserva
@Injectable({
  providedIn: 'root',
})
export class ReservaService  {
  reservas: Reserva[] = []; // Arreglo nombre resevas

  constructor() {}
  
  
  // TODO: implementar crear reserva
  // TODO: implementar ver reservas del usuario
  // TODO: implementar cancelar reserva
}
