import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsItem, NewsService } from './news-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  news: NewsItem[] = [];
  loading = true;
  error = '';
  channel = new BroadcastChannel('mf-channel');

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = data.results.slice(0, 10);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las noticias';
        this.loading = false;
      },
    });
  }

  //bus de eventos + persistencia
  addFavorite(item: NewsItem): void {

    //1 EMITO POR EL CANAL
    this.channel.postMessage({
      type: 'news:add-favorite',
      payload: item,
    });

    //2. ESCRIBO EN LA MEMORIA DEL NAVEGADOR
    const key = 'mf-favorites';

    const current = JSON.parse(localStorage.getItem(key) || '[]');

    if (!current.some((f: any) => f.id === item.id)) {
      current.push(item);//ACTUALIZAO EL ARRAY DE NOTICIAS FAVORITAS
      localStorage.setItem(key, JSON.stringify(current));//Y LO GUARDO
    }
  }

  ngOnDestroy(): void {
    this.channel.close();
  }
}
