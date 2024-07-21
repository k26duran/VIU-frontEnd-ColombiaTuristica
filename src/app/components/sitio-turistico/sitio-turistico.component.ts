import { RecomendacionConteo } from './../../models/recomendacionConteo';
import { RecomendacionComponent } from './../recomendacion/recomendacion.component';
import { Component, Input, OnInit } from '@angular/core';
import { SitioTuristico } from '../../models/sitioTuristico';
import { SitioTuristicoService } from '../../services/sitioTuristicoService';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ComentarioService } from '../../services/comentarioService';
import { ComentarioComponent } from '../comentario/comentario.component';
import { CommonModule } from '@angular/common';
import { Recomendacion } from '../../models/recomendacion';
import { Foto } from '../../models/foto';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sitio-turistico',
  standalone: true,
  imports: [ComentarioComponent,CommonModule,RecomendacionComponent, FormsModule],
  templateUrl: './sitio-turistico.component.html',
  styleUrl: './sitio-turistico.component.css',
  providers: [SitioTuristicoService, ComentarioService]
})

export class SitioTuristicoComponent implements OnInit{
  public id:number = -1;
  public estrellas: string[] = [];
  public sitioTuristico?:SitioTuristico;
  public newComment = {
    text: '',
    rating: 1,
    photoUrls: ''
  };
  public imageUrls: string[] = [];
  successMessage: string | null = null;

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
        this.sitioTuristicoService.getSitioTuristicoById(this.id).subscribe({
          next:(info) =>{
            this.sitioTuristico = info.data;
            //cargar recomendaciones
            this.sitioTuristicoService.getRecomendaciones(this.id).subscribe({
              next: (recomendaciones) =>{
                if(this.sitioTuristico){
                  this.fillStars(this.sitioTuristico.calificacion);
                  this.sitioTuristico.recomendaciones = recomendaciones.data;
                  }

              }
            })
            //cargar comentarios
            this.comentarioService.getComentariosByIdSitio(this.id).subscribe({
              next:(info2) =>{
              if(this.sitioTuristico){
                this.sitioTuristico.comentarios= info2.data;
                for (let comentario of this.sitioTuristico.comentarios ){
                    this.comentarioService.getFotos().subscribe({
                      next:(foto) =>{
                        let fotos:Foto[]  = foto.data;
                        comentario.fotos = fotos.filter(foto => foto.id_comentario === comentario.id);
                      }
                    })
                    this.comentarioService.getRecomendaciones(comentario.id).subscribe({
                      next:(info_c) =>{
                        comentario.recomendaciones = info_c.data;
                      }
                    })
                }
                }
              }
            })
          },
          error:(error) => {console.log("Error en obtener sitios turisticos por id: ", error)}
        })
        //
       ;

      } else {
        // Manejo si 'id' es null
        console.log('El parámetro "id" es null o undefined');
      }
    });
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

  updateImageUrls() {
    // Convierte el campo de texto en un array de URLs
    this.imageUrls = this.newComment.photoUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  onSubmit() {
    const fechaDePublicacion = this.getCurrentDateTime();
    const comentarioJson = {
      descripcion: this.newComment.text,
      calificacion: this.newComment.rating,
      fecha_de_publicacion: fechaDePublicacion,
      id_sitio_turistico: this.id,
      id_usuario: 1
    };

    //creacion de imagenes asociadas al comentario
    this.comentarioService.createComentario(JSON.stringify(comentarioJson))
      .pipe(

        switchMap((response: any) => {

          // Extrae el ID del comentario de la respuesta
          const comentarioId = response.data.id;

          // Luego, crea las fotos asociadas al comentario
          const fotos = this.imageUrls.map(url => ({
            nombre: "foto:"+url,
            foto: url,
            id_comentario: comentarioId
          }));

          // Crea un observable para cada solicitud de creación de foto
          const fotoObservables = fotos.map(foto =>
            this.comentarioService.createFotoComentario(JSON.stringify(foto))
          );

          // Usa forkJoin para esperar a que todas las solicitudes de foto terminen
          return forkJoin(fotoObservables);
        })
      )
      .subscribe({
        next: (responses) => {
          console.log('Comentario y fotos creados con éxito', responses);
          this.successMessage = 'Comentario y fotos creados con éxito';
        },
        error: (error) => {
          console.error('Error al crear comentario o fotos', error);
        }
      });

  }

  closeAlert() {
    this.successMessage = null;
  }

}
