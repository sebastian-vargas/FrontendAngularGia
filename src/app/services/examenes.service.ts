import { Injectable } from '@angular/core';
import { Examen } from '../models/Examen';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {
  
  api_url = "http://examengiaspring.herokuapp.com/api/examenes";

  constructor(private http: HttpClient) { }
  
  getExamenes(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.api_url);
  }

  getExamen(id: Number): Observable<Examen> {
    return this.http.get<Examen>(this.api_url + "/" + id);
  }

  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.api_url, examen);
  }

  deleteExamen(id: number): Observable<Examen> {
    return this.http.delete<Examen>(this.api_url + "/" + id);
  }
}
