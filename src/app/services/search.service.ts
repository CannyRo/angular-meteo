import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Address, City, CityList, Position } from '../city';
import { Observable, catchError, filter, map, of, shareReplay, tap, toArray } from 'rxjs';
import { Weather } from '../weather';
import { Coordinates, LocationData } from '../location';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseCityAutocomplete = 'https://autocomplete.search.hereapi.com/v1/autocomplete?q=';
  private optionCityAutocomplete = '&types=city&limit=12';
  private baseCityDetail = 'https://geocode.search.hereapi.com/v1/geocode?';
  private endCity = '&apiKey=_A1sKF1WaVYaS0uaNi9fmF3gBvWa1fY711RtPZvyVBU';

  constructor(private http: HttpClient) {}


  // searchCity(term: string): Observable<City[]> {
  //   console.log("Service ON with term : ",term);
  //   if(!term.trim()) {
  //     console.log("VIDE");
  //     return of([]);
  //   }
  //   return this.http.get<any>(this.baseCityAutocomplete+term+this.optionCityAutocomplete+this.endCity).pipe(
  //     tap(response => {
  //       console.log(response.items);
  //       console.log(typeof(response));
  //     }),
  //     map(response => response.items),
  //     tap(response => console.log(response)),
  //     catchError(this.handleError<any>('searchCity error'))
  //   );
  //}


  // getLocation(location: Address) : Observable<City> {
  //   console.log("GETLOCATION is ON in Services", location);
  //   if(!location) {
  //     console.log("No location");
  //     return of();
  //   }
  //   return this.http.get<any>(`https://geocode.search.hereapi.com/v1/geocode?qq=city=${location.city};country=${location.countryName};state=${location.state}${this.endCity}`).pipe(
  //     // tap(response => console.log(response.items)),
  //     map(response => response.items[0]),
  //     // tap(response => console.log(response)),
  //     // shareReplay(1),
  //     catchError(this.handleError<any>('getLocation error'))
  //   )
  // }

  getCityData(term: string) : Observable<LocationData[]> {
    console.log("Service ON with term : ",term);
    if(!term.trim()) {
      console.log("VIDE");
      return of([]);
    }
    let termToArray : string[] = term.split(" ");
    let formatedTerm : string | undefined = termToArray.at(0);
    // let foo : string | undefined = termToArray.at(1);
    let foo : string | undefined = "00000"; 
    if(termToArray.at(1)!== undefined){
      foo = termToArray.at(1)
    }
    // return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${formatedTerm}&count=12&language=en&format=json`).pipe(
    //   tap(response => {
    //     console.log(response.results);
    //     console.log(typeof(response));
    //   }),
    //   map(response => response.results),
    //   // filter(response => (response.postcodes && response.postcodes[0] == foo) ? response.postcodes[0] == foo : response
    //   // filter(response => !response.postcodes[0]==undefined),
    //   // filter( response => {
    //   //     if(!response.postcodes[0]==undefined){
    //   //       response.postcodes[0] == foo
    //   //     } else {
    //   //       response
    //   //     }
    //   //   }
    //   tap(response => foo!==undefined ?  console.log("Foo = ",foo) : console.log("FOO IS UNDEFINED")
    //     // if(response.postcodes && response.postcodes[0]==foo){
    //     //   console.log(response.postcodes);
    //     // }
    //     // console.log("Foo = ",foo);
    //   ),
    //   // filter(response => foo!==undefined ? response?.postcodes[0] == foo : response == response),
    //   filter(response => (foo!==undefined && response?.postcodes[0] == foo) ? response?.postcodes[0] == foo : response),
    //   tap(response => {
    //     console.log("===ICI===");
    //     console.log(response);
    //   }),
    //   catchError(this.handleError<any>('getCityData error'))
    // );
    if(foo !== "00000"){
      console.log("### FOO ###");
      console.log(foo);
      console.log(typeof(foo));
      return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${formatedTerm}&count=12&language=en&format=json`).pipe(
        tap(response => {
          console.log(response.results);
          console.log(typeof(response));
        }),
        map(response => response.results),
        // filter(response => response.postcodes[0] == foo),
        // map(response => console.log("TIC ET TAC")),
        map(response => response.filter((res: LocationData) => res.postcodes && res.postcodes[0] == foo
        // map(response => response.filter((res: LocationData) => {if(res.postcodes && res.postcodes[0] == foo){response}}
          // if(res.postcodes && res.postcodes[0] == foo){
          // console.log("Postcodes : ");
          // console.log(res.postcodes);
          // console.log(res.postcodes[0]);
          // console.log(typeof(res.postcodes[0]));
          // console.log("FOO = ",foo);
          // console.log(typeof(foo));
          // res}
          // } else {
          //   console.log(`PAS DE POSTCODES POUR ${res.name}, ${res.admin2}, ${res.country}`);
          // }
        )),
        // map(response => response.filter((res: LocationData) => res.postcodes&&res.postcodes[0]==foo)),
        tap(response => {
          console.log("##==//  MIRA  //==##");
          console.log(response);
        }),
        catchError(this.handleError<any>('getCityData error'))
      );
    } else {
      return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${formatedTerm}&count=12&language=en&format=json`).pipe(
        tap(response => {
          console.log(response.results);
          console.log(typeof(response));
        }),
        map(response => response.results),
        tap(response => {
          console.log("===ICI===");
          console.log(response);
        }),
        catchError(this.handleError<any>('getCityData error'))
      );
    };

    // if(!term.includes(" ")){
    //   console.log("PAS d'espace donc recherche liste de résultat");
    //   formatedTerm = term;
    //   return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${formatedTerm}&count=12&language=en&format=json`).pipe(
    //     tap(response => {
    //       console.log(response.results);
    //       console.log(typeof(response));
    //     }),
    //     map(response => response.results),
    //     tap(response => console.log(response)),
    //     catchError(this.handleError<any>('getCityData error'))
    //   );
    // } else {
    //   console.log("Espaces donc recherche d'un seul résultat");
    //   termToArray = term.split(" ");
    //   formatedTerm = termToArray.at(0);
    //   let foo = termToArray.at(1)
    //   // let foo = termToArray.indexOf("latitude")+1;
    //   // let bar = termToArray.indexOf("longitude")+1;
    //   // lat = Number(termToArray.at(foo));
    //   // long = Number(termToArray.at(bar));
    //   return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${formatedTerm}&count=12&language=en&format=json`).pipe(
    //     tap(response => {
    //       console.log(response.results);
    //       console.log(typeof(response));
    //     }),
    //     map(response => response.results),
    //     // filter( response => (response.latitude == lat) && (response.longitude == long)),
    //     filter( response => response.postcodes[0] == foo),
    //     tap(response => {
    //       console.log("===ICI===");
    //       console.log(response);
    //     }),
    //     catchError(this.handleError<any>('getCityData error'))
    //   );
    // };
  }

  getWeatherData(coordinates: Coordinates) : Observable<Weather>{
    console.log(`Weather Service On => lat ${coordinates?.latitude} and long ${coordinates?.longitude}`);
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates?.latitude}&longitude=${coordinates?.longitude}&current=temperature_2m,apparent_temperature,relativehumidity_2m,is_day,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,sunrise,sunset,uv_index_max&timezone=auto`).pipe(
      tap( response => console.log(response)),
      catchError(this.handleError<Weather>(`getWeatherDetail named error`))
    );
  }

  // getWeatherDetail(position: Position) : Observable<Weather>{
  //   console.log("Weather Service On => ",position);
  //   return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current=temperature_2m,apparent_temperature,relativehumidity_2m,is_day,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,sunrise,sunset,uv_index_max&timezone=auto`).pipe(
  //     tap( response => console.log(response)),
  //     catchError(this.handleError<Weather>(`getWeatherDetail named error`))
  //   );
  // }

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
