import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/city';
import { Weather } from 'src/app/weather';
import { Coordinates, LocationData } from 'src/app/location';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnChanges, OnDestroy{

  // cities$: Observable<City[]> = this.facade.cities$;
  // city$: Observable<City> = this.facade.city$;

  @Input() city!: LocationData | null;
  @Input() weather!: Weather | null;

  constructor( private facade: FacadeService){}

  ngOnInit(): void {
    // console.log(this.cities);
    // if(this.cities?.length == 1){
    //   console.log("== Datas in Overview ==")
    //   console.log(this.cities)
    // }
    
    // console.log("WEATHER in Overview ngOnInit==>", this.weather);
  }

  ngOnChanges(): void {
    console.log("== OVERVIEW ONCHANGE ==")
    console.log(this.city);
    console.log(this.city?.latitude);
    console.log(this.city?.longitude);
    console.log("WEATHER in Overview ngOnInit==>", this.weather);
    // if(this.city !== null){console.log("OVERVIEW ==>", this.city)};
    // if(this.weather !== null){console.log("OVERVIEW WEATHER ==>", this.weather)};
  }

  ngOnDestroy(): void {
    
  }
}
