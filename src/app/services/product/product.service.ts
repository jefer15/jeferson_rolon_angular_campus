import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  constructor() {
    this.loadFromLocalStorage();
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    product.id = this.generateId();
    this.products.push(product);
    this.saveToLocalStorage();
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveToLocalStorage();
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    this.saveToLocalStorage();
  }

  private generateId(): number {
    const ids = this.products.map(p => p.id).filter((id): id is number => id !== undefined);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('products');
    if (data) {
      this.products = JSON.parse(data);
    }
  }
}
