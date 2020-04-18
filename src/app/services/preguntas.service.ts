import { Injectable } from '@angular/core';
import { Pregunta } from '../models/Pregunta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  api_url = "http://examengiaspring.herokuapp.com/api/preguntas";

  constructor(private http: HttpClient) { }

  guardarPreguntas(preguntas: Pregunta[]): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.api_url, preguntas);
  }

  getPreguntas(id: Number):Observable<Pregunta[]>{

    return this.http.get<Pregunta[]>(this.api_url + "/" + id);

  }

}
