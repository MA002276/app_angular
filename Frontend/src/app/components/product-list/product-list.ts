import { Component, OnInit } from "@angular/core";
import { Product } from '../../models/products';
import { ProductServices } from '../../services/product-services';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
products: Product[] = [];
  private _selectedProduct?: Product;
  
  get selectedProduct(): Product | undefined {
    return this._selectedProduct;
  }
  
  set selectedProduct(product: Product | undefined) {
    this._selectedProduct = product;
    console.log('Selected product changed to:', product);
  }
  
  constructor(private productService: ProductServices) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.error('Error loading products', error)
    );
  }
  
  selectProduct(product: Product): void {
    console.log('Selecting product:', product);
    this.selectedProduct = product;
  }
  
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== id);
        this.selectedProduct = undefined;
      },
      error => console.error('Error deleting product', error)
    );
  }
  
  onProductSaved(): void {
    this.loadProducts();
    this.selectedProduct = undefined;
  }
}
