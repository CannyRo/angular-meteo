import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, toArray, switchMap } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { City, CityList } from 'src/app/city';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  private searchTerms = new Subject<string>();
  city$!: Observable<CityList>

  foo$!:Observable<City[]>

  constructor(
    private searchService: SearchService
  ){}

  ngOnInit(): void {
    this.city$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.searchCities(term)),
    );
    this.foo$ = this.city$.pipe(
      map( response => response.items)
    )
  }

  search(term:string): void {
    this.searchTerms.next(term);
  }
}
