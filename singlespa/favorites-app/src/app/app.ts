import { Component, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


interface FavoriteItem {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
}

interface FavoriteMessage {
  type: string;
  payload: FavoriteItem;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  favorites: FavoriteItem[] = [];
  channel = new BroadcastChannel('mf-channel');

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const key = 'mf-favorites';

    const saved = localStorage.getItem(key);

    if (saved) {
      this.favorites = JSON.parse(saved);
    }

    this.channel.onmessage = (event: MessageEvent<FavoriteMessage>) => {
      //importante ngZone no revisa por defecto el estado del componente-plantilla
      //ante un mensaje broadCastChannel. Debemos incluir la actulación dentro de la función run
      //de ngZone para que se reevalúe el estado del componente y su correspondencia con la plantilla
      //relación signal:zoneLess
     this.ngZone.run(() => {
        if (event.data.type === 'news:add-favorite') {
          const item = event.data.payload;

          if (!this.favorites.some((f) => f.id === item.id)) {
            this.favorites.push(item);
            localStorage.setItem('mf-favorites', JSON.stringify(this.favorites));
          }

          console.log('Favorito recibido', item);
          console.log('Favorites actualizados', this.favorites);
        }
     });
    };
  }

  ngOnDestroy(): void {
    this.channel.close();
  }

  /*removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((f) => f.id !== id);
    //TODO: eliminar favoritos del navegador
  }*/

  removeFavorite(id: number): void {
  // 1. Eliminar de la lista local
  this.favorites = this.favorites.filter(f => f.id !== id);

  // 2. Actualizar localStorage
  localStorage.setItem('mf-favorites', JSON.stringify(this.favorites));

  // 3. Notificar a los microfrontends
  //SIN EFECTO , SÓLO PARA LOS SUSCRUPTORES
  /*this.channel.postMessage({
    type: 'news:remove-favorite',
    payload: id,
  });*/

  console.log('Favorito eliminado:', id);
  console.log('Favorites actualizados:', this.favorites);
}
}
