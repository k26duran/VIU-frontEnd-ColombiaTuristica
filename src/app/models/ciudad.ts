import { SitioTuristico } from "./sitioTuristico";
export class Ciudad{
    constructor(
        public id:number,
        public nombre: string,
        public descripcion: string,
        public image_path: string,
        public sitiosTuristicos: Array<SitioTuristico>
    ){
        
    }
}