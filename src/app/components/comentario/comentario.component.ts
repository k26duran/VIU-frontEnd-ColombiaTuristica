import { Component, Input, OnInit} from '@angular/core';
import { Comentario } from '../../models/comentario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent implements OnInit {
  @Input() public comentario : Comentario = new Comentario(1, "", 1, 1,"",[],[]);
  public estrellas: string[] = [];

  constructor(){
  };

  ngOnInit(): void {
    this.fillStars(this.comentario.calificacion);
    console.log(this.comentario.calificacion)
  }

  fillStars(calificacion: number): void {
    this.estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (calificacion >= i) {
        this.estrellas.push('filled');
      } else if (calificacion >= i - 0.5) {
        this.estrellas.push('half');
      } else {
        this.estrellas.push('');
      }
    }
  }

}

