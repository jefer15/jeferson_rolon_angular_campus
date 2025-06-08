import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product/product.model';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatOptionModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  product!: Product;
  idProduct!: number;
  productForm!: FormGroup;
  categories = ['Hogar', 'Estudio', 'Libros', 'Deportes'];
  isEditMode:boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idProduct = +params['id'];
        this.isEditMode = true;
        this.product = this.findById(this.idProduct)!;
      }
    });
    this.constructorForm();
  }

  constructorForm() {
    this.productForm = this.fb.group({
      name: [this.product ? this.product.name : '', Validators.required],
      description: [this.product ? this.product.description : '', Validators.required],
      price: [this.product ? this.product.price : 0, [Validators.required, Validators.min(0)]],
      category: [this.product ? this.product.category : '', Validators.required],
      available: [this.product ? this.product.available : true, Validators.required]
    });
  }

  findById(id: number) {
    return this._productService.getProductById(id);
  }

  cancel() {
    this.router.navigate(['']);
  }

  save() {

    if (this.productForm.valid) {

      let productData: Product = {
        name: this.productForm.get('name')?.value,
        description: this.productForm.get('description')?.value,
        price: this.productForm.get('price')?.value,
        category: this.productForm.get('category')?.value,
        available: this.productForm.get('available')?.value
      }

      if (this.product?.id) {
        productData = { ...productData, id: this.product.id };
        this._productService.updateProduct(productData);
        Swal.fire({
          title: "Producto",
          text: "Se ha actualizado exitosamente el producto",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then(() => {
          this.cancel();
        });
      } else {
        this._productService.addProduct(productData);
        Swal.fire({
          title: "Producto",
          text: "Se ha creado exitosamente el producto",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then(() => {
          this.cancel();
        });
      }
    }

  }
}
