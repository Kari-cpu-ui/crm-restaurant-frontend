import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

export interface Review {
  comment: string;
  bookingId: string;
}

@Component({
  selector: 'app-review',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent {

  newComment = signal('');
  newBookingId = signal('');

  readonly reviews = signal<Review[]>([
    { comment: 'Muy buen servicio, todo perfecto.', bookingId: 'RES-1001' },
    { comment: 'La comida estaba muy rica y el servicio fue excelente.', bookingId: 'RES-1002' },
    { comment: 'La cocción de la carne fue perfecta', bookingId: 'RES-1003' },
  ]);

  addReview(): void {
    const comment = this.newComment() && this.newComment().trim();
    const bookingId = this.newBookingId() && this.newBookingId().trim();
    if (!comment || !bookingId) return;
    this.reviews.update(list => [...list, { comment, bookingId }]);
    this.newComment.set('');
    this.newBookingId.set('');
  }
}
