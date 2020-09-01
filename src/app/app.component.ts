import { Component } from '@angular/core';

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

}
