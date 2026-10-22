import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@core-lib';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from '@shared-lib';

@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({carrito: cartReducer}), //inicializa el Store del NGRX y carrito es nuestro slice, cartRedcuer que contiene el estado inicial y la reacción a las acciones 
    StoreDevtoolsModule.instrument({
      maxAge: 25, //tamaño de memoria de estados
      logOnly: isDevMode(),
      traceLimit: 75,
      trace: false,
      autoPause: true
    }),
    HeaderComponent//aunque sea un Componente, acutúa con la apariencia de un módulo a la hora de reutilizarse/refeernciarse
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
