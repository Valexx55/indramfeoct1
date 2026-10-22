import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../productos/models/producto.model';

@Injectable()
export class ProductosInterceptor implements HttpInterceptor {

  constructor() {}

  //interceptamos la pertición al api de productos para adaptar el modelo de datos al nuestro
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //solo transformamos las peticiones al API de productos
    if (request.url.includes('fakestoreapi.com/products'))
    {
      return next.handle(request).pipe(
        map (event => {
          if (event instanceof HttpResponse && Array.isArray(event.body))
          {
            let productos: Producto[] = event.body.map((item:any) => ({
              id: item.id, 
              nombre: item.title,
              precio: Number(item.price)
            }));
            return event.clone({body:productos})//es inmutable, al modificar el HTTPRESPONSE debo crear uno nuevo
          }
          return event;
        })
      )
    }
    //otras URLS pasan sin el filtro / las dejamos pasar al servidor
    return next.handle(request);
  }
}
