import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { CrearExamenComponent } from './components/examenes/crear-examen/crear-examen.component';
import { AgregarPreguntasComponent } from './components/examenes/agregar-preguntas/agregar-preguntas.component';
import { TomarExamenComponent } from './components/examenes/tomar-examen/tomar-examen.component';


const routes: Routes = [

  { path: 'profesores', component: ProfesoresComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'crear-examen', component: CrearExamenComponent },
  { path: 'crear-examen/:id/agregar-preguntas', component: AgregarPreguntasComponent },
  { path: 'examen/:id', component: TomarExamenComponent },
  { path: '**', component: ProfesoresComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
