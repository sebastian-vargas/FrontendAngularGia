import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ExamenesListComponent } from './components/examenes/examenes-list/examenes-list.component';
import { CrearExamenComponent } from './components/examenes/crear-examen/crear-examen.component';
import { AgregarPreguntasComponent } from './components/examenes/agregar-preguntas/agregar-preguntas.component';
import { TomarExamenComponent } from './components/examenes/tomar-examen/tomar-examen.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfesoresComponent,
    EstudiantesComponent,
    ExamenesListComponent,
    CrearExamenComponent,
    AgregarPreguntasComponent,
    TomarExamenComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
