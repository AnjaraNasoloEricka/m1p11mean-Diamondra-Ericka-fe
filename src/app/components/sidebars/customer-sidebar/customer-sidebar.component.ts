import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
})
export class CustomerSidebarComponent implements OnInit {
  collapseShow = "hidden";

  ngOnInit() {}

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
