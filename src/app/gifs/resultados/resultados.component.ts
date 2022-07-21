import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {
  //Se crea el getter de resultados

  get resultados() {
    return this.gifsService.resultados;
  }

  //Se importa el servicio
  constructor(private gifsService: GifsService) {}
}
