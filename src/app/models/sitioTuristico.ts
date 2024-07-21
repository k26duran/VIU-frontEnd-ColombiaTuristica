import { RecomendacionConteo } from './recomendacionConteo';
import { Comentario } from "./comentario";


export class SitioTuristico{
    constructor(
        public id:number,
        public nombre: string,
        public descripcion: string,
        public foto: string,
        public id_ciudad:number,
        public comentarios: Array<Comentario>,
        public recomendaciones: Array<RecomendacionConteo>,
        public calificacion: number
    ){

    }
}
