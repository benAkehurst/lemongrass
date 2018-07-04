import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as _ from 'lodash';

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
    if (!this.menu.mains) {
      this.menu.mains = {};
    }
  }
  errors: any;
  menu: any;
  selectedItems: Array<any> = [];
  totalPrice: any = 0;

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

  public addItemToOrder(item: object) {
    this.selectedItems.push(item);
    this.addPrice(item);
  }

  public addPrice(item: any) {
    this.totalPrice = this.totalPrice + item.price;
  }

  public removeItemFromOrder(item: object) {
    _.remove(this.selectedItems, item);
    this.removePrice(item);
  }

  public removePrice(item: any) {
    if (this.totalPrice === 0) {
      this.totalPrice = 0;
    } else {
      this.totalPrice = this.totalPrice - item.price;
    }
  }

  public scrollTo(id: string): void {
    const elementList = document.querySelectorAll('#' + id);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  public openSwal(Title, text) {
    swal({
      title: Title,
      text: text,
    });
  }

}
