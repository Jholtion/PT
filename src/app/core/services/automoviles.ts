import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Automovil } from '../models/automovil.model';

@Injectable({
  providedIn: 'root',
})
export class Automoviles {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';

  GetAutos(): Observable<Automovil[]> {
    return this.http.get<Automovil[]>(`${this.apiUrl}/autos`);
  }


  GetAuto(id: string): Observable<Automovil> {
    return this.http.get<Automovil>(`${this.apiUrl}/autos/${id}`);
  }


  AddAuto(automovil: Automovil): Observable<Automovil> {
    return this.http.post<Automovil>(`${this.apiUrl}/autos`, automovil);
  }


  PutAuto(id: string, automovil: Automovil): Observable<Automovil> {
    return this.http.put<Automovil>(`${this.apiUrl}/autos/${id}`, automovil);
  }


  DeleteAuto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/autos/${id}`);
  }
}
