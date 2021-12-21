import { Pipe, PipeTransform } from '@angular/core';
import { edictItem } from './lesson1/classStore';

@Pipe({
  name: 'uppercasetitlePipe'
})
export class UppercasetitlePipePipe implements PipeTransform {

  transform(item: edictItem): edictItem {
    if (item.header.length > 0) {
      let firstSymbol = item.header.charAt(0).toLocaleUpperCase();
      let lastSymbols = item.header.slice(1).toLocaleLowerCase();
      item.header = firstSymbol + lastSymbols;
    }
    return item;
  }

}
