
import { ProductService } from "../../../../../shared/services/product.service";
import { Product } from "../../../../../shared/models/product";
import { BillingService } from "../../../../../shared/services/billing.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, UserDetail } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-billing-details",
  // templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"],
  template: `
  <h1>Add any products not listed in our site</h1>
  <h5>if we can't clearly identify your product spesifically we will contact you</h5>
 <br>
  <form #formRef="ngForm">
    <div *ngFor="let word1 of words1; let in=index" class="col-sm-3">
        <div class="form-group">

        <label>Product Name</label> : <input type="text" [(ngModel)]="words2[in].value" name="name{{in}}" class="form-control" #name="ngModel" required />
          <!--<p [hidden]="words2[in].value">Field is required</p>
          {{formRef.form.name1}}-->
        </div>
        <div class="form-group">

<label>Product Quentity</label> : <input type="text" [(ngModel)]="words1[in].value2" name="name{{in}}" class="form-control" #name="ngModel" required />
  <!--<p [hidden]="words2[in].value">Field is required</p>
  {{formRef.form.name1}}-->
</div>
        <br />
    </div>
    <button [disabled]="!formRef.form.valid" (click)="add()">Add input</button>
  </form>
  <br />
  <br />
  {{words2 | json}}
  {{words1 | json}}
  `
})
export class BillingDetailsComponent implements OnInit {
  words2 = [{value: "word1"}, {value: ""}];
  words1 = [{value2: "word1"}, {value2: ""}];
  userDetails: User;
  products: Product[];
  userDetail: UserDetail;

  constructor(
    authService: AuthService,
    private billingService: BillingService,
    productService: ProductService,
    private router: Router
  ) {
    /* Hiding Shipping Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "block"; // nonea
    document.getElementById("resultTab").style.display = "block"; /// none

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
    let totalPrice = 0;
    const products = [];
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.productPrice;
      products.push(product);
    });

    const data = {
      ...form.value,
      emailId: this.userDetails.emailId,
      userId: this.userDetails.$key,
      products,
      totalPrice,
      billingDate: Date.now(),
    };

    this.billingService.createBillings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["result"] } },
    ]);
  }
  add() {
    this.words2.push({value: "new product"});
    this.words1.push({value2: "new product"});
}}
