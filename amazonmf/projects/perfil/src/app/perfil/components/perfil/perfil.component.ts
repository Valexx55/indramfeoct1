import { Perfil } from './../../models/perfil.model';
import { Component, inject, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private perfilService = inject(PerfilService);
  perfil:Perfil;

  constructor(){
    this.perfil = this.perfilService.getPerfil();
  }
 
  ngOnInit(): void {
    this.perfil = this.perfilService.getPerfil();
  }

}
