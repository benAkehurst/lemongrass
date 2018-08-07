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

constructor(public dataService: DataService, private router: Router) { }
errors: any;
openingHours = [
  {id: 1, day: 'Monday', hours: 'Closed'},
  {id: 2, day: 'Tuesday', hours: '11am - 10pm'},
  {id: 3, day: 'Wednesday', hours: '11am - 10pm'},
  {id: 4, day: 'Thursday', hours: '11am - 10pm'},
  { id: 5, day: 'Friday', hours: '11am - 12pm'},
  { id: 6, day: 'Saturday', hours: '11am - 12pm'},
  { id: 7, day: 'Sunday', hours: '11am - 11pm'},
];

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

  public scrollTo(id: string): void {
    const elementList = document.querySelectorAll('#' + id);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({
      behavior: 'smooth'
    });
  }

public openSwal(Title, text) {
  swal({
    title: Title,
    text: text,
  });
}

}
