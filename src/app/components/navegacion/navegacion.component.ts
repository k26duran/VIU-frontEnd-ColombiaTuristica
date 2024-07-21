import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CiudadService } from '../../services/ciudadService';
import { SitioTuristicoService } from '../../services/sitioTuristicoService';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
  providers: [CiudadService, SitioTuristicoService]
})
export class NavegacionComponent {
  searchQuery: string = '';
  suggestions: Array<{ id: number, nombre: string, tipo: string }> = [];
  public isSuggestionsVisible: boolean = false;

  constructor(
    private router: Router,
    private ciudadService: CiudadService,
    private sitioTuristicoService: SitioTuristicoService
  ) {}

  onSearch(): void {
    if (this.searchQuery.trim() == '') {
      this.suggestions = [];
      this.isSuggestionsVisible = false;
      return;
    }
    forkJoin({
      ciudades: this.ciudadService.getCiudades(),
      sitios: this.sitioTuristicoService.getSitiosTuristicos()
    }).subscribe({
      next: ({ ciudades, sitios }) => {
        const nombresCiudades = ciudades.data.map((ciudad: any) => ({
          id: ciudad.id,
          nombre: ciudad.nombre,
          tipo: 'ciudad'
        }));
        const nombresSitios = sitios.data.map((sitio: any) => ({
          id: sitio.id,
          nombre: sitio.nombre,
          tipo: 'sitio_turistico'
        }));
        const todosLosNombres = [...nombresCiudades, ...nombresSitios];
        if(this.searchQuery != ''){
          this.suggestions = todosLosNombres.filter(item =>
            item.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        this.isSuggestionsVisible = this.suggestions.length > 0;
      },
      error: (error) => {
        console.error("Error al obtener nombres:", error);
      }
    });
  }

  onSuggestionClick(suggestion: { id: number, nombre: string, tipo: string }): void {
    const ruta = suggestion.tipo === 'ciudad' ? `/ciudad/${suggestion.id}` : `/sitioTuristico/${suggestion.id}`;
    // Ocultar sugerencias al hacer clic
    this.suggestions = [];
    this.searchQuery = ''; // Limpiar el campo de búsqueda
    this.isSuggestionsVisible = false;

    this.router.navigate([ruta]);

  }

}
