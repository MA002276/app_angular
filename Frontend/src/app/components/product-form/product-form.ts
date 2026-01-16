import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Product } from '../../models/products';
import { ProductServices } from '../../services/product-services';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
@Input() product?: Product;
@Output() productSaved = new EventEmitter<void>();
  
  model: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };
  
  constructor(private productService: ProductServices) { }
  
  ngOnInit(): void {
    if (this.product) {
      this.model = { ...this.product };
    }
  }
  
  onSubmit(): void {
    if (this.model.id) {
      // Mettre à jour
      this.productService.updateProduct(this.model.id, this.model).subscribe(
        () => {
          this.resetForm();
          this.productSaved.emit();
        },
        error => console.error('Error updating product', error)
      );
    } else {
      // Créer
      this.productService.createProduct(this.model).subscribe(
        () => {
          this.resetForm();
          this.productSaved.emit();
        },
        error => console.error('Error creating product', error)
      );
    }
  }
  
  resetForm(): void {
    this.model = {
      name: '',
      description: '',
      price: 0,
      quantity: 0
    };
  }
}