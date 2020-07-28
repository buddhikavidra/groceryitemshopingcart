import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";

@Component({
  selector: "app-new-user",

  templateUrl: "./bills-user.component.html",
  // styleUrls: ["./new-user.component.scss"]
})

export class DisplayComponent implements OnInit{
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
