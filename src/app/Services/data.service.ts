import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import UserDataModel from '../DataModels/UserDataModel';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private localUrl = 'http://localhost:3000/';
  private liveUrl = '';
  User: UserDataModel;
  selectedItemId: String = '';
  itemImageUrl: String = '';

  constructor(private http: Http) {
    this.User = new UserDataModel();
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

  public getUserProfile() {
    const userId = this.getUserId();
    const dataObj = {
      user: userId
    };
    return this.http
      .post(this.localUrl + 'getProfile', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }
  //
  // ──────────────────────────────────────────────────────────── USER REQUESTS ─────
  //

  //
  // ─── ANTIQUE REQUESTS ───────────────────────────────────────────────────────────
  //
  public getAllAntiques() {
    return this.http
      .post(this.localUrl + 'getAllAntiques', { headers: this.headers })
      .map(res => res.json());
  }

  public getAntique(antiqueId) {
    const dataObj = {
    };
    return this.http
      .post(this.localUrl + 'getAntique', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }

  public saveAntique(itemValObj) {
    const userId = this.getUserId();
    const dataObj = {
      user: userId
    };
    return this.http
      .post(this.localUrl + 'saveNewAntique', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }

  public editAntique(itemValObj) {
    const dataObj = {
    };
    return this.http
      .post(this.localUrl + 'editAntique/' + this.selectedItemId, { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }

  public deleteAntique(antiqueId) {
    const userId = this.getUserId();
    const dataObj = {
      user: userId,
      antique: antiqueId
    };
    // console.log(dataObj);
    return this.http
      .post(this.localUrl + 'deleteAntique', { data: dataObj }, { headers: this.headers })
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
