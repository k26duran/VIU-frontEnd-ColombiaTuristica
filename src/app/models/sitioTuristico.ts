import { Comentario } from "./comentario";
import { Recomendacion } from "./recomendacion";

export class SitioTuristico{
    constructor(
        public id:number,
        public nombre: string,
        public descripcion: string,
        public image_path: string,
        public id_ciudad:number,
        public comentarios: Array<Comentario>,
        public recomendaciones: Array<Recomendacion>
    ){
        
    }
}