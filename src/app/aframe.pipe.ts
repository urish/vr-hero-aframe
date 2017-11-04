import { Pipe, PipeTransform } from '@angular/core';

// Workaround for Angular calling `toString()` on objects before passing to
// setProperty()

@Pipe({
  name: 'aframe'
})
export class AframePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && typeof value === 'object') {
      return {
        toString: () => value
      };
    }

    return value;
  }

}
