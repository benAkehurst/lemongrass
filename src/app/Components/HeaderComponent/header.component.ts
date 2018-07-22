import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }
    loggedIn: Boolean = false;
    name: String;

    ngOnInit() {

        // this.checkLoggedInStaus();

        // setInterval(() => {
        //     this.checkLoggedInStaus();
        // }, 10000);
    }

    public checkLoggedInStaus() {
        const userObj = this.getStorageItems();
        if (userObj.status === false ) {
            this.loggedIn = false;
        }
        if (userObj.status === true ) {
            this.loggedIn = true;
            this.name = userObj.name;
        }
    }

    public goToHomeLink() {
        this.router.navigate(['/home']);
    }

    public logout() {
        this.clearUser();
    }

    public goToLoginLink() {
        this.router.navigate(['/login']);
    }

    public goToRegisterLink() {
        this.router.navigate(['/register']);
    }

    public goToAccountLink() {
      this.router.navigate(['/account']);
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
        if (token == null && id == null ) {
            return userObj = { status: false, name: null };
        }
        if (token && id && name ) {
            return userObj = { status: true, name: name };
        }
    }


}
