import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SharedComponent,
    //HeaderComponent//por haber hecho standAlone este C, no debemos integrarlo en la definición del módulo
  ],
  imports: [
  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
