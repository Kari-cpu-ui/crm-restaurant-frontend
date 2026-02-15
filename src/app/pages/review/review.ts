import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Review } from '../../shared/models/review.model';

@Component({
  selector: 'app-review',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent {

  newComment = signal('');
  newReservationId = signal<number | null>(null);
  newRating = signal<number>(0);

  readonly reviews = signal<Review[]>([
    { id: 1, reservation_id: 1001, rating: 5, comment: 'Muy buen servicio, todo perfecto.', created_at: '2026-02-10T12:00:00' },
    { id: 2, reservation_id: 1002, rating: 4, comment: 'La comida estaba muy rica y el servicio fue excelente.', created_at: '2026-02-11T14:30:00' },
    { id: 3, reservation_id: 1003, rating: 5, comment: 'La cocción de la carne fue perfecta', created_at: '2026-02-12T20:00:00' },
  ]);

  setRating(value: number): void {
    this.newRating.set(value);
  }

  addReview(): void {
    const comment = this.newComment()?.trim();
    const reservationId = this.newReservationId();
    const rating = this.newRating();
    if (!comment || !reservationId || rating < 1 || rating > 5) return;

    const review: Review = {
      reservation_id: reservationId,
      rating,
      comment,
      created_at: new Date().toISOString(),
    };

    this.reviews.update(list => [...list, review]);
    this.newComment.set('');
    this.newReservationId.set(null);
    this.newRating.set(0);
  }
}
