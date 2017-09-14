import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.pug',
  styleUrls: [
    './list-item.component.styl'
  ],
})
export class ListItem {
  @Input() product;
  @Input() removeProductFromList;
  @Input() index; 

}
