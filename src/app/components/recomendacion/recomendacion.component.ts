import { Component, Input } from '@angular/core';
import { Recomendacion } from '../../models/recomendacion';
import { RecomendacionConteo } from '../../models/recomendacionConteo';

@Component({
  selector: 'app-recomendacion',
  standalone: true,
  imports: [],
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.css'
})
export class RecomendacionComponent {
  @Input() public recomendacion : RecomendacionConteo = new RecomendacionConteo(new Recomendacion(1, ""),1);
}
