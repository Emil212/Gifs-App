import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

//Los servicios se pueden ocupar en cualquer parte del modulo donde esten

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'AhxE1urkEKhp3mbxhpG3yfLX4PKJx3VP';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  private _ultimaBusqueda: string = '';

  //Tipo de dato Gif sacado de la interfaz
  public resultados: Gif[] = [];

  //Se retorna un nuevo arreglo rompiendo la relacion mediante el operador spread
  get historial() {
    return [...this._historial];
  }

  get ultimaBusqueda() {
    return this._ultimaBusqueda;
  }

  //Se inicializa el constructor para poder ocupar las peticiones (Observable)
  //En el conrtuctor se va a implementar para recuperar el historial desde el local storage

  constructor(private http: HttpClient) {
    //Se convierte de json a objeto, se agrega el ! para indicar que sabemos lo que hacemos
    //Si el historial es nulo se regresa un arreglo vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._ultimaBusqueda =
      JSON.parse(localStorage.getItem('ultimaBusqueda')!) || [];
    this.buscarGifs(this._ultimaBusqueda);
  }

  //Se agrega la busqueda al comienzo del arreglo
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);

      //Se limita el arrglo para quer soloo tenga 10 elementos
      this._historial = this._historial.splice(0, 10);

      //Se guarda el historial en el local storage y se convierte a json mediante stringify
      localStorage.setItem('historial', JSON.stringify(this._historial));
      localStorage.setItem(
        'ultimaBusqueda',
        JSON.stringify(this._historial[0])
      );
      console.log(JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '25')
      .set('q', query);

    //Peticion HTTP
    this.http
      .get<SearchGifsResponse>(`${this.servicioURL}/search`, { params: params })
      .subscribe((resp) => {
        this.resultados = resp.data;
      });
  }
}
