import { Component } from '@angular/core';
import { UrlService } from './core/services/services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notarius URL Shortener by Jeff A.';
  
  displayedColumns: string[] = ['fullURL', 'shortURL'];
  urls$ = this.urlService.getUrls();
  inputUrl: string = '';
  shortUrl: string = '';

  inputShortUrl: string = '';
  originalUrl: string = '';

  constructor(private urlService: UrlService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.urlService.obtenirUrls();
  }

  onShorten() {
    this.urlService.raccourcirUrl(this.inputUrl).subscribe(data => {
      this.shortUrl = data.shortURL;
      this.urlService.obtenirUrls(); 
    });
  }

  onRetrieve() {
    this.urlService.obtenirUrlOriginal(this.inputShortUrl).subscribe(data => {
      this.originalUrl = data.fullURL;
    }, error => {
      this.snackBar.open('Url raccourci non trouvé!', 'Fermer', {
        duration: 3000
      });
    });
  }
}
