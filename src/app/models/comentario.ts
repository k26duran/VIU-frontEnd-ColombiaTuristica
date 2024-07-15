import { Recomendacion } from "./recomendacion";

export class Comentario{
    constructor(
        public id:number,
        public nombre_autor: string,
        public descripcion: string,
        public calificacion: number,
        public id_sitio_turistico:number,
        public recomendaciones: Array<Recomendacion>
    ){
        
    }
}