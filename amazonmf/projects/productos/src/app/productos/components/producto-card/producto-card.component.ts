import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {

  @Input() producto!:Producto;//producto en curso
  @Output() agregar = new EventEmitter<Producto>();

  onAgregar ()
  {
    this.agregar.emit(this.producto);
  }

}
