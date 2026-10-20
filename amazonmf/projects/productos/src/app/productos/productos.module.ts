import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoCardComponent } from './components/producto-card/producto-card.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductoCardComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
