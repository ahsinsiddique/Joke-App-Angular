import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  total$: Observable<number>;
  constructor(public service: JokeService) {
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

}
