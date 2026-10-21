import { Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //no funciona bien, porque no puede escuchar desde el principio
  //productoAddedSubject = new Subject<ProductoEvent>();
  //mejora al anterior, pero carrito sólo recupera el úlitmo evento antes de iniciar la suscripción
  //productoAddedSubject = new BehaviorSubject<ProductoEvent|null>(null);//|Union Type
  //similiar al anterior pero con memoria para los 2 últimos (parámetro Replay)
  productoAddedSubject = new ReplaySubject<ProductoEvent>(2);

  constructor() {

    console.log('instanciando COMMUNICATION SERVICE');
   }

   emitirProductoAdded (producto: ProductoEvent)
   {
    this.productoAddedSubject.next(producto);//emitimos el evento a todos nuestros suscriptores//al MF de carrito
   }
}
