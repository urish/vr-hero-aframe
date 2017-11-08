import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aframe'
})
export class AframePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value && typeof value === 'object') {
      return { toString: () => value };
    }

    return value;
  }
}
