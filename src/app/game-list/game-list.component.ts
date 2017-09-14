import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ProductProvider } from '../app.products.service';
import { Product } from '../model/Product'

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.pug',
  styleUrls: ['./game-list.component.styl']
})
export class GameList implements OnInit {
  @Input() products: Array<Product>;
  @Input() updateApp;
  @Input() totalPrice: number;

  private removeProductFromList;
  private clearProductList;

  constructor(private productHandler: ProductProvider) {
      this.removeProductFromList = (product) => {
        this.productHandler.removeProductFromList(product);
        this.updateApp();
      }
      this.clearProductList = () => {
        this.productHandler.clearProductList();
        this.updateApp();
      }
  }

  public ngOnInit() {
    console.log('Init game list component');

  }

}
