import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genPipe',
  pure: true
})
export class GenPipePipe implements PipeTransform {

  transform(value: 0|1, ...args: unknown[]): unknown {
    //console.log('gpipe'+value);
    return value ? 'M' : 'D';
  }

}
