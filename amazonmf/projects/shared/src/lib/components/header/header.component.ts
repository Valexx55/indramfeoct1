import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';
import { map } from 'rxjs';

@Component({
  selector: 'lib-header',
  standalone:true,//no se asocia a un módulo, se puede usar de manera independiente
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[AsyncPipe]
})
export class HeaderComponent {

  //estamos actualizados del número de prodcutos comprados
  comunicationService = inject(CommunicationService);

  totalItems$ = this.comunicationService.producto$.pipe(
    map((lista: ProductoEvent[]) => lista.reduce((acc, p) => acc + (p.cantidad ?? 1), 0))
  )

}
