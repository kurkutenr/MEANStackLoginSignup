import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  selectedUser: User = {
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    history:''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // Http Request methods

  /**
   * Register user
   * @param user 
   */
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/signup',user,this.noAuthHeader);
  }

  /**
   * Login user
   * @param authCredentials 
   */
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  /**
   * Get user details
   */
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  updateHistory(postData) {
    postData = {'history': postData}
    return this.http.put(environment.apiBaseUrl + '/updateUser', postData);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
