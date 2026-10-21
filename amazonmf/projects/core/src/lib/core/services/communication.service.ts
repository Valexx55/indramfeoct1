import { Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //no funciona bien, porque no puede escuchar desde el principio
  //productoAddedSubject = new Subject<ProductoEvent>();
  //mejora al anterior, pero carrito sólo recupera el úlitmo evento antes de iniciar la suscripción
  //productoAddedSubject = new BehaviorSubject<ProductoEvent|null>(null);//|Union Type
  //similiar al anterior pero con memoria para los 2 últimos (parámetro Replay)
  //productoAddedSubject = new ReplaySubject<ProductoEvent>(2);
  productoAddedSubject: BehaviorSubject<ProductoEvent[]>;

  //lista mutabla/reactiva de productos
  producto$:Observable<ProductoEvent[]>;

  constructor() {

    console.log('instanciando COMMUNICATION SERVICE');

    this.productoAddedSubject = new BehaviorSubject<ProductoEvent[]>([]);
    this.producto$ = this.productoAddedSubject.asObservable();
  }

   emitirProductoAdded (productoEvent: ProductoEvent)
   {
    //this.productoAddedSubject.next(producto);//emitimos el evento a todos nuestros suscriptores//al MF de carrito
   
    let listaActual = this.productoAddedSubject.value;

    //si ya existe el producto en el array, pues incrementamos la cantidad
    let indice = listaActual.findIndex(p=> p.id == productoEvent.id);

    if (indice>-1)
    {
      //está, hay que actualizar el contador
      listaActual[indice].cantidad = (listaActual[indice].cantidad||1)+1;
      this.productoAddedSubject.next([...listaActual]);
    } else {
      //producto nuevo
      //hacemos un nuevo array para que se tx el cambio
      this.productoAddedSubject.next([...listaActual, {...productoEvent, cantidad:1}])
    }
  }
}
