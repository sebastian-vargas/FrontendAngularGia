import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from '../models/Materia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  api_url = "http://examengiaspring.herokuapp.com/api/materias";

  constructor(private http: HttpClient) { }
  
  getMaterias(): Observable<Materia[]> {
    return this.http.get<[Materia]>(this.api_url);
  }
}
