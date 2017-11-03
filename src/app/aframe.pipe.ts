import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aframe'
})
export class AframePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && typeof value === 'object') {
      let result = '';
      for (const property of Object.keys(value)) {
        if (result.length > 0) {
          result += '; ';
        }
        const propVal = value[property];
        result += property + ': ' + propVal;
      }
      return result;
    }

    return value;
  }

}
