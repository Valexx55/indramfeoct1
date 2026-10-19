import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/components/perfil/perfil.component';

const routes: Routes = [

  {path: '', pathMatch:'full', redirectTo:''},
  //ruta al módulo de Perfil
  {path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m=>m.PerfilModule)},
  //ruta comodín
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
