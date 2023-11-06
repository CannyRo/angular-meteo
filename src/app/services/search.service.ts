import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Address, City, CityList, Position } from '../city';
import { Observable, catchError, map, of, tap, toArray } from 'rxjs';
import { Weather } from '../weather';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseCityAutocomplete = 'https://autocomplete.search.hereapi.com/v1/autocomplete?q=';
  private optionCityAutocomplete = '&types=city&limit=12';
  private baseCityDetail = 'https://geocode.search.hereapi.com/v1/geocode?';
  private endCity = '&apiKey=_A1sKF1WaVYaS0uaNi9fmF3gBvWa1fY711RtPZvyVBU';

  constructor(private http: HttpClient) {}

  searchCities(term: string): Observable<CityList> {
    if(!term.trim()) {
      console.log("VIDE");
      return of();
    }
    return this.http.get<CityList>(this.baseCityAutocomplete+term+this.optionCityAutocomplete+this.endCity).pipe(
      // tap( response => response.length ?
      //   console.log(`Found cities matching "${term}" :`,response) :
      //   console.log(`No city matching "${term}"`)),
      tap( response => {
        console.log(response.items);
        console.log(typeof(response));
      }),
      // map( items => items),
      catchError(this.handleError<CityList>('searchCity error'))
    );
  }

  getCityLocation(location: Address) : Observable<CityList> {
    if(!location) {
      return of();
    }
    return this.http.get<CityList>(`${this.baseCityDetail}qq=city=${location.city};country=${location.countryName};state=${location.state}${this.endCity}`).pipe(
      tap( response => console.log(response)),
      catchError(this.handleError<CityList>(`getCityLocation named = ${location.city}`))
    )
  }

  getWeatherDetail(position: Position) : Observable<Weather>{
    console.log("Weather Service On");
    console.log(position);
    console.log(position.lat);
    console.log(position.lng);
    console.log(`https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=temperature_2m,apparent_temperature,relativehumidity_2m,is_day,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,sunrise,sunset,uv_index_max&timezone=auto`);
    return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=temperature_2m,apparent_temperature,relativehumidity_2m,is_day,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,sunrise,sunset,uv_index_max&timezone=auto`).pipe(
      tap( response => console.log(response)),
      catchError(this.handleError<Weather>(`getWeatherDetail named error`))
    )
  }

  private log(response:any){
    console.log(response);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
