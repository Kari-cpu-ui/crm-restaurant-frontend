import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../core/services/review';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-review',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent implements OnInit {

private auth = inject(AuthService);

  private reviewService = inject(ReviewService);
  private route = inject(ActivatedRoute);

  newComment = signal('');
  newReservationCode = signal<string>('');
  newRating = signal<number>(0);

  readonly reviews = signal<Review[]>([]);

  async loadReviews() {
    const data = await this.reviewService.obtenerReviews();
    this.reviews.set(data);
  }

  async ngOnInit() {
    // Leer código de reserva del query param si viene de "Mis Reservas"
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.newReservationCode.set(code);
    }

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
    const reservationCode = this.newReservationCode();
    const rating = this.newRating();
    if (!comment || !reservationCode || reservationCode.length !== 4 || rating < 1 || rating > 5) return;

    try {
      await this.reviewService.crearReview({
        reservation_code: reservationCode,
        rating,
        comment,
      });
      this.newComment.set('');
      this.newReservationCode.set('');
      this.newRating.set(0);
      await this.loadReviews();
    } catch (error) {
      console.error('Error al crear reseña:', error);
    }
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
