import { Component, Input } from '@angular/core';

@Component({
  selector: 'catalogue-item',
  templateUrl: './catalogue-item.component.pug',
  styleUrls: ['./catalogue-item.component.styl']
})
export class CatalogueItem {
  @Input() product;
  @Input() addToList; 
  @Input() index; 

  private buttonText = "Add to my list"; 
 }
