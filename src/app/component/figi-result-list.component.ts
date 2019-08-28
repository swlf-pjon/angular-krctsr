import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../rest.service";

@Component({
  selector: 'figi-result-list',
  templateUrl: './figi-result-list.component.html',
  styleUrls: ['./figi-result-list.component.css']
})
export class FIGIResultListComponent implements OnInit {

  Securities: any = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    //this.loadSecurity()
  }

  // Get employees list
  loadSecurity() {
    return this.restApi.getSecurity().subscribe((data: {}) => {
      this.Securities = data;
    })
  }  

}