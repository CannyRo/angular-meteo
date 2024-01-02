import { Pipe, PipeTransform } from '@angular/core';
import { LocationData } from '../location';

@Pipe({
  name: 'cityObjectToString',
  standalone: true
})
export class CityObjectToStringPipe implements PipeTransform {

  transform(city: LocationData): string | undefined {
    if(city.name && city.postcodes && city.admin2 && city.country && city.latitude && city.longitude){
      return `${city.name} ${city.postcodes[0]} ${city.admin2} ${city.country} latitude ${city.latitude} longitude ${city.longitude}`;
    }
    if(city.name && !city.postcodes && city.admin2 && city.country && city.latitude && city.longitude){
      return `${city.name} ${city.admin2} ${city.country} latitude ${city.latitude} longitude ${city.longitude}`;
    }
    return `${city.name} ${city.country} latitude ${city.latitude} longitude ${city.longitude}`;
  }

}
