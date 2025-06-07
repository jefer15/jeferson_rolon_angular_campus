import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'available', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _productService: ProductService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dataSource.data = this._productService.getProducts();
    console.log(this.dataSource.data);
  }

  addProduct() {
    this.router.navigate(['/create']);
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: "¿Esta Seguro de eliminar el producto?",
      icon: 'info',
      text: "Una vez eliminado no se podrá volver a ver este producto.",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#00539a"
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(product.id!)
        Swal.fire({
          title: "Producto",
          text: "Se ha eliminado exitosamente el producto",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then(() => {
          this.getProducts();
        });
      }
    });
  }

}
