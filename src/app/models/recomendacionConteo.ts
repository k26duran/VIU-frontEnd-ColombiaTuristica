import { Recomendacion } from "./recomendacion";
export class RecomendacionConteo {
  recomendacion: Recomendacion;
  conteo: number;

  constructor(recomendacion: Recomendacion, conteo: number) {
      this.recomendacion = recomendacion;
      this.conteo = conteo;
  }
}
