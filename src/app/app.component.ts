import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { ProductProvider } from './app.products.service';
import { Product } from './model/Product';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {
  public products:Array<Product> = [];
  public myProducts:Array<Product> = [];
  public totalPrice: number = 0;

  constructor(
    public appState: AppState,
    public productProvider: ProductProvider
  ) {
	this.handleProductUpdate = this.handleProductUpdate.bind(this);
  }


  handleProductUpdate() {

    this.productProvider.getProducts()
      .then((res:Array<Product>) => {
        this.products = res;
		this.myProducts = res.filter(item => {
      if (item.inList) return item; 
    });
		this.totalPrice = this.productProvider.calculatePrice();

      })

  }

  public ngOnInit() {
    this.handleProductUpdate();
  }

}
