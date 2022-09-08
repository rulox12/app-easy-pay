import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterCommerces'
})
export class FilterCommercesPipe implements PipeTransform {

  transform(values: any[], text: string): unknown {
    text = text?.toLowerCase();
    if (undefined === text) {
      return values;
    }
    return values?.filter(item => {
      return item.name.toLowerCase().includes(text);
    });
  }

}
