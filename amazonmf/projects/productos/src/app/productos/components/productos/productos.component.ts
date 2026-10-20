import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  

  private prodcutoService = inject(ProductosService);
  productos: Producto[] = [];

  ngOnInit(): void {
    this.productos = this.prodcutoService.getProductos();
  }

  agregarAlCarrito(p:Producto)
  {
    console.log(`Producto cargado ${p}`);
  }

}
