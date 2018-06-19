import { Component, OnInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

constructor(public dataService: DataService, private router: Router) {
  const user = this.getStorageItems();
  if (user.status === false) {
    this.router.navigate(['/login']);
  }
}

errors: any;
isDataLoaded: Boolean = false;
loggedIn: Boolean = false;
queryString: String = '';
antiques: Array<any> = [];
p: Number = 1;
categories = [
  { id: 1, category: 'Paintings / Prints' },
  { id: 2, category: 'Glass' },
  { id: 3, category: 'Bronze' },
  { id: 4, category: 'Ceramics' },
  { id: 5, category: 'Jewellery' },
  { id: 6, category: 'Philatelic' },
  { id: 7, category: 'Numismatic' },
];
selectedFilter: String = '';


ngOnInit() {
  this.getAllAntiques();
}

public getAllAntiques() {
    this.dataService.getAllAntiques().subscribe(response => {
      this.antiques = response.data;
      console.log(this.antiques);
    },
      error => {
        this.errors = error;
        console.log(error);
        this.openSwal('Error', 'The database is empty at the moment, try adding an item');
      });
}

public goToAntiquePage(itemId) {
  this.dataService.selectedItemId = itemId;
  this.router.navigate(['/viewAntique']);
}

public addNewAntique() {
  this.router.navigate(['/newAntique']);
}

public editItem(itemId) {
  this.dataService.selectedItemId = itemId;
  this.router.navigate(['/editAntique']);
}

public deleteItem(itemId) {

}

public downloadDatabaseAsCsv() {
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: false
  };
  const filename = 'Antique Adventures Database Dump';
  const downloadFile = new Angular2Csv(this.antiques, filename, options);
  this.downloadFile(downloadFile);
}

downloadFile(data) {
  console.log(data);
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
  const url = window.URL.createObjectURL(blob);
  window.open(url);
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
