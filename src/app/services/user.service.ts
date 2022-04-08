import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Resp } from '../models/resp';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  //BehaviorSubject like session

  private logged = new BehaviorSubject<Boolean>(this.loggedIn());
  authStatus = this.logged.asObservable();
  changeStatus(value: boolean) {
    this.logged.next(value);
  }
  //BehaviorSubject like session
  loggedIn() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token != null && email != null) {
      console.log('loggedIn');
      return true;
    }
    return false;
  }
  // login(loguser: User) {
  //   return this.http.post<User>(
  //     `http://localhost:3000/login?email=${loguser.email}&password=${loguser.password}`
  //   );
  apiUrl =
    'https://my-json-server.typicode.com/achrafharimza/Smart-House-Hosting-backend-API-JSON-server-/login';
  // }
  login(loguser: User) {
    return this.http.get<Resp[]>(
      `${this.apiUrl}?email=${loguser.email}&password=${loguser.password}`
    );
  }
}
