import {Injectable} from "@angular/core";
import { SitioTuristico } from "../models/sitioTuristico";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

export var urlSitio = 'https://..../api/'

@Injectable()
export class SitioTuristicoService{
    public sitiosTuristicos: Array<SitioTuristico>;

    constructor(
        private http: HttpClient
    ){
        this.sitiosTuristicos =[
            new SitioTuristico(1, "ciudad amurallada", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",1,[], []),
            new SitioTuristico(2, "torre del reloj", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",1, [], []),
            new SitioTuristico(3, "la piedra del peñol", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",2,[],[]),
            new SitioTuristico(4, "jardin botanico", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",2, [],[]),
            new SitioTuristico(5, "playa blanca", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",3, [],[]),
            new SitioTuristico(6, "acuario", "descripcion de sitio", "https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7",3, [],[])
          ];
    }

    public getSitiosTuristicos():Array<SitioTuristico>/*Observable<any>*/{
        /*
          return this.http.get(urlSitio+'sitiosTuristicos');
         */
        return this.sitiosTuristicos;
    }

    public getSitioTuristicoById(id: number):Observable<any>{
        /*
          return this.http.get(urlSitio+'fromCiudadSitiosTuristicos'+id);
         */
        const o = this.sitiosTuristicos.find(s => s.id === id);;
        return of(o);
    }

    public getSitioTuristicoByIdCiudad(id_ciudad: number):Observable<any>{
        /*
          return this.http.get(urlSitio+'fromCiudadSitiosTuristicos'+id);
         */
        const o = this.sitiosTuristicos.find(s => s.id_ciudad === id_ciudad);;
        return of(o);
    }
}
