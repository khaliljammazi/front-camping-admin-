import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Command } from '../models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private apiUrl = 'http://localhost:8091/api/commands';
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

  createCommand(command: Command): Observable<Command> {
    return this.http.post<Command>(this.apiUrl, command, this.httpOptions);
  }

  updateCommand(id: number, command: Command): Observable<Command> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Command>(url, command, this.httpOptions);
  }

  deleteCommand(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
