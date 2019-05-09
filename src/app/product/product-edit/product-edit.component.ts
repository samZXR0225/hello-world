import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
// import { Router } from '@angular/router'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenWordValidator } from '../../shared/validators/forbidden-word';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {
  product: Product;
  productForm = this.fb.group({
    id: [''],
    name: [''],
    price: ['', Validators.min(100)],
    description: [''],
  });

  constructor(
    private fb: FormBuilder, // <= 追加 
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productService.get(params['id']).subscribe((product: Product) => {
        this.productForm.setValue(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
          }
        );
      });
    });
  }

  get name() { return this.productForm.get('name'); }
  // get name() { return this.productForm.get('name'); } 
  get price() { return this.productForm.get('price'); }


  saveProduct($event): void {
    // console.log(event);
    // console.log(this.product);
    if (this.productForm.valid) {
      const { id, name, price, description } = this.productForm.getRawValue();
      this.productService.update(new Product(id, name, price, description));
      // this.router.navigate(['/products']);
      this.router.navigate(['/products', this.productForm.controls.id.value]);     
      }
  }
}
