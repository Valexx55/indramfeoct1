import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/components/carrito/carrito.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:''},
  {path: 'carrito', loadChildren: ()=> import('./carrito/carrito.module').then(m=> m.CarritoModule)},
  //{path: 'carrito', component: CarritoComponent},
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
