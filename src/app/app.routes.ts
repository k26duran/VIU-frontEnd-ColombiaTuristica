import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { SitioTuristicoComponent } from './components/sitio-turistico/sitio-turistico.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'ciudades', component: CiudadComponent},
    {path: 'ciudad/:id', component: CiudadComponent},
    {path: 'sitiosTuristicos', component: SitioTuristicoComponent},
    {path: 'sitioTuristico/:id', component: SitioTuristicoComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: '**', component: ErrorComponent},
];
