export class Product {
  name: string;
  price: number;
  cover: string;
  inList: boolean; 
  key: any;

  constructor(obj?) {
    this.name = obj.name || null;
  	this.price = obj.price || 0;
  	this.cover = obj.cover || null;
    this.inList = obj.inList || false; 
	this.key = obj.key || null; 

  }
}
