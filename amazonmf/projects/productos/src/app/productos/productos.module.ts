import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoCardComponent } from './components/producto-card/producto-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductosService } from './services/productos.service';
import { ProductosInterceptor } from '../interceptors/productos.interceptor';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductoCardComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    HttpClientModule//para Disponer de Comunicación HTTP en este módulo
  ],
  providers:[
    ProductosService, {provide: HTTP_INTERCEPTORS, useClass: ProductosInterceptor, multi:true}
  ]
})
export class ProductosModule { }
