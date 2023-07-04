import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampingCenter } from '../models/CampingCenter';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CampCenterService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
  private campCenterUrl = this.apiUrl + '/api/camping-centers';

   getCamps(): Observable<CampingCenter[]> {
    return this.http.get<CampingCenter[]>(this.campCenterUrl);

  }
  addCamp(camp: CampingCenter): Observable<CampingCenter> {
    return this.http.post<CampingCenter>(this.campCenterUrl, camp, this.httpOptions);
  }

  deleteCamp(id: number): Observable<{}> {
    const url = `${this.campCenterUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
  getCampingById(id: number): Observable<CampingCenter> {
    const url = `${this.campCenterUrl}/${id}`;
    return this.http.get<CampingCenter>(url);
  }


  constructor(
    private http: HttpClient
  ) { }
}
