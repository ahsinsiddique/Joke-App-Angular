import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Joke } from '../app.component';
import { SortColumn, SortDirection } from '../sortable.directive';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  jokes: Joke[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


function matches(item: Joke, term: string, pipe: PipeTransform) {
  return item.joke.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class JokeService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _jokes$ = new BehaviorSubject<Joke[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
  };
  private _jokes: any;

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
    this.getData();


  }

  get jokes$() { return this._jokes$.asObservable(); }

  get total$() { return this._total$.asObservable(); }

  get loading$() { return this._loading$.asObservable(); }

  get page() { return this._state.page; }

  get pageSize() { return this._state.pageSize; }

  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }

  set pageSize(pageSize: number) { this._set({ pageSize }); }

  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }


  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    let jokes = this._jokes;

    // 2. filter
    jokes = jokes.filter(country => matches(country, searchTerm, this.pipe));
    const total = jokes.length;

    // 3. paginate
    jokes = jokes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ jokes, total });
  }

  getData() {
    this.http.get('http://api.icndb.com/jokes/random/1000').subscribe((data: any) => {
      this._jokes = data.value;
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._jokes$.next(result.jokes);
        this._total$.next(result.total);
      });

      this._search$.next();
      return (this._jokes);
    });
  }
}
