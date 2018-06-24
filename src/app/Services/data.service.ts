import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import UserDataModel from '../DataModels/UserDataModel';
import MenuItemDataModel from '../DataModels/MenuItemDataModel';
import OrderDataModel from '../DataModels/OrderDataModel';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private localUrl = 'http://localhost:3000/';
  private liveUrl = '';
  User: UserDataModel;
  MenuItem: MenuItemDataModel;
  Order: OrderDataModel;

  constructor(private http: Http) {
    this.User = new UserDataModel();
    this.MenuItem = new MenuItemDataModel();
    this.Order = new OrderDataModel();
  }

  //
  // ─── USER REQUESTS ──────────────────────────────────────────────────────────────
  //
  /**
  * HANDLES REGISTERING A NEW USER
  * @param this.User
  */
  public registerUser() {
    return this.http
      .post(this.localUrl + 'registerUser', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
  }

  /**
  * HANDLES LOGIN FOR A USER
  * @param this.User
  */
  public loginUser() {
    return this.http
      .post(this.localUrl + 'login', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
  }

  public getUserData() {
    const userId = this.getUserId();
    const dataObj = {
      _id: userId
    };
    return this.http
      .post(this.localUrl + 'getUserData', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }
  //
  // ──────────────────────────────────────────────────────────── USER REQUESTS ─────
  //

  //
  // ─── USER UPDATE REQUESTS ───────────────────────────────────────────────────────────
  //

  public saveNewOrder() {
    const userId = this.getUserId();
    const dataObj = {
      _id: userId,
      new_order: {
        'ordered_items': this.Order
      }
    };
    return this.http
      .post(this.localUrl + 'saveNewOrder', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }
  //
  // ───────────────────────────────────────────────────────── ANTIQUE REQUESTS ─────
  //

  public getUserId() {
    const userId = localStorage.getItem('id');
    return userId;
  }
}
