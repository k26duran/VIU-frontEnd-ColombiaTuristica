import { SitioTuristico } from "./sitioTuristico";
export class Ciudad{
    constructor(
        public id:number,
        public nombre: string,
        public descripcion: string,
        public foto: string,
        public sitiosTuristicos: Array<SitioTuristico>,
        public calificacion: number
    ){

    }
}
