import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Command ,Payment,ProductCommand} from '../models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private apiUrl = 'http://localhost:8091/api/commands';
  private pymentUrl='http://localhost:8091/api/payments'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(this.apiUrl);
  }

  getCommandById(id: number): Observable<Command> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Command>(url);
  }

  addCommand(command: Command): Observable<Command> {
    return this.http.post<Command>(this.apiUrl, command, this.httpOptions);
  }
  makePayment(productCommand:any, paymentMethod: string): Observable<any> {
    return this.http.post<any>(this.pymentUrl, productCommand, { params: { paymentMethod } },);
  }
  updateCommand(id: number, command: Command): Observable<Command> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Command>(url, command, this.httpOptions);
  }
  updateCommandField(id: number, comm: any): Observable<Command> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Command>(url, comm, this.httpOptions);
  }

  deleteCommand(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.pymentUrl);
  }
}
