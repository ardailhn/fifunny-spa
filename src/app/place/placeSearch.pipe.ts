import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../models/place';

@Pipe({
  name: 'placeSearch'
})
export class PlaceSearchPipe implements PipeTransform {

  transform(value: Place[], filterText?: string): Place[] {
    filterText = filterText?.toLocaleLowerCase();

    return filterText?value.filter((p:Place)=>p.name.toLocaleLowerCase().indexOf(filterText?filterText:"")!==-1):value;
  }

}
