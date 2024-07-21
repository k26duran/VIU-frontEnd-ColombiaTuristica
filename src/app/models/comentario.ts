import { Foto } from "./foto";
import { Recomendacion } from "./recomendacion";

export class Comentario{
    constructor(
        public id:number,
        public descripcion: string,
        public calificacion: number,
        public id_sitio_turistico:number,
        public fecha_de_publicacion: string,
        public recomendaciones: Array<Recomendacion>,
        public fotos: Array<Foto>
    ){

    }
}
