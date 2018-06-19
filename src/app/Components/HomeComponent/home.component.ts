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

ngOnInit() {
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
