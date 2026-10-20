import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos = [
    {id:1, nombre: 'Teclado', precio:45},
    {id:2, nombre: 'Monitor', precio:120},
    {id:3, nombre: 'Ratón', precio:20},
  ]

  constructor() { }

  getProductos() {
    console.log("Productos service getProductos");
    return this.productos;
  }
}
