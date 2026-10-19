import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private perfil:Perfil = {
    nombre: 'INDRA Company',
    correo: ' indracompany@indra.es'
  }

  constructor() { }

  getPerfil()
  {
    return this.perfil;
  }

  actualizarPerfil (nombre:string, correo:string)
  {
    this.perfil = {nombre, correo};
  }
}
