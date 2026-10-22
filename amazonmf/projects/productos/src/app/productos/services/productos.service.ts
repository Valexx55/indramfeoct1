import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos = [
    {id:1, nombre: 'Teclado', precio:45},
    {id:2, nombre: 'Monitor', precio:120},
    {id:3, nombre: 'Ratón', precio:20},
  ]


  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http:HttpClient) { }
//versión local de productos
  /*getProductos() {
    console.log("Productos service getProductos");
    return this.productos;
  }*/
//versión remota de productos
  getProductos():Observable<Producto[]> {
    console.log("Productos service getProductos desde API");
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
