import { Component, Input, OnInit } from '@angular/core';
import { SitioTuristico } from '../../models/sitioTuristico';
import { SitioTuristicoService } from '../../services/sitioTuristicoService';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ComentarioService } from '../../services/comentarioService';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-sitio-turistico',
  standalone: true,
  imports: [ComentarioComponent],
  templateUrl: './sitio-turistico.component.html',
  styleUrl: './sitio-turistico.component.css',
  providers: [SitioTuristicoService, ComentarioService]
})
export class SitioTuristicoComponent implements OnInit{
  public id:number = -1;
  //@Input() public sitioTuristico ?: SitioTuristico;

  
  public sitioTuristico?:SitioTuristico;

   constructor(
    private route:ActivatedRoute,
    private router: Router,
    private sitioTuristicoService: SitioTuristicoService,
    private comentarioService: ComentarioService
  ){}
  ngOnInit(): void {
    // Obtener el parámetro 'id' de la ruta de manera segura
    this.route.params.subscribe((params: Params) => {
      const idParam = params['id'];
      if (idParam !== null) {
        this.id = +idParam; // Convertir idParam a número si no es null
        // Lógica para cargar los sitios turísticos de la ciudad con this.id
        console.log("id de ciudad", this.id);
        this.sitioTuristicoService.getSitioTuristicoById(this.id).subscribe(sitio => {
          this.sitioTuristico = sitio;
          console.log('Sitio cargado:', this.sitioTuristico);
          this.comentarioService.getComentariosByIdSitio(this.id).subscribe(comentarios => {
            if(this.sitioTuristico){
              this.sitioTuristico.comentarios= comentarios;
              console.log('Comentarios cargados:', comentarios);
            }
            
          })
        });
        
      } else {
        // Manejo si 'id' es null
        console.log('El parámetro "id" es null o undefined');
      }
    });
  }

}
