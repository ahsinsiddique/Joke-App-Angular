import { Component } from '@angular/core';
import { darkModeCss } from './services/config';

export interface Joke {
  id: string,
  joke: string,
  categories: []
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  handleDarkMode(isNightMode) {
    if (isNightMode ) {
      document.getElementById('night-mode').innerHTML = darkModeCss;
    } else {
      document.getElementById('night-mode').innerHTML = '';
    }
  }
}
