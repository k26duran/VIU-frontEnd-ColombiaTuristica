import { Component, Input } from '@angular/core';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {
  @Input() public comentario : Comentario = new Comentario(1, "", "", 1, 1,[]);
}
