import {Injectable} from "@angular/core";
import { SitioTuristico } from "../models/sitioTuristico";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

export var urlSitio = 'http://localhost:80/api/'

@Injectable()
export class SitioTuristicoService{

    constructor(
        private http: HttpClient
    ){

    }

    public getSitiosTuristicos():Observable<any>{
          return this.http.get(urlSitio+'sitio_turistico');
    }

    public getSitioTuristicoById(id: number):Observable<any>{
       return this.http.get(urlSitio+'sitio_turistico/'+id);
    }

    public getSitioTuristicoByIdCiudad(id_ciudad: number):Observable<any>{
        return this.http.get(urlSitio+'sitio_turistico/getSitioTuristicoByCiudad/'+id_ciudad);
    }

    public getRecomendaciones(id: number):Observable<any>{
      return this.http.get(urlSitio+'comentario/getRecomendacionBySitioTuristico/'+id);
    }
}
