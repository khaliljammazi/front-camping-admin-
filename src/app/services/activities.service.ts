import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Activity } from '../models/Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private apiUrl = environment.apiUrl;
  private activityUrl = this.apiUrl + '/api/activities';

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activityUrl);
  }

  addActivity(activity: Activity, campingId: number): Observable<Activity> {
    const url = `${this.activityUrl}?campingcenterId=${campingId}`;
    return this.http.post<Activity>(url, activity, this.httpOptions);
  }

  deleteActivity(id: number): Observable<{}> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }


  constructor(
    private http: HttpClient
  ) { }

}