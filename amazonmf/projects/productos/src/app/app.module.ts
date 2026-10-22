import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@core-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({carrito: cartReducer})//iniiciamos el Store en el MICRO Prodcutos para que esté disponible independientemente
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
