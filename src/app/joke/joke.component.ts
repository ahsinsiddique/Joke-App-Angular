import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NgbdSortableHeader } from '../sortable.directive';
import { JokeService } from '../services/joke.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Joke } from '../app.component';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  jokes: Observable<Joke[]>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: JokeService,
              private http: HttpClient,
              private router: Router) {
    this.jokes = service.jokes$;

  }

  ngOnInit(): void {}

  onJokeClick(joke: Joke) {
    this.router.navigate(['/joke'], { queryParams: { id: joke.id} });
  }

}
