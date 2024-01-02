import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { OverviewComponent } from "../overview/overview.component";
import { FavoriteComponent } from "../favorite/favorite.component";
import { Observable, Subject } from 'rxjs';
import { Address, City, Position } from 'src/app/city';
import { Weather } from 'src/app/weather';
import { Coordinates, LocationData } from 'src/app/location';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, SearchBarComponent, OverviewComponent, FavoriteComponent]
})
export class HomeComponent implements OnInit, OnChanges{
    // SMART COMPONENT

    searchTerm$: Observable<string> = this.facade.searchTerm$;
    cities$: Observable<LocationData[]> = this.facade.cities$;
    // cities$!: Observable<City[]>
    city$: Observable<LocationData> = this.facade.city$;
    weather$: Observable<Weather> = this.facade.weather$;

    citySearched: string = '';

    constructor( private facade: FacadeService){}

    ngOnInit(): void {
        // this.mutateSearch();
        console.log("ngOnInit from Home Component");
    }

    ngOnChanges() : void {
        // this.cities$ = this.mutateSearch(); 
        console.log("ngOnChange from Home Component");
    }

    handleSearch(term:string) {
        console.log("handleSearch activated in Home Component by SerachBar Component");
        this.facade.handleSearch(term);
    }

    // selectCity(location:Address){
    //     console.log("GetLocation from HOME");
    //     this.facade.selectCity(location);
    // }

    // getWeather(position:Position){
    //     console.log("GetWeather from HOME : ",position);
    //     this.facade.getWeather(position);
    // }

    getWeatherData(coordinates: Coordinates){
        console.log(`GetWeatherData from FACADE => lat ${coordinates?.latitude} and long ${coordinates?.longitude}`);
        this.facade.getWeatherData(coordinates);
    }    



}
