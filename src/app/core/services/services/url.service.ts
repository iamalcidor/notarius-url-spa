import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { URLData } from '../../models/URLData.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8080/api';
  private urlsSubject: BehaviorSubject<URLData[]> = new BehaviorSubject<URLData[]>([]);

  constructor(private http: HttpClient) { }

  getUrls(): Observable<any[]> {
    return this.urlsSubject.asObservable();
  }

  obtenirUrls() {
    this.http.get<URLData[]>(`${this.apiUrl}/urls`).subscribe(data => {
      this.urlsSubject.next(data);
    });
  }

  raccourcirUrl(fullURL: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shortenurl`, { fullURL });
  }

  obtenirUrlOriginal(shortUrl: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/original?shortURL=${shortUrl}`);
  }
}
