import { Component, OnInit, Input } from '@angular/core';
import { ExamenesService } from 'src/app/services/examenes.service';
import { Examen } from 'src/app/models/Examen';

@Component({
  selector: 'app-examenes-list',
  templateUrl: './examenes-list.component.html',
  styleUrls: ['./examenes-list.component.css']
})
export class ExamenesListComponent implements OnInit {

  examenes: Examen[];

  @Input() sesion: string;
  
  constructor(private examenesService: ExamenesService ) { }

  ngOnInit(): void {

    this.getAll();


  }

  getAll(){
    this.examenesService.getExamenes().subscribe(examenes => {
      this.examenes = examenes;
    });
  }
  
  eliminar(id: number) {
    if(confirm("Eliminar examen?")) {
      this.examenesService.deleteExamen(id).subscribe(response => {
        if(response && response !== null){
          this.getAll();
        }
      });
    }
    
  }


}
