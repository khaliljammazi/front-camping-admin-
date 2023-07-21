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
  updateCamp(camp: CampingCenter): Observable<CampingCenter> {
    const url = `${this.campCenterUrl}/${camp.id}`;
    return this.http.put<CampingCenter>(url, camp, this.httpOptions);
  }
  getOccupancyRate(): Observable<any> {
    const url = `${this.campCenterUrl}/calculateOccupancyRate`;
    return this.http.get<any>(url);
  }
  getcalculateADR(): Observable<any> {
    const url = `${this.campCenterUrl}/calculateADR`;
    return this.http.get<any>(url);
  }
  getcalculateRevenuePerOccupiedSpace(): Observable<any> {
    const url = `${this.campCenterUrl}/calculateRevenuePerOccupiedSpace`;
    return this.http.get<any>(url);
  }




  constructor(
    private http: HttpClient
  ) { }
}
