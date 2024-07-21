import {Injectable} from "@angular/core";
import { Ciudad } from "../models/ciudad";
import { SitioTuristico } from "../models/sitioTuristico";
import { Comentario } from "../models/comentario";
import { Recomendacion } from "../models/recomendacion";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

export var urlCiudad = 'http://localhost:80/api/'

@Injectable()
export class CiudadService{

    constructor(
        private http: HttpClient
    ){

    }

    test(){
        return "testing";
    }

    public getCiudades():Observable<any>{
          return this.http.get(urlCiudad+'ciudad');
    }

    public getCiudadById(id:number):Observable<any>{
      return this.http.get(urlCiudad+'ciudad/'+id);
    }
}
