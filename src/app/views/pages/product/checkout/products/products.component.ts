import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import { Product } from "../../../../../shared/models/product";

 // const ServiceCharge = 10;

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
@Injectable()
export class ProductsComponent implements OnInit {
  checkoutProducts: Product[];

   totalPrice = 0;
   prizeWithServiceCharge = 0;
   temp = 0;
   ServiceCharge = 10;
   ServiceChargeForMinorBills = 0;


  constructor(productService: ProductService) {
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const products = productService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach((product) => {
      this.totalPrice += product.productPrice; // +=
      if (this.totalPrice > 5000){
        console.log(this.totalPrice);
        this.temp = (this.totalPrice * this.ServiceCharge) / 100;
        this.prizeWithServiceCharge = this.totalPrice + this.temp;
      }else{
          this.ServiceChargeForMinorBills = 50;
          this.temp = (this.totalPrice * this.ServiceChargeForMinorBills) / 100;
          this.prizeWithServiceCharge = this.totalPrice + this.temp;
      }

    });
  }

  ngOnInit() {}
}
