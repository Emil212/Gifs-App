import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  //Getter del historial para el servicio
  get historial() {
    return this.gifsService.historial;
  }

  buscar(item: string) {
    this.gifsService.buscarGifs(item);
  }

  //Se importa el servicio para acceder a sus metodos y propiedades
  constructor(private gifsService: GifsService) {}
}
