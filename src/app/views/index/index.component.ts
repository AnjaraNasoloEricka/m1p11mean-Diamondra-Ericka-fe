import { Component, OnInit } from "@angular/core";
import { appName } from "src/app/config/data/api-endpoint";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
})
export class IndexComponent implements OnInit {
  name: string = appName;

  constructor() {}


  ngOnInit(): void {}
}
