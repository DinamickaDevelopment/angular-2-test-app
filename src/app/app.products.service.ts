import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Product } from './model/Product';
import 'rxjs/add/operator/map';

let productUrl = window.location.href + '/assets/products.json'

/**
 * Product Provider Service
 */
@Injectable()
export class ProductProvider {
  public products: Array<Product>;

  constructor( @Inject(Http) private http: Http) { }

  getProducts() {

    return new Promise((resolve, reject) => {
      let products = this.getFromStorage('products');
      if (products) {
        resolve(products);
      }
      else {
        this.getProductsHttp()
          .subscribe(products => {
            resolve(products);
          })
      }
    })
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  getProductsHttp(): Observable<Product[]> {
    return this.http.get(productUrl).map((resp: Response) => {

      let responseObj = resp.json();
      let products = Object.keys(responseObj).map((key, i) => new Product(Object.assign(responseObj[i + 1], { key: i })));

      this.saveToStorage("products", products);
      return products;
    });
  }

  saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  getFromStorage(key) {
    let val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
    else return null;
  }

  addProductToList(index) {
    let products = this.getFromStorage('products');
    products[index].inList = true;

    this.saveToStorage('products', products);
  }

  removeProductFromList(key) {
    let products = this.getFromStorage('products');
    let index = this.findWithAttr(products, 'key', key);
    products[index]['inList'] = false;

    this.saveToStorage('products', products);
  }

  clearProductList() {
    let products = this.getFromStorage('products');
    products = products.map(el => Object.assign(el, {inList: false}));

    this.saveToStorage('products', products);
  }

  calculatePrice() {
    let products = this.getFromStorage('products')
      .filter(item => {
        if (item.inList) return item;
      });
    let price;
    products.length > 0 ? price = products.reduce((a, b) => a + b.price, 0) : price = 0;
    return price;
  }

}
