import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  getNews(): Observable<{ results: NewsItem[] }> {
    return this.http.get<{ results: NewsItem[] }>(this.apiUrl);
  }
}
