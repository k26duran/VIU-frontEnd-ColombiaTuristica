import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { SitioTuristicoComponent } from './components/sitio-turistico/sitio-turistico.component';
import { RecomendacionComponent } from './components/recomendacion/recomendacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent, CabeceraComponent, NavegacionComponent, PieComponent, ComentarioComponent,
    CiudadComponent, SitioTuristicoComponent, RecomendacionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'colombia_turistica';
}
