import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/data-\w+='.*'/g, '');
  }

}
