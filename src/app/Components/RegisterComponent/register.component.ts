import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }
    errors: any;
    jwt: string;
    id: string;
    name: string;

    ngOnInit() {
    }

    public registerUser() {
        this.dataService.registerUser().subscribe(response => {
            this.dataService.User = response;
            this.jwt = response.token;
            this.id = response.obj._id;
            this.name = response.obj.name;
            this.remeberUser();
        },
            error => {
                this.errors = error;
                this.openSwal('Error', 'Sorrt about that, please try agian.');
            },
            () => {
                this.router.navigate(['/home']);
            });
    }

    public goToLogin() {
        this.router.navigate(['/login']);
    }

    public goToPrivacyLink() {
        this.router.navigate(['/privacy']);
    }

    public remeberUser() {
        localStorage.setItem('token', this.jwt);
        localStorage.setItem('id', this.id);
        localStorage.setItem('name', this.name);
        this.dataService.alreadyRegistered = true;
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
