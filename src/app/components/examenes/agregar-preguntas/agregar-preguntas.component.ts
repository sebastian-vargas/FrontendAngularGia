import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/models/Pregunta';
import { Respuesta } from 'src/app/models/Respuesta';
import { ExamenesService } from 'src/app/services/examenes.service';
import { Examen } from 'src/app/models/Examen';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-agregar-preguntas',
  templateUrl: './agregar-preguntas.component.html',
  styleUrls: ['./agregar-preguntas.component.css']
})
export class AgregarPreguntasComponent implements OnInit {

  constructor(private route: ActivatedRoute, private examenesService: ExamenesService, private router: Router,private preguntaService: PreguntasService) { }
  examen: Examen = new Examen();
  preguntas: Pregunta[] = new Array();

  pregunta_tmp = new Pregunta();
  respuesta_tmp = new Respuesta();

  ngOnInit(): void {
    let id_param = Number(this.route.snapshot.paramMap.get("id"));

    if(id_param) {
      this.getExamen(id_param);
    }  
  }

  getExamen(examen_id:  Number){
      this.examenesService.getExamen(examen_id).subscribe(examen => {
        if(examen && examen != null) {
          this.examen = examen;
        }
        else {
          this.router.navigate(["crear-examen/"]);
        }
      });
  }

  terminarExamen() {
    if(this.preguntas.length > 0){
      console.log(this.preguntas)
      this.preguntaService.guardarPreguntas(this.preguntas).subscribe(response => {
        if(response || response != null) {
          this.router.navigate(["profesores/"]);
        }
      });
    }
    else {
      alert("Debe ingresar como minimo una pregunta.");
    }
    
  }

  agregarPregunta() {

    if(this.pregunta_tmp.descripcion != "" && this.pregunta_tmp.valoracion > 0) {
      
      let p: Pregunta = {
        fk_examen_id: this.examen.id,
        descripcion: this.pregunta_tmp.descripcion,
        imagen: this.pregunta_tmp.imagen,
        valoracion: this.pregunta_tmp.valoracion,
        tipo: this.pregunta_tmp.tipo,
        respuestas: this.pregunta_tmp.respuestas
      };

      this.preguntas.push(p);

      this.limpiarPreguntaForm();
    }
    else {
      alert("Debe llenar los campos requeridos.")
    }
  }

  agregarRespuesta() {
    if(this.respuesta_tmp.respuesta != ""){

      let r : Respuesta = {respuesta: this.respuesta_tmp.respuesta,
        correcta: this.respuesta_tmp.correcta
      }
  
      this.pregunta_tmp.respuestas.push(r);
      this.limpiarRespuestaForm();
    } 
    else {
      alert("Debe llenar los campos requeridos.");
    }

  }



  eliminarPregunta(index) {
    this.preguntas.splice(index, 1);
  }

  eliminarRespuesta(index) {
    this.pregunta_tmp.respuestas.splice(index, 1);
  }

  limpiarRespuestaForm() {
    this.respuesta_tmp.respuesta = "";
    this.respuesta_tmp.correcta = false;
  }

  limpiarPreguntaForm(){
    this.pregunta_tmp.descripcion = "";
    this.pregunta_tmp.imagen = "";
    this.pregunta_tmp.valoracion = 0;
    this.pregunta_tmp.tipo = "abierta";
    this.pregunta_tmp.respuestas = [];
  }
  

}
