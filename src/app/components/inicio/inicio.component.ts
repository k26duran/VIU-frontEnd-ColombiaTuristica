import { Component } from '@angular/core';
import { CiudadService } from '../../services/ciudadService';
import { CommonModule } from '@angular/common';
import { Ciudad } from '../../models/ciudad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [CiudadService]
})
export class InicioComponent {
  public titulo:string;
  public ciudades: Array<any>;

  constructor(private ciudadService: CiudadService, private router: Router){
    this.titulo = "Universidad de Valencia";
    this.ciudades = this.ciudadService.getCiudades();
  }

  verCiudad(ciudad: Ciudad): void {
    // Redirigir a la página de ciudad 
    this.router.navigate(['/ciudad', ciudad.id]);
  }
}
