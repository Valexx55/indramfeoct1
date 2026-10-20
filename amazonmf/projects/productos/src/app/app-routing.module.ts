import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/components/productos/productos.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:''},
  {path: 'productos', loadChildren: ()=> import('./productos/productos.module').then(m=> m.ProductosModule)},
  //{path: 'productos', component:ProductosComponent},//configuración más simple que funciona igualmente
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
