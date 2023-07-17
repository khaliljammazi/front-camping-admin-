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
  private favoriteUrl = this.apiUrl + '/api/activities/addTofavorites';
  private activeActivityUrl = this.apiUrl + '/api/activities/active';
  private actUrl = this.apiUrl + '/api/activities/AllActivities';


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

  updateAct(act: Activity): Observable<Activity> {
    const url = `${this.activityUrl}/${act.id}`;
    return this.http.put<Activity>(url, act, this.httpOptions);
  }

  getById(id: number): Observable<Activity> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.get<Activity>(url);
  }

  addToFavorites(activityId: number, userId: number): Observable<any> {
    const url = `${this.favoriteUrl}/${activityId}/${userId}`;
    return this.http.post(url, {});
    
  }

  getActiveActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activeActivityUrl);
  }

  actUser(userId: number): Observable<any> {
    const url = `${this.actUrl}/${userId}`;
    return this.http.get(url, {});
    
  }

  constructor(
    private http: HttpClient
  ) { }

}