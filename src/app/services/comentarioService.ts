import {Injectable} from "@angular/core";
import { Comentario } from "../models/comentario";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Recomendacion } from "../models/recomendacion";

export var urlSitio = 'https://..../api/'

@Injectable()
export class ComentarioService{
    public comentarios: Array<Comentario>;
    public recomendaciones : Array<Recomendacion> = [new Recomendacion("bloqueador")];

    constructor(
        private http: HttpClient
    ){
        this.comentarios =[
            new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones),
            new Comentario(2, "pepito", "Me encanto la experiencia", 4,1, this.recomendaciones),
            new Comentario(3, "pepita", "muy bonito el lugar", 2,3, this.recomendaciones),
            new Comentario(4, "Apolo", "Me encanto la experiencia", 5,3, this.recomendaciones),
            new Comentario(5, "Apolo", "descripcion de sitio", 4,6, this.recomendaciones),
            new Comentario(6, "Apolo", "Me encanto la experiencia", 4,6, this.recomendaciones)
          ];
    }

    public getComentariosByIdSitio(id_sitio: number):Observable<any[]>/*Observable<any>*/{
        /*
          return this.http.get(urlSitio+'sitiosTuristicos');
         */
          const o = this.comentarios.filter(s => s.id_sitio_turistico === id_sitio);;
          return of(o);
    }

    public getComentariosByIdUser(id_user: number):Observable<any>{
        /*
          return this.http.get(urlSitio+'fromCiudadSitiosTuristicos'+id);
         */
        const o = this.comentarios.find(s => s.nombre_autor === "Apolo");;
        return of(o);
    }
}
