import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedBack } from '../models/FeedBack';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
    private feedbackUrl = `${this.apiUrl}/api/feedback`; 

  constructor(
    private http: HttpClient
  ) { }

  addFeedback(feedback: FeedBack): Observable<FeedBack> {
    return this.http.post<FeedBack>(this.feedbackUrl, feedback, this.httpOptions);
  }

  updateFeedback(feedback: FeedBack, id: number): Observable<FeedBack> {
    const url = `${this.feedbackUrl}/${id}`;
    return this.http.put<FeedBack>(url, feedback, this.httpOptions);
  }

  getFeedback(id: number): Observable<FeedBack> {
    const url = `${this.feedbackUrl}/${id}`;
    return this.http.get<FeedBack>(url, this.httpOptions);
  }

  getAllFeedbacks(page?: number, sort?: string, dir?: string): Observable<FeedBack[]> {
    let params = '';
    if (page) params += `?page=${page}`;
    if (sort) params += `${params ? '&' : '?'}sort=${sort}`;
    if (dir) params += `${params ? '&' : '?'}dir=${dir}`;
    const url = `${this.feedbackUrl}${params}`;
    return this.http.get<FeedBack[]>(url, this.httpOptions);
  }

  getProductFeedbacks(productId: number): Observable<FeedBack[]> {
    const url = `${this.feedbackUrl}/product/${productId}`;
    return this.http.get<FeedBack[]>(url, this.httpOptions);
  }

  getCampingCenterFeedbacks(campingCenterId: number): Observable<FeedBack[]> {
    const url = `${this.feedbackUrl}/campingcenter/${campingCenterId}`;
    return this.http.get<FeedBack[]>(url, this.httpOptions);
  }

  getActivityFeedbacks(activityId: number): Observable<FeedBack[]> {
    const url = `${this.feedbackUrl}/activity/${activityId}`;
    return this.http.get<FeedBack[]>(url, this.httpOptions);
  }

  getRatingByUserId(feedbackId: number, userId: number): Observable<number> {
    const url = `${this.feedbackUrl}/rating/${feedbackId}/${userId}`;
    return this.http.get<number>(url, this.httpOptions);
  }

  getRatingByProductId(productId: number): Observable<number> {
    const url = `${this.feedbackUrl}/rating/product/${productId}`;
    return this.http.get<number>(url, this.httpOptions);
  }

  getRatingByCampingCenterId(campingCenterId: number): Observable<number> {
    const url = `${this.feedbackUrl}/rating/campingcenter/${campingCenterId}`;
    return this.http.get<number>(url, this.httpOptions);
  }

  getRatingByActivityId(activityId: number): Observable<number> {
    const url = `${this.feedbackUrl}/rating/activity/${activityId}`;
    return this.http.get<number>(url, this.httpOptions);
  }
}
