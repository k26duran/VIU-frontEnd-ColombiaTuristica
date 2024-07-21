import {Injectable} from "@angular/core";
import { Comentario } from "../models/comentario";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Recomendacion } from "../models/recomendacion";

export var urlSitio = 'http://localhost:80/api/';

@Injectable()
export class ComentarioService{

    constructor(
        private http: HttpClient
    ){

    }

    public getComentariosByIdSitio(id_sitio: number):Observable<any>{
          return this.http.get(urlSitio+'comentario/getComentarioBySitioTuristico/'+id_sitio);
    }

    public getRecomendaciones(id: number):Observable<any>{
      return this.http.get(urlSitio+'comentario_recomendacion/getRecomendacionByComentario/'+id);
    }

    public getFotos():Observable<any>{
      return this.http.get(urlSitio+"foto");
    }

    public createComentario(json:string):Observable<any>{
      let headersCreated = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(urlSitio+"comentario",json,{headers: headersCreated});
    }

    public createFotoComentario(json:string):Observable<any>{
      let headersCreated = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(urlSitio+"foto",json,{headers: headersCreated});
    }


}
