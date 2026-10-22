import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService, selectProductos, selectTotalPrice, selectTotalProducts } from '@core-lib';
import { map, Observable, Observer, Subscription } from 'rxjs';
import { ProductoEvent } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit, OnDestroy {

  private carrritoService = inject(CarritoService);
  private comunicacionService = inject(CommunicationService);
  private store:Store= inject(Store);

  carrito: any[] = [];
  total = 0;

  total$!:Observable<number>;

  private sub!:Subscription;
  private sub2!:Subscription;
  private totalSub!:Subscription;

  productos$ = this.comunicacionService.producto$;

  productosNgRx$:Observable<ProductoEvent[]> = this.store.select(selectProductos);
   productosNumeroArticulos$: Observable<number> = this.store.select(selectTotalProducts);
  productosPrecioTotal$: Observable<number> = this.store.select(selectTotalPrice);

  observerListaProductos: Observer<ProductoEvent[]> = {
    next: listaProductos => console.log('Nueva lista', listaProductos),
    error: err => console.log('error ', err),
    complete:() => console.log('Completado')
  }


  ngOnInit(): void {
    this.cargarCarrito();

    //Solución transmiento el listado completo de productoEvent

    this.sub = this.comunicacionService.productoAddedSubject.subscribe(
      (evento:ProductoEvent[]) => {
        console.table(evento);
      }
    )

    this.totalSub = this.productos$.subscribe({
      next: (productos) => {
        this.total = productos.map(producto => (producto.cantidad ?? 0) * producto.precio).reduce((total, precioProducto) => total + precioProducto, 0)
      }
    })

    this.sub2 = this.comunicacionService.productoAddedSubject.subscribe(this.observerListaProductos);

    //opción rX
    this.total$ = this.productos$.pipe(
      map(
        productos => {
          return productos.reduce((acc,p) => acc + p.precio * (p.cantidad??1), 0)
        }
      )
    )

  // this.comunicacionService.productoAddedSubject.next

    //Solución transmitiendo productoEvent de 1 en 1
    /*
    this.sub = this.comunicacionService.productoAddedSubject.subscribe(
      (evento:ProductoEvent|null) => {
        if (evento)
        {
          console.log(`Nombre = ${evento.nombre} Id = ${evento.id}`);
          console.log('Datos evento', evento);
        } else {
          console.log(`evento nulo`);
        }
      }
    )*/
  }

   ngOnDestroy(): void {
     this.sub.unsubscribe();
     this.sub2.unsubscribe();
     this.totalSub.unsubscribe();
   }

  cargarCarrito(): void {
    this.carrito = this.carrritoService.obtenerCarrito();
    this.total = this.carrritoService.getTotal();
  }

  vaciarCarrito() {

    //servicio local mock
    //this.carrritoService.vaciarCarrito();
    //this.cargarCarrito();

    this.comunicacionService.vaciarProductos();


  }

   /**
   * hacemos una mejora para que en caso de que cambie un elemento de 
   * la lista y haya que repintarlo no se repinten todos sino que se lo actualizo los alimentos que cambiaron realmente reutilizando el resto
   * @param _index 
   * @param item 
   * @returns 
   */
  trackById(_index: number, item: any): number {
  return item.id;
}

borrarProducto(id:number)
{
  this.comunicacionService.eliminarProducto(id);
}
}
