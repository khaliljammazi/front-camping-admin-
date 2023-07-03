import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedBack } from '../models/FeedBack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000';
  private feedbackUrl = `${this.apiUrl}/feedbacks`;

  constructor(private http: HttpClient) {}

  getFeedbacks(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(this.feedbackUrl);
  }
}
