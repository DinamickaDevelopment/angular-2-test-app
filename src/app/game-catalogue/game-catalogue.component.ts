import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ProductProvider } from '../app.products.service';
import { Product } from '../model/Product'

@Component({
  selector: 'game-catalogue',
  templateUrl: './game-catalogue.component.pug',
  styleUrls: ['./game-catalogue.component.styl']
})
export class GameCatalogue implements OnInit {
  @Input() products: Array<Product>;
  @Input() updateApp;
  private addProductToList; 

  constructor(private productHandler: ProductProvider) {
      this.addProductToList = (product) => {
        this.productHandler.addProductToList(product);
        this.updateApp();
      }
  }
  public ngOnInit() {
    console.log('Init game catalogue component');
  }
}
