import { inject, Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import * as CartActions from '../../state/cart.actions';


const STORAGE_KEY = "carrito_productos";
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //no funciona bien, porque no puede escuchar desde el principio: El ciclo de vida del Compoenente
  //carritCompoente no se insntacia hasta que no visitas esa ruta, no se ejcuta el ciclo de vida (ni oninit, ni hace la suscripción)
  //productoAddedSubject = new Subject<ProductoEvent>();
  //mejora al anterior, pero carrito sólo recupera el úlitmo evento antes de iniciar la suscripción
  //productoAddedSubject = new BehaviorSubject<ProductoEvent|null>(null);//|Union Type
  //similiar al anterior pero con memoria para los 2 últimos (parámetro Replay)
  //productoAddedSubject = new ReplaySubject<ProductoEvent>(2);
  productoAddedSubject: BehaviorSubject<ProductoEvent[]>;

  //lista mutabla/reactiva de productos
  producto$:Observable<ProductoEvent[]>;

  //inyectamos el Store para poder disparar la acción
  store:Store= inject(Store);

  constructor() {

    console.log('instanciando COMMUNICATION SERVICE');

    let inicial: ProductoEvent[] = CommunicationService.recuperarEstadoProductos();

    //this.productoAddedSubject = new BehaviorSubject<ProductoEvent[]>([]);
    this.productoAddedSubject = new BehaviorSubject<ProductoEvent[]>(inicial);
    this.producto$ = this.productoAddedSubject.asObservable();
  }

  static recuperarEstadoProductos () : ProductoEvent[]
  {
    let inicial: ProductoEvent[] = [];

      let guardado = localStorage.getItem(STORAGE_KEY);
      inicial = guardado ? JSON.parse(guardado) : [];

    return inicial;
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

    //guardamos localmente
    this.persistir();

    //lanzamos la acción al módulo de NgRX
    this.store.dispatch(CartActions.agregarProducto({producto:productoEvent}));
  }

  persistir ()
  {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productoAddedSubject.value));
  }

  vaciarProductos()
  {
    //reset lista de productos navegador
    localStorage.removeItem(STORAGE_KEY);

    //reset lista de productos RAM
    this.productoAddedSubject.next([]);

  }
}
