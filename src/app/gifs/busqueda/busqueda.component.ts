import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  //El decorador @ViewChild permite acceder a los elementos y componentes del DOM
  //El simbolo ! se usa para indicar que ese elemento siempre va a existir y no se necesita inlcuir en el constructor
  //Al incluir el HTMLInputElement nos permite acceder mas facil a las propiedades del elemento

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //Se utiliza el constructor para inicializar el servicio y acceder a todas sus propiedades y metodos

  constructor(private gifsService: GifsService) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }
    //Se manda el valor para que se agregue al arreglo
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
