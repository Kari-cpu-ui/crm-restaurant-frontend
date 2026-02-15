import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Review } from '../../shared/models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/reviews';

  obtenerReviews() {
    return firstValueFrom(this.http.get<Review[]>(this.apiUrl));
  }

  crearReview(review: Omit<Review, 'id' | 'created_at'>) {
    return firstValueFrom(this.http.post<Review>(this.apiUrl, review));
  }
}
