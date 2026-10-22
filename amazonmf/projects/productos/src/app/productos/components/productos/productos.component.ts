import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  

  private productoService = inject(ProductosService);
   private comunicacionService = inject(CommunicationService);
  productos: Producto[] = [];

  ngOnInit(): void {
    //vesrión productos local
    //this.productos = this.prodcutoService.getProductos();
    //versión productos web
    this.productoService.getProductos().subscribe({
      next: (data:Producto[]) => this.productos = data,
      error: (err) => console.error('Error cargando productos:', err), 
      complete() {
        console.log('La com ha terminado')
      },
    });
  }

  agregarAlCarrito(p:Producto)
  {
    console.log(`Producto cargado ${p}`);

    let evento: ProductoEvent = {
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad:1
    }

    //tx el evento
    this.comunicacionService.emitirProductoAdded(evento);
  }

}
