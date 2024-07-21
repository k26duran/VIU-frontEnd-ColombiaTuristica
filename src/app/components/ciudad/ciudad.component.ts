import { CommonModule } from '@angular/common';
import { Component, OnInit, afterNextRender } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ciudad } from '../../models/ciudad';
import { SitioTuristico } from '../../models/sitioTuristico';
import { SitioTuristicoComponent } from '../sitio-turistico/sitio-turistico.component';
import { CiudadService } from '../../services/ciudadService';
import { SitioTuristicoService } from '../../services/sitioTuristicoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [CommonModule, SitioTuristicoComponent],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.css',
  providers: [CiudadService, SitioTuristicoService]
})
export class CiudadComponent implements OnInit{
  public id:number = -1;
  public ciudad?: Ciudad;
  public estrellas: string[] = [];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private ciudadService: CiudadService,
    private sitioTuristicoService: SitioTuristicoService
  ){
  }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la ruta de manera segura
    this.route.params.subscribe((params: Params) => {
      const idParam = params['id'];
      if (idParam !== null) {
        this.id = +idParam; // Convertir idParam a número si no es null
        // Lógica para cargar los sitios turísticos de la ciudad con this.id
        console.log("id de ciudad", this.id);
        this.ciudadService.getCiudadById(this.id).subscribe({
          next:(info) => {
            this.ciudad = info.data;
            this.sitioTuristicoService.getSitioTuristicoByIdCiudad(this.id).subscribe({
              next:(info2) =>{
                if(this.ciudad){
                this.fillStars(this.ciudad.calificacion);
                this.ciudad.sitiosTuristicos = info2.data;}
              },
              error:(error) => {console.log("Error en obtener sitios turisticos por ciudad: ", error)}
            })
          },
          error:(error) => {console.log("Error en obtener ciudad by id: ", error)}});

      } else {
        // Manejo si 'id' es null
        console.log('El parámetro "id" es null o undefined');
      }

    });


  }

  verSitioTuristico(sitioT: SitioTuristico): void {
    // Redirigir a la página de sitioTuristico
    this.router.navigate(['/sitioTuristico', sitioT.id]);
  }

  fillStars(calificacion: number): void {
    this.estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (calificacion >= i) {
        this.estrellas.push('filled');
      } else if (calificacion >= i - 0.5) {
        this.estrellas.push('half');
      } else {
        this.estrellas.push('');
      }
    }
  }


}
