import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Review } from '../../shared/models/review.model';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/reviews`;

  obtenerReviews() {
    return firstValueFrom(this.http.get<Review[]>(this.apiUrl));
  }

  crearReview(review: Omit<Review, 'id' | 'created_at'>) {
    return firstValueFrom(this.http.post<Review>(this.apiUrl, review));
  }
}
