import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Address, City, Position } from '../city';
import { Weather } from '../weather';
import { Coordinates, LocationData } from '../location';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  searchTerm = new Subject<string>();
  // cities = new Subject<City[]>;
  cities = new Subject<LocationData[]>;
  // city = new Subject<City>;
  city = new Subject<LocationData>;
  weather = new Subject<Weather>;

  searchTerm$ = this.searchTerm.asObservable();
  cities$ = this.cities.asObservable();
  city$ = this.city.asObservable();
  weather$ = this.weather.asObservable();

  constructor(private searchService: SearchService) {
    console.log("CONSTRUCTOR");
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> this.searchService.getCityData(term)),
    ).subscribe((cities: LocationData[])=> {
      this.cities.next(cities);
    });
    // this.searchTerm.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.searchService.getCityData(term))
    // );
    
    // this.cities$.subscribe((cities: Location[]) => {
    //   this.cities.next(cities);
    // });

    // this.cities$.subscribe((cities: City[]) => {
    //   if(cities.length == 1){
    //     this.city$ = this.searchService.getLocation(cities[0].address);
    //     this.city$.subscribe((city : City) => {
    //       console.log("CITY", city)
    //       this.city.next(city)});
    //   }
    // })

    // this.weather$.subscribe((weatherData: Weather) => {
    //   if(weatherData){
    //     console.log(weatherData);
    //   this.weather.next(weatherData);
    //   } else {
    //     console.log("Weather unknown");
    //   }
    // });

    // this.city$.subscribe((city: City) => {
    //   if(city.position){
    //     this.weather$ = this.searchService.getWeatherDetail(city.position);
    //   }
    // })
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.searchService.searchCity(term)));
  }

  handleSearch(term:string) {
    this.searchTerm.next(term);
  }

  // selectCity(location:Address){
  //   console.log("GetLocation from FACADE");
  //   this.city$ = this.searchService.getLocation(location);
  // }

  // getWeather(position:Position){
  //   console.log("GetWeather from FACADE : ",position);
  //   // this.weather$ = this.searchService.getWeatherDetail(position);
  //   this.weather$.subscribe( (weather : Weather)=>{
  //     this.weather.next(weather);
  //   });
  // }

  getWeatherData(coordinates: Coordinates){
    console.log(`GetWeatherData from FACADE => lat ${coordinates?.latitude} and long ${coordinates?.longitude}`);
    this.weather$.subscribe( (weather : Weather)=>{
      this.weather.next(weather);
    });
  }

  getCityData(term: string){
    console.log("getCityData from FACADE");
  }

  
}
