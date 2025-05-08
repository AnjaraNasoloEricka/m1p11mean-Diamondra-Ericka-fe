import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pageloader',
  templateUrl: './pageloader.component.html',
  styleUrls: ['./pageloader.component.css']
})
export class PageloaderComponent implements OnInit {

  @Input() isLoading : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
