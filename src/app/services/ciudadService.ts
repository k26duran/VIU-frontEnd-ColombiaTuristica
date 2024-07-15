import {Injectable} from "@angular/core";
import { Ciudad } from "../models/ciudad";
import { SitioTuristico } from "../models/sitioTuristico";
import { Comentario } from "../models/comentario";
import { Recomendacion } from "../models/recomendacion";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

export var urlCiudad = 'https://..../api/'

@Injectable()
export class CiudadService{
    public ciudades: Array<Ciudad>;
    public recomendaciones : Array<Recomendacion> = [new Recomendacion("bloqueador")];

    constructor(
        private http: HttpClient
    ){
      this.ciudades = [
        new Ciudad(1, "cartagena", "descripcion cartagena", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",
        [
          new SitioTuristico(1, "ciudad amurallada", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",1, [new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1,this.recomendaciones)], this.recomendaciones),
          new SitioTuristico(2, "torre del reloj", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",1, [new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones)], this.recomendaciones)
        ]),
        new Ciudad(2, "medellin", "descripcion medellin", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",
        [
          new SitioTuristico(3, "la piedra del peñol", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",2, [new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones)], this.recomendaciones),
          new SitioTuristico(4, "jardin botanico", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",2,[new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones)], this.recomendaciones)
        ]),
        new Ciudad(3, "santa marta", "descripcion santa marta", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",
        [
          new SitioTuristico(5, "playa blanca", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",3, [new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones)], this.recomendaciones),
          new SitioTuristico(6, "acuario", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",3, [new Comentario(1, "Apolo", "Muy bonito el lugar", 3,1, this.recomendaciones)], this.recomendaciones)
        ])
      ];
    }

    test(){
        return "testing";
    }

    public getCiudades():Array<Ciudad>/*Observable<any>*/{
        /*
          return this.http.get(urlCiudad+'ciudades');
         */
        return this.ciudades;
    }

    public getCiudadById(id:number):Observable<Ciudad | undefined>/*Observable<any>*/{
      const ciudad = this.ciudades.find(c => c.id === id);
      return of(ciudad);
    }
}