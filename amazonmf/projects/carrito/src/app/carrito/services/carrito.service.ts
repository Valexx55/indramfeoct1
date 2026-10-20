import { Injectable } from '@angular/core';
import { CarritoItem } from '../models/carrito-item';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: CarritoItem[]=
  [
    {id:1, nombre:'Laptop', cantidad: 1, precio:1200},
    {id:2, nombre:'Teclado', cantidad: 2, precio:80}
  ]

  constructor() { }

  obtenerCarrito()
  {
    return this.carrito;
  }

  agregarProducto (producto:CarritoItem)
  {
    this.carrito.push(producto);
  }

  vaciarCarrito ()
  {
    this.carrito=[];
  }
  getTotal () {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }
}
