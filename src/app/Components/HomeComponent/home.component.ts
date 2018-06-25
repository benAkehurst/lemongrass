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
  // const user = this.getStorageItems();
  // if (user.status === false) {
  //   this.router.navigate(['/login']);
  // }
}
errors: any;
menu: any;

ngOnInit() {
  this.getMenu();
}

public getMenu() {
  const menu = this.getMenuFromStorage();
  if (!menu) {
    this.getMenuFromApi();
  } else {
    this.menu = menu;
    console.log(this.menu);
  }
}

public getMenuFromApi() {
  this.dataService.getMenu().subscribe(response => {
    if (response.success = true) {
      this.menu = response.menu;
      this.setMenuInStorage(this.menu);
      console.log(response);
      console.log(this.menu);
    }
  },
    error => {
      this.errors = error;
      console.log(error);
      this.openSwal('Error', 'The menu could not be fetched');
    });
}

public getMenuFromStorage() {
  localStorage.getItem('menu');
}

public setMenuInStorage(menu) {
  localStorage.setItem('menu', JSON.stringify(menu));
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
