import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription, Subscribable, Observable, observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return <boolean><unknown>localStorage.getItem('login');
  }

  createUser(user: NewUser) {
    return this.http.post(`${environment.userServiceUrl}/users`, user,  {observe: 'response'});
  }

  login(email: string, password: string, ) {

    return new Observable(observable => {

      this.http.post<Token>(`${environment.userServiceUrl}/login/`, { email: email, password: password }).subscribe(
        token => {
          localStorage.setItem('login', token.token);
          observable.next();
        },
        error => {
          observable.error(error);
        },
        () => {
          observable.complete();
        });

    })
  }

  logout() {
    return new Observable(observable => {
      localStorage.removeItem('login');
      observable.next();
    });
  }

  getCurrentUser() {
    return this.http.get<UserResponse>(`${environment.userServiceUrl}/users/current`);
  }

  getUserById(userId: string) {
    return this.http.get<UserResponse>(`${environment.userServiceUrl}/users/${userId}`)
  }

  getCurrentUserRoles() {
    return this.http.get<string[]>(`${environment.userServiceUrl}/users/current/roles`);
  }

  getRolesForUser(userId: string) {
    return this.http.get<string[]>(`${environment.userServiceUrl}/users/${userId}/roles`);
  }

  getAuthToken() {
    return localStorage.getItem('login');
  }

  getUser(userId: string) {
    return this.http.get<UserResponse>(`${environment.userServiceUrl}/users/${userId}`)
  }

  verifyUser(email: string, token: string) {
    return this.http.post(`${environment.userServiceUrl}/users/verify?email=${email}&token=${token}`, {});
  }

  getAllUsers() {
    return this.http.get<UserResponse[]>(`${environment.userServiceUrl}/users`);
  }

  addRoleToUser(userId: string, role: string) {
    return this.http.post<string[]>(`${environment.userServiceUrl}/users/${userId}/roles`, [role]);
  }

  removeRoleFromUser(userId: string, role: string) {
    return this.http.delete(`${environment.userServiceUrl}/users/${userId}/roles/${role}`);
  }

  createAuthCode(applicationId: string) {
    return this.http.post<CreateCodeResponse>(`${environment.userServiceUrl}/authorize/code`, {application_id: applicationId});
  }
}

export interface NewUser {
  password: string,
  name: string,
  email: string
}

export interface UserResponse {
  id: string,
  name: string,
  email: string,
  passwordLastModified: string
}

export interface CreateCodeResponse {
  code: string;
}

interface Token {
  token: string;
}
