import { Product } from "../../../../../shared/models/product";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../../../shared/services/product.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"],
  // selector: "ngbd-datepicker-custommonth",
  // templateUrl: './datepicker-custommonth.html',

})
export class ShippingDetailsComponent implements OnInit {

   a = 0;
  userDetails: User;

  userDetail: UserDetail;

  products: Product[];

  constructor(
    authService: AuthService,
    private shippingService: ShippingService,
    productService: ProductService,
    private router: Router
  ) {
    /* Hiding products Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.products = productService.getLocalCartProducts();
    authService.user$.pipe(
      map((user) => {
        this.userDetails = user;
      })
    );
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {
    const products = [];
    let totalPrice = 0;
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.productPrice;
      console.log("one" + totalPrice);
      if ( totalPrice > 5000){
        this.a = totalPrice * 10 / 100;
        totalPrice += this.a ;
        console.log(this.a);
        console.log("2" + totalPrice);
      }
      products.push(product);
    });
    const data = {
      ...form.value,
     // ...form.value.Date,
     emailId: this.userDetail.email,
    // userId:  this.userDetail.userName, // this.userDetail.$key,
      products,
      totalPrice,
      shippingDate: Date.now(),
      date: this.userDetail.date,
    };

    this.shippingService.createshippings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } },
    ]);
  }

}
