import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    {
      bannerImg: "./assets/banner_img/img_1.png",
      title: "Go Veg",
      description: "deliver your vegitables on your doorsteps",
    },
    {
      bannerImg: "./assets/banner_img/img_3.jpg",
      title: "Never Settle - OnePlus",
      description:
        " OnePlus creates beautifully designed products with premium build quality & brings the best technology to users around the world",
    },
    {
      bannerImg: "./assets/banner_img/img_4.jpg",
      title: "Google Pixel",
      description: "Discover a better way to capture, store, and see the world",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
