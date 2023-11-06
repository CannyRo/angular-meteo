import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, toArray, switchMap, shareReplay } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { Address, City, CityList, Position } from 'src/app/city';

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

  yourCityRaw$!:Observable<CityList>
  yourCity$!:Observable<City>

  private coordinate$ = new Subject<Position>();

  yourCity!:Address;
  cityPosition!:Position|undefined;

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
      map( response => response.items),
      shareReplay(1)
    );
    console.log(typeof(this.foo$));
  }

  search(term:string): void {
    this.searchTerms.next(term);
  }

  searchWeather(){
    const LastLocation = this.foo$.subscribe(city => this.yourCity=city[0].address);
    console.log(this.yourCity);
    // const LastLocation = this.foo$.subscribe(city => console.log(city[0].address))
    this.getLocation(this.yourCity);
  }

  getLocation(location:Address){
    console.log("Get location");
    this.yourCityRaw$ = this.searchService.getCityLocation(location);
    this.yourCityRaw$.subscribe( response => this.cityPosition = response.items[0].position);
    // this.yourCityRaw$.subscribe( response => console.log(response.items[0].position));
    // this.yourCityRaw$.subscribe( city => this.cityPosition = city.items[0].position);
    // return information
    console.log(this.cityPosition)
  }

  getWeather(position:Position){
    console.log("GET Weather");
    
  }


}
