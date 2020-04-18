import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/Examen';
import { ExamenesService } from 'src/app/services/examenes.service';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { Materia } from 'src/app/models/Materia';

@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.css']
})
export class CrearExamenComponent implements OnInit {

  constructor(private examenesService: ExamenesService, 
    private materiasService: MateriasService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  examen = new Examen();
  materias: Materia[];

  obtenerMaterias(){
    this.materiasService.getMaterias().subscribe(materias => {
      this.materias = materias;
    });
  }

  submit() {

    this.examenesService.createExamen(this.examen).subscribe(examen => {
      if(examen && examen != null) {
        this.router.navigate(["crear-examen/" + examen.id + "/agregar-preguntas"]);
      }
      else {
        alert("Ha ocurrido un error al guardar!");
      }
    });

  }
}
