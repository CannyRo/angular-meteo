import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, toArray, switchMap, shareReplay, Subscription, of, tap } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { Address, City, CityList, Position } from 'src/app/city';
import { Weather } from 'src/app/weather';
import { Coordinates, LocationData } from 'src/app/location';
import { FacadeService } from 'src/app/services/facade.service';
import { CityObjectToStringPipe } from "../../services/city-object-to-string.pipe";

@Component({
    selector: 'app-search-bar',
    standalone: true,
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
    imports: [CommonModule, CityObjectToStringPipe]
})
export class SearchBarComponent implements OnInit, OnChanges{

  @Input() searchTerm!: string | null;

  @Input() cities!: LocationData[] | null;

  @Input() citySelected!: LocationData | null;

  @Output() handleTerm = new EventEmitter<string>();

  // @Output() selectCity = new EventEmitter<Address>();

  @Output() getWeatherData = new EventEmitter<Coordinates>();

  // ###
  cityPosition!:Position|undefined;
  // ###
  weather!:Weather|undefined;


  ngOnInit(): void {
    // console.log("ngOnInit from Searchbar Component");
  }

  ngOnChanges() : void {
    console.log("ngOnChanges SEARCHBAR");

    console.log(this.searchTerm);
    // if(this.cities && this.cities.length == 1){
    //   console.log("On veut chercher le détail de cette ville : ");
    //   let locationLocal = this.cities[0].address;
    //   console.log(locationLocal);
    //   this.getLocation(locationLocal);
    // }
    // if(this.citySelected){
    //   console.log("Positions : ",this.citySelected.position)
    //   this.cityPosition = this.citySelected.position
    // }
  }

  handleChange(term:string): void {
    this.handleTerm.emit(term);
  }

  getWeatherbis(latitude: number, longitude: number){
    const coordinatesRequiered : Coordinates = {
      latitude: latitude,
      longitude: longitude
    } 
    console.log(`GET Weather from : lat ${latitude} and long ${longitude}`);
    if(!latitude && !longitude){
      console.log("Position unknown... search a city");
      return;
    }
    this.getWeatherData.emit(coordinatesRequiered);
  }

  getWeather(term :string){
    if(!term.includes("latitude") && !term.includes("longitude")){
      console.log("Localisation unknown");
      return
    }
    console.log("CLICK");
    console.log(this.cities);
  }

  // getLocation(location:Address){
  //   console.log("GetLocation from SEARCHBAR");
  //   this.selectCity.emit(location);
  // }

  // getWeather(position:Position|undefined){
  //   console.log("GET Weather from : ",position);
  //   if(position){
  //     console.log('IF is OK');
  //     this.getWeatherData.emit(position);
  //   } else {
  //     console.log("Position unknown!!")
  //   }
  // }

}
