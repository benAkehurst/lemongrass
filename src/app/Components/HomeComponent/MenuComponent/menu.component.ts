import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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
        this.dataService.loading = false;
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

  public openSwal(Title, text) {
    swal({
      title: Title,
      text: text,
    });
  }

}
