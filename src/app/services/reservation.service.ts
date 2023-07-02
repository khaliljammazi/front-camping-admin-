import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private apiUrl = environment.apiUrl;
  private ReservationUrl = this.apiUrl + '/api/reservations';

  getReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.ReservationUrl);

  }
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.ReservationUrl +'/'+ id);
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.ReservationUrl, reservation, this.httpOptions);
  }
  updateReservation(id: string, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(this.ReservationUrl + '/' + id, reservation, this.httpOptions);
  }
  deleteReservation(id: string): Observable<Reservation> {
    return this.http.delete<Reservation>(this.ReservationUrl + '/' + id, this.httpOptions);
  }
}
