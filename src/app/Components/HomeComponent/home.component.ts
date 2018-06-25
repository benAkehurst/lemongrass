import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

constructor(public dataService: DataService, private router: Router) {
  if (!this.menu) {
    this.menu = {};
  }
}
errors: any;
menu: any;

ngOnInit() {
  this.getMenuFromApi();
}

public getMenuFromApi() {
  this.dataService.getMenu().subscribe(response => {
    if (response.success = true) {
      this.menu = response.menu;
      console.log(this.menu);
    }
  },
    error => {
      this.errors = error;
      console.log(error);
      this.openSwal('Error', 'The menu could not be fetched');
    });
}

public getStorageItems() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  let userObj = {
    status: false
  };
  if (token == null && id == null) {
    return userObj = {
      status: false
    };
  }
  if (token && id) {
    return userObj = {
      status: true
    };
  }
}

public openSwal(Title, text) {
  swal({
    title: Title,
    text: text,
  });
}

}
