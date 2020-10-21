import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public search_query = 'angular/components';
  public page = 0;
  public order = 'desc';
  public sort = 'created';
  public itemsdata = [];
  public loading = '';

  constructor(private formbuilder: FormBuilder, public apiservice: ApiService, public router: Router,) { }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    if(this.search_query == '')
      this.search_query = 'angular/components';
    this.itemsdata = [];
    this.loading = 'Loading...';
    this.apiservice.getdata(this.search_query,this.sort,this.order,this.page).subscribe((data) => {
      if(!isNullOrUndefined(data['items'])){
        if(data['items'].length!=0){
          this.itemsdata = data['items'];
          this.loading = '';
          console.log(this.itemsdata)
        }else{
          this.loading = 'No Record Found';
        }
      }else{
        this.loading = 'No Record Found';
      }
    });
  }

  pagination(type){
    if(type == 'next')
      this.page = this.page + 1;
    else
      this.page = this.page - 1;
    this.getdata()    
  }

  orderdata(sort, order){
    this.sort = sort;
    this.order = order;
    this.getdata();
  }

}
