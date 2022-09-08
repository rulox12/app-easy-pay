import {NgModule} from '@angular/core';
import { FilterCommercesPipe } from './filter-commerces.pipe';

@NgModule({
  declarations: [
    FilterCommercesPipe
  ],
  exports: [
    FilterCommercesPipe
  ],
  imports: []
})
export class PipesModule{
}
