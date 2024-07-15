import { CommonModule } from '@angular/common';
import { Component, OnInit, afterNextRender } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ciudad } from '../../models/ciudad';
import { SitioTuristico } from '../../models/sitioTuristico';
import { SitioTuristicoComponent } from '../sitio-turistico/sitio-turistico.component';
import { CiudadService } from '../../services/ciudadService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [CommonModule, SitioTuristicoComponent],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.css',
  providers: [CiudadService]
})
export class CiudadComponent implements OnInit{
  public id:number = -1;
  public ciudad: Ciudad | undefined;
  //public ciudades: Array<any>;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private ciudadService: CiudadService
  ){/*
    afterNextRender(()=>{
      this.route.params.subscribe((params: Params)=>{
        const idParam = params["id"];
        console.log("id param: ", idParam);
        this.id = +idParam;
        console.log("id ciudad: ", this.id);
        
      })
    });*/

    //this.ciudades = this.ciudadService.getCiudades();
    /*
    this.ciudades = [];
    this.ciudadService.getCiudades().subscribe({
      next:(info) => {
        this.ciudades = info.data;
        for(let i=0; i< this.ciudades.lenght; i++){
          this.cancionService.getSitioTuristicoById(this.ciudades[i].id).suscribe({
            next:(info2) => {this.ciudades[i].sitiosTuristicos = info2.data},
            error:(error2) => {console.log("Error: ", error2)}
          })
        } 
      },
      error:(error) => {console.log("Error: ", error)}
    });
    */

    console.log(this.ciudadService.test());
  }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la ruta de manera segura
    this.route.params.subscribe((params: Params) => {
      const idParam = params['id'];
      if (idParam !== null) {
        this.id = +idParam; // Convertir idParam a número si no es null
        // Lógica para cargar los sitios turísticos de la ciudad con this.id
        console.log("id de ciudad", this.id);
        this.ciudadService.getCiudadById(this.id).subscribe(ciudad => {
          this.ciudad = ciudad;
          // Aquí puedes manejar la ciudad encontrada
          console.log('Ciudad cargada:', this.ciudad);
        });
        //this.ciudadService.getCiudadById(this.id).subscribe({
        //  next:
        //});
        
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


}
