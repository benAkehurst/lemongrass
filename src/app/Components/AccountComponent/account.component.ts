import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router) {
    if (!this.userData) {
      this.userData = {};
    }
  }
  errors: any;
  loggedIn: Boolean = false;
  name: String;
  userData: any;
  totalOrdersNumber: Number;
  totalOrdersValue: Number = 0;

  ngOnInit() {
    this.checkLoggedInStaus();
    this.getUserData();
  }

  public getUserData() {
    this.dataService.loading = true;
    this.dataService.getUserData().subscribe(response => {
      if (response.success = true) {
        console.log(response);
        this.dataService.loading = false;
        this.userData = response.data;
        this.runCalculationFunctions();

      }
    },
      error => {
        this.errors = error;
        console.log(error);
        this.openSwal('Error', 'Couldnt get user data, sorry :(');
      });
  }

  public runCalculationFunctions() {
    this.calculateTotalOrdersNumber();
    this.calculateTotalOrderValue();
  }

  public calculateTotalOrdersNumber() {
    this.totalOrdersNumber = this.userData.orders_history.length;
  }

  public calculateTotalOrderValue() {
    const allOrders = this.userData.orders_history;
    allOrders.forEach(element => {
      this.totalOrdersValue = this.totalOrdersValue + element.total_price;
    });
  }

  public checkLoggedInStaus() {
    const userObj = this.getStorageItems();
    if (userObj.status === false) {
      this.loggedIn = false;
      this.router.navigate(['/home']);
    }
    if (userObj.status === true) {
      this.loggedIn = true;
      this.name = userObj.name;
    }
  }

  public logout() {
    this.clearUser();
  }

  public clearUser() {
    localStorage.clear();
    this.dataService.loggedIn = false;
  }

  public getStorageItems() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    let userObj = { status: false, name: null };
    if (token == null && id == null) {
      return userObj = { status: false, name: null };
    }
    if (token && id && name) {
      return userObj = { status: true, name: name };
    }
  }

  public openSwal(Title, text) {
    swal({
      title: Title,
      text: text,
    });
  }

}
