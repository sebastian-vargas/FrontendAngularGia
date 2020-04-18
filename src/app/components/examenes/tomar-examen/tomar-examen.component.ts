import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenesService } from 'src/app/services/examenes.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Examen } from 'src/app/models/Examen';
import { Pregunta } from 'src/app/models/Pregunta';
import { SolucionExamen } from 'src/app/models/SolucionExamen';
import { Respuesta } from 'src/app/models/Respuesta';

@Component({
  selector: 'app-tomar-examen',
  templateUrl: './tomar-examen.component.html',
  styleUrls: ['./tomar-examen.component.css'],
})
export class TomarExamenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examenesService: ExamenesService,
    private router: Router,
    private preguntaService: PreguntasService
  ) {}

  ngOnInit(): void {
    this.getExamen(this.route.snapshot.paramMap.get('id'));
  }

  examen: Examen = new Examen();
  preguntas: Pregunta[] = [];

  solucionExamen: SolucionExamen[] = [];

  getExamen(id) {
    this.examenesService.getExamen(id).subscribe((examen) => {
      if (examen && examen != null) {
        this.examen = examen;
        this.getPreguntas();
        alert("Conforme Seleccione una respuesta de al boton responder, al final dele en terminar examen");
      } else {
        this.router.navigate(['estudiantes/']);
      }
    });
  }

  getPreguntas() {
    this.preguntaService.getPreguntas(this.examen.id).subscribe((preguntas) => {
      this.preguntas = preguntas;
    });
  }

  setRespuesta() {}

  setRespuestaAbierta() {}

  submitAbierta(index, pregunta: Pregunta, form) {
    let respuesta = form.respuestaAbierta.value + '';

    if (respuesta != '') {
      this.solucionExamen.push({
        fk_examen_id: pregunta.fk_examen_id,
        fk_pregunta_id: pregunta.id,
        respuesta_abierta: respuesta,
        valoracion_obtenida: 0,
        tipo_pregunta: pregunta.tipo + "",
        revisada: false,
      });

      this.preguntas.splice(index, 1);
    } else {
      alert('Debe responder la pregunta.');
    }
  }

  submitUnica(index, pregunta: Pregunta, form) {
    let respuesta = form.respuestaUnica.value + '';
    let valoracion: Number = 0;

    pregunta.respuestas.forEach((r) => {
      if (r.id === Number(respuesta)) {
        if (r.correcta) {
          valoracion = pregunta.valoracion;
        }
      }
    });

    this.solucionExamen.push({
      fk_examen_id: pregunta.fk_examen_id,
      fk_pregunta_id: pregunta.id,
      valoracion_obtenida: valoracion,
      tipo_pregunta: pregunta.tipo + "",
      revisada: true,
    });

    this.preguntas.splice(index, 1);
  }

  submitMultiple(index, pregunta: Pregunta, form) {
    let respuestas = [];
    let valoracion = 0;

    form.respuestaMultiple.forEach((e) => {
      if (e.checked) {
        respuestas.push({
          respuesta_id: Number(e.value),
        });
      }
    });

    if (respuestas.length > 0 && respuestas.length < pregunta.respuestas.length) {
      let cont_correctas = 0;

      pregunta.respuestas.forEach((r) => {
        if (r.correcta) {
          cont_correctas++;
        }
      });

      let valor_correcta = Number(pregunta.valoracion) / cont_correctas;

      pregunta.respuestas.forEach((r) => {
        respuestas.forEach((res) => {
          if (r.id == res.respuesta_id) {
            if (r.correcta) {
              valoracion += valor_correcta;
            }
          }
        });
      });

      this.solucionExamen.push({
        fk_examen_id: pregunta.fk_examen_id,
        fk_pregunta_id: pregunta.id,
        valoracion_obtenida: valoracion,
        tipo_pregunta: pregunta.tipo + "",
        revisada: true,
      });

      this.preguntas.splice(index, 1);

    } else {
      alert("Cantidad de respuestas seleccionadas no permitida");
    }
  }


  terminarExamen(){
    let abiertas_contador = 0;
    let puntuacion_examen= 0;


    this.solucionExamen.forEach(se => {
      if(se.tipo_pregunta == "abierta"){
        abiertas_contador++;
      }
    });

    if(abiertas_contador == 0){
      
      this.solucionExamen.forEach(se => {
        puntuacion_examen = puntuacion_examen + +se.valoracion_obtenida;
      });

      alert("Obtuvo un total de: " + puntuacion_examen + " puntos de " + this.examen.nota_maxima + " posibles.");
    }else{
      alert("Al tener preguntas abiertas, su examen será revisado por el profesor");
    }

    this.router.navigate(["/estudiantes"]);

  }
}
