import { Component, Input, OnInit } from '@angular/core';
import { Joke } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-joke-detail',
  templateUrl: './joke-detail.component.html',
  styleUrls: ['./joke-detail.component.scss']
})
export class JokeDetailComponent implements OnInit {
  @Input() joke: Joke;
  id;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.

        this.id = +params['id'] || 0;
        this.getJoke(this.id);
      });
  }

  getJoke(id: number) {
    this.dataService.getJokeById(id).pipe(map((data: any) => data.value)).subscribe((resp: any) => {
      this.joke = resp;
    });
  }

}
