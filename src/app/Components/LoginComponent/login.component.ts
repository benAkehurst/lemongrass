import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import UserDataModel from '../../DataModels/UserDataModel';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }
    errors: any;
    jwt: string;
    id: string;
    name: string;

    username: string;
    password: string;
    showSpinner: any;

    ngOnInit() {
      this.dataService.User = new UserDataModel();
    }

    public loginUser() {
        this.dataService.loginUser().subscribe(response => {
                this.dataService.User = response;
                this.jwt = response.token;
                this.id = response.obj._id;
                this.name = response.obj.name;
                this.remeberUser();
            },
            error => {
                this.errors = error;
                this.openSwal('Error', 'Please check your email or password');
            },
            () => {
                this.router.navigate(['/home']);
            });
    }

    public goToRegister() {
        this.router.navigate(['/register']);
    }

    public remeberUser() {
        localStorage.setItem('token', this.jwt);
        localStorage.setItem('id', this.id);
        localStorage.setItem('name', this.name);
        this.dataService.loggedIn = true;
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
