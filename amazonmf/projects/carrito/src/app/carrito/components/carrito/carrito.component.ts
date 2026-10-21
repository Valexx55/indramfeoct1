import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService } from '@core-lib';
import { Observer, Subscription } from 'rxjs';
import { ProductoEvent } from '@models';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit, OnDestroy {

  private carrritoService = inject(CarritoService);
  private comunicacionService = inject(CommunicationService)

  carrito: any[] = [];
  total = 0;

  private sub!:Subscription;
  private sub2!:Subscription;

  productos$ = this.comunicacionService.producto$;

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

    this.sub2 = this.comunicacionService.productoAddedSubject.subscribe(this.observerListaProductos);

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
   }

  cargarCarrito(): void {
    this.carrito = this.carrritoService.obtenerCarrito();
    this.total = this.carrritoService.getTotal();
  }

  vaciarCarrito() {
    this.carrritoService.vaciarCarrito();
    this.cargarCarrito();
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
}
