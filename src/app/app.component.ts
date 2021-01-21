import { AlldataserviceService } from './service/alldataservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'covidappus';
  allstatedata = []

  constructor(private AlldataserviceService:AlldataserviceService){}

  ngOnInit(){
    this.AlldataserviceService.apiGet("https://api.covidtracking.com/v1/states/current.json").subscribe((data: any[])=>{
      this.allstatedata = data;
      console.log("Testing ", data)
      return data;
    })
  }
  getallcovidresult(){

  }
}
