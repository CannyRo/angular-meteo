import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, toArray, switchMap, shareReplay, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { Address, City, CityList, Position } from 'src/app/city';
import { Weather } from 'src/app/weather';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy{

  private searchTerms = new Subject<string>();
  city$!: Observable<CityList>
  foo$!:Observable<City[]>

  yourCityRaw$!:Observable<CityList>
  yourCity$!:Observable<City>

  weather$!:Observable<Weather>

  fooSub!: Subscription;
  citySub!: Subscription;
  weatherSub!:Subscription;


  yourCity!:Address;
  cityPosition!:Position|undefined;
  weather!:Weather|undefined;

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
    this.fooSub = this.foo$.subscribe(city => this.yourCity=city[0].address);
    console.log(this.yourCity);
    this.getLocation(this.yourCity);
  }

  getLocation(location:Address){
    console.log("Get location");
    this.yourCityRaw$ = this.searchService.getCityLocation(location);
    this.citySub = this.yourCityRaw$.subscribe( response => this.cityPosition = response.items[0].position);
    console.log(this.cityPosition);
    this.getWeather(this.cityPosition);
  }

  getWeather(position:Position|undefined){
    console.log("GET Weather");
    if(position){
      console.log('IF is OK')
      this.weather$ = this.searchService.getWeatherDetail(position);
      this.weatherSub = this.weather$.subscribe( response => this.weather = response);
    }
  }

  ngOnDestroy(){
    this.fooSub.unsubscribe();
    this.citySub.unsubscribe();
    this.weatherSub.unsubscribe();

  }
}
