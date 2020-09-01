import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Joke } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getJokeById(joke_id: number): Observable<any> {
    return this.http.get(`http://api.icndb.com/jokes/${joke_id} `);
  }
}
