import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../core/services/review';

@Component({
  selector: 'app-review',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent implements OnInit {

  private reviewService = inject(ReviewService);

  newComment = signal('');
  newReservationId = signal<number | null>(null);
  newRating = signal<number>(0);

  readonly reviews = signal<Review[]>([]);

  async loadReviews() {
    const data = await this.reviewService.obtenerReviews();
    this.reviews.set(data);
  }

  async ngOnInit() {
    try {
      await this.loadReviews();
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  }

  setRating(value: number): void {
    this.newRating.set(value);
  }

  async addReview() {
    const comment = this.newComment()?.trim();
    const reservationId = this.newReservationId();
    const rating = this.newRating();
    if (!comment || !reservationId || rating < 1 || rating > 5) return;

    try {
      await this.reviewService.crearReview({
        reservation_id: reservationId,
        rating,
        comment,
      });
      this.newComment.set('');
      this.newReservationId.set(null);
      this.newRating.set(0);
      await this.loadReviews();
    } catch (error) {
      console.error('Error al crear reseña:', error);
    }
  }
}
